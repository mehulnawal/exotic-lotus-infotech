"use client";

import { useEffect, useState } from "react";

const futurePages = ["About", "Services", "Contact"];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <a
          className="brand-link"
          href="#top"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-wordmark">Exotic Lotus Infotech</span>
        </a>

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
            <a className="nav-item is-current" href="#top" aria-current="page" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            {futurePages.map((label) => (
              <span className="nav-item is-planned" aria-disabled="true" title="Planned for a later phase" key={label}>
                {label}
              </span>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
