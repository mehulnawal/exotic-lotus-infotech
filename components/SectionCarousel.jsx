"use client";

import { useEffect, useRef, useState } from "react";

export default function SectionCarousel({ children, className, label, count }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function updateActive() {
      const cards = Array.from(track.children);
      const left = track.getBoundingClientRect().left;
      const closest = cards.reduce((best, card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - left);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Infinity });
      setActive(closest.index);
    }

    updateActive();
    track.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      track.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  function goTo(index) {
    const track = trackRef.current;
    const card = track?.children[index];
    if (!card) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const left = track.scrollLeft + card.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({ left, behavior: reducedMotion ? "auto" : "smooth" });
    setActive(index);
  }

  return (
    <div className="section-carousel">
      <div className="section-carousel-controls" aria-label={`${label} controls`}>
        <span aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
        <div>
          <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={`Previous ${label.toLowerCase()} item`}>‹</button>
          <button type="button" onClick={() => goTo(active + 1)} disabled={active === count - 1} aria-label={`Next ${label.toLowerCase()} item`}>›</button>
        </div>
      </div>
      <div className={`section-carousel-track ${className}`} ref={trackRef} aria-label={label} tabIndex={0} onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); goTo(Math.min(count - 1, active + 1)); }
        if (event.key === "ArrowLeft") { event.preventDefault(); goTo(Math.max(0, active - 1)); }
      }}>
        {children}
      </div>
    </div>
  );
}
