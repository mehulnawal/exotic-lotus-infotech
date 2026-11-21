"use client";

import { useEffect, useRef, useState } from "react";

export default function ArticleTools({ sections, title }) {
  const [url, setUrl] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const resetTimer = useRef(0);

  useEffect(() => {
    setUrl(window.location.href.split("#")[0]);
    let frame = 0;
    function updateActiveSection() {
      frame = 0;
      const threshold = (document.querySelector(".site-header")?.getBoundingClientRect().height ?? 88) + 56;
      let current = sections[0]?.id ?? "";
      for (const { id } of sections) {
        const heading = document.getElementById(id);
        if (heading && heading.getBoundingClientRect().top <= threshold) current = id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        current = sections.at(-1)?.id ?? current;
      }
      setActiveId(current);
    }
    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(updateActiveSection);
    }
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resetTimer.current);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [sections]);

  async function copyLink() {
    const articleUrl = url || window.location.href.split("#")[0];
    try {
      let copied = false;
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(articleUrl);
          copied = true;
        } catch {
          // Some browsers expose the API but block it for the current context.
        }
      }
      if (!copied) {
        const field = document.createElement("textarea");
        field.value = articleUrl;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.focus();
        field.select();
        copied = document.execCommand("copy");
        field.remove();
      }
      if (!copied) throw new Error("Copy failed");
      setCopyStatus("Link copied");
    } catch {
      setCopyStatus("Could not copy link");
    }
    clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyStatus(""), 2600);
  }

  return (
    <aside className="blog-article-aside" aria-label="Article tools">
      <div className="blog-aside-card blog-toc">
        <h2><span className="blog-aside-heading-mark" aria-hidden="true" />On this page</h2>
        <nav aria-label="Table of contents">
          {sections.map(({ id, heading }, index) => (
            <a key={id} href={`#${id}`} className={activeId === id ? "is-active" : ""} aria-current={activeId === id ? "location" : undefined} onClick={() => setActiveId(id)}>
              <span className="blog-toc-number">{String(index + 1).padStart(2, "0")}</span><span className="blog-toc-label">{heading}</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="blog-aside-card blog-share">
        <h2><span className="blog-aside-heading-mark" aria-hidden="true" />Share this article</h2>
        <div className="blog-share-links">
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X"><span className="blog-share-icon" aria-hidden="true">𝕏</span><span>Share on X</span><span className="blog-share-arrow" aria-hidden="true">↗</span></a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><span className="blog-share-icon blog-linkedin-icon" aria-hidden="true">in</span><span>Share on LinkedIn</span><span className="blog-share-arrow" aria-hidden="true">↗</span></a>
          <button type="button" onClick={copyLink} aria-label="Copy article link"><span className="blog-share-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.2 1.2"/><path d="M14 11a5 5 0 0 0-7.1 0l-2 2a5 5 0 0 0 7.1 7.1l1.2-1.2"/></svg></span><span>{copyStatus === "Link copied" ? "Copied!" : "Copy link"}</span></button>
        </div>
        <span className="blog-copy-status" role="status">{copyStatus}</span>
      </div>
    </aside>
  );
}
