"use client";

import { useEffect, useRef } from "react";

const name = "EXOTIC";

export default function SiteFooter({ refined = false }) {
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const letters = Array.from(footer.querySelectorAll("[data-footer-letter]"));
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let displayedProgress = 0;
    let previousFrameTime = 0;

    function update(time) {
      frame = 0;
      if (motionPreference.matches) return;

      const start = window.innerHeight * (refined ? 0.92 : 0.88);
      const end = refined
        ? Math.max(window.innerHeight * 0.52, window.innerHeight - footer.offsetHeight + 50)
        : Math.max(window.innerHeight * 0.2, window.innerHeight - footer.offsetHeight);
      const top = footer.getBoundingClientRect().top;
      const targetProgress = Math.max(0, Math.min(1, (start - top) / Math.max(1, start - end)));
      if (refined) {
        const elapsed = previousFrameTime ? time - previousFrameTime : 16;
        previousFrameTime = time;
        displayedProgress += (targetProgress - displayedProgress) * (1 - Math.exp(-elapsed / 85));
        if (Math.abs(targetProgress - displayedProgress) < 0.001) displayedProgress = targetProgress;
      }
      const progress = refined ? displayedProgress : targetProgress;

      letters.forEach((letter, index) => {
        const linear = Math.max(0, Math.min(1, (progress - index * (refined ? 0.085 : 0.1)) / (refined ? 0.55 : 0.5)));
        const reveal = refined ? linear * linear * (3 - 2 * linear) : linear;
        letter.style.setProperty("--letter-opacity", reveal.toFixed(3));
        letter.style.setProperty("--letter-offset", refined
          ? `${(-26 * (1 - reveal)).toFixed(2)}px`
          : `${(-55 * (1 - reveal)).toFixed(2)}%`);
      });

      const subtitleStart = refined ? 0.56 : 0.66;
      const linksStart = refined ? 0.72 : 0.78;
      const subtitleLinear = Math.max(0, Math.min(1, (progress - subtitleStart) / (refined ? 0.32 : 0.28)));
      const linksLinear = Math.max(0, Math.min(1, (progress - linksStart) / (refined ? 0.25 : 0.22)));
      const subtitleReveal = refined ? subtitleLinear * subtitleLinear * (3 - 2 * subtitleLinear) : subtitleLinear;
      const linksReveal = refined ? linksLinear * linksLinear * (3 - 2 * linksLinear) : linksLinear;
      footer.style.setProperty("--subtitle-opacity", subtitleReveal.toFixed(3));
      footer.style.setProperty("--subtitle-offset", `${(18 * (1 - subtitleReveal)).toFixed(2)}px`);
      footer.style.setProperty("--links-opacity", linksReveal.toFixed(3));
      footer.style.setProperty("--links-offset", `${(12 * (1 - linksReveal)).toFixed(2)}px`);
      if (refined && displayedProgress !== targetProgress) scheduleUpdate();
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    function syncMotionPreference() {
      footer.classList.toggle("is-motion-ready", !motionPreference.matches);
      scheduleUpdate();
    }

    syncMotionPreference();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    motionPreference.addEventListener("change", syncMotionPreference);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      motionPreference.removeEventListener("change", syncMotionPreference);
    };
  }, [refined]);

  return (
    <footer className={`site-footer${refined ? " footer-refined" : ""}`} aria-label="Site footer" ref={footerRef}>
      <div className="footer-inner">
        <h2 className="footer-name" aria-label="Exotic Lotus Infotech">
          <span className="footer-name-primary" aria-hidden="true">
            {Array.from(name).map((letter, index) => (
              <span className="footer-letter-window" key={`${letter}-${index}`}>
                <span className="footer-letter" data-footer-letter>{letter}</span>
              </span>
            ))}
          </span>
          <span className="footer-name-secondary" aria-hidden="true">{refined ? "Lotus Infotech" : "LOTUS INFOTECH"}</span>
        </h2>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Exotic Lotus Infotech</p>
          <nav className="footer-links" aria-label="Footer links">
            <a href="#core-services">{refined ? "Services" : "Core Services"}</a>
            <a href="#why-we-build">{refined ? "Our approach" : "Why We Build"}</a>
            <a href="https://www.instagram.com/exoticlotus.tech/" target="_blank" rel="noopener noreferrer">
              Instagram <span aria-hidden="true">↗</span>
            </a>
            <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
