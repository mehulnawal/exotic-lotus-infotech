"use client";

import { useEffect, useRef } from "react";

const heading = "A software team built around real ideas.";
const description = "We create digital products and reliable software for businesses. Integrity, collaboration and attentive support guide how we work with every client.";

function clamp(value) {
  return Math.max(0, Math.min(1, value));
}

function RevealWords({ text }) {
  const words = text.split(" ");

  return words.map((word, index) => (
    <span key={`${word}-${index}`} aria-hidden="true">
      <span data-reveal-word>{word}</span>{index < words.length - 1 ? " " : null}
    </span>
  ));
}

export default function AboutIntroReveal() {
  const introRef = useRef(null);

  useEffect(() => {
    const intro = introRef.current;
    if (!intro) return;

    const groups = Array.from(intro.querySelectorAll("[data-reveal-group]"));
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function update() {
      frame = 0;
      if (motionPreference.matches) return;

      groups.forEach((group) => {
        const top = group.getBoundingClientRect().top;
        const start = window.innerHeight * 0.82;
        const end = window.innerHeight * 0.28;
        const progress = clamp((start - top) / (start - end));
        const words = group.querySelectorAll("[data-reveal-word]");

        words.forEach((word, index) => {
          const reveal = clamp(progress * (words.length + 0.5) - index);
          word.style.setProperty("--word-opacity", (0.2 + reveal * 0.8).toFixed(3));
        });
      });
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    function syncMotionPreference() {
      if (motionPreference.matches) {
        intro.classList.remove("is-ready");
      } else {
        update();
        intro.classList.add("is-ready");
      }
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
  }, []);

  return (
    <div className="company-section-intro company-reveal" ref={introRef}>
      <p className="company-eyebrow">Who we are</p>
      <h2 id="about-heading" data-reveal-group aria-label={heading}>
        <RevealWords text={heading} />
      </h2>
      <p className="company-intro-copy" data-reveal-group aria-label={description}>
        <RevealWords text={description} />
      </p>
    </div>
  );
}
