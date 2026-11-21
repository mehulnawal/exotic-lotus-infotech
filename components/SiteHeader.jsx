"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const pageSections = [
  { label: "Services", href: "#core-services" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#portfolio" },
  { label: "Products", href: "#products" },
  { label: "Process", href: "#process" },
];

export default function SiteHeader({ complete = false, blogPage = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#top");
  const homePrefix = blogPage ? "/" : "";
  const HomeLink = blogPage ? Link : "a";

  useEffect(() => {
    if (!complete || blogPage) return;

    let frame = 0;

    function updateActiveSection() {
      frame = 0;
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
      const marker = window.scrollY + headerHeight + 24;
      let current = "#top";

      for (const { href } of pageSections) {
        const section = document.getElementById(href.slice(1));
        if (section && section.getBoundingClientRect().top + window.scrollY <= marker) {
          current = href;
        }
      }

      setActiveHref(current);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [complete, blogPage]);

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <HomeLink
          className="brand-link"
          href={blogPage ? "/" : "#top"}
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-wordmark">Exotic Lotus Infotech</span>
        </HomeLink>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-toggle-lines" aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <div className="navigation-content">
            <HomeLink className={`nav-item${!blogPage && activeHref === "#top" ? " is-current" : ""}`} href={blogPage ? "/" : "#top"} aria-current={!blogPage && activeHref === "#top" ? "location" : undefined} onClick={() => setMenuOpen(false)}>
              Home
            </HomeLink>
            {complete && pageSections.map(({ label, href }) => blogPage ? (
              <Link className="nav-item" href={`${homePrefix}${href}`} key={href} onClick={() => setMenuOpen(false)}>{label}</Link>
            ) : (
              <a className={`nav-item${activeHref === href ? " is-current" : ""}`} href={href} key={href} aria-current={activeHref === href ? "location" : undefined} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            {complete && <Link className={`nav-item${blogPage ? " is-current" : ""}`} href="/blog" aria-current={blogPage ? "page" : undefined} onClick={() => setMenuOpen(false)}>Blog</Link>}
            {complete && <a className="nav-cta" href="https://www.instagram.com/exoticlotus.tech/" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Discuss a project <span>via Instagram</span></a>}
          </div>
        </nav>
      </div>
    </header>
  );
}
