"use client";

import { useEffect, useRef } from "react";

const statement =
  "We build software that connects your operations, simplifies decisions, and helps your business move forward.";

const words = statement.split(" ");

export default function ScrollRevealStatement({ controlled = false }) {
  const headingRef = useRef(null);

  useEffect(() => {
    if (controlled) return;
    const heading = headingRef.current;
    if (!heading) return;

    const wordElements = Array.from(heading.querySelectorAll("[data-reveal-word]"));
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function update() {
      frame = 0;
      if (motionPreference.matches) return;

      const top = heading.getBoundingClientRect().top;
      const start = window.innerHeight * 0.82;
      const end = window.innerHeight * 0.16;
      const progress = Math.max(0, Math.min(1, (start - top) / (start - end)));

      wordElements.forEach((word, index) => {
        const fill = Math.max(0, Math.min(1, progress * (wordElements.length + 1) - index));
        word.style.setProperty("--word-opacity", (0.18 + fill * 0.82).toFixed(3));
      });
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    function syncMotionPreference() {
      heading.classList.toggle("is-ready", !motionPreference.matches);
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
  }, [controlled]);

  return (
    <section className="statement-section" id="why-we-build" aria-labelledby="statement-heading">
      <div className="statement-inner">
        <p className="statement-eyebrow">Why we build</p>
        <h2 id="statement-heading" className="statement-heading" ref={headingRef} aria-label={statement}>
          {words.map((word, index) => (
            <span key={`${word}-${index}`} aria-hidden="true">
              <span data-reveal-word>{word}</span>{index < words.length - 1 ? " " : null}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
