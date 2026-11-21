"use client";

import { useEffect, useRef } from "react";

export default function CompanyMotion({ children }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.IntersectionObserver) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;

    const items = Array.from(root.querySelectorAll("[data-motion]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    items.forEach((item) => observer.observe(item));
    root.classList.add("motion-ready");

    return () => observer.disconnect();
  }, []);

  return <div className="company-motion" ref={rootRef}>{children}</div>;
}
