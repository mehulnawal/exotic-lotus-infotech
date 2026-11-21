"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const pageSections = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#core-services" },
  { label: "Products", href: "#products" },
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#process" },
];

export default function SiteHeader({ complete = false, blogPage = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const homePrefix = blogPage ? "/" : "";
  const HomeLink = blogPage ? Link : "a";

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
            <HomeLink className={`nav-item${blogPage ? "" : " is-current"}`} href={blogPage ? "/" : "#top"} aria-current={blogPage ? undefined : "page"} onClick={() => setMenuOpen(false)}>
              Home
            </HomeLink>
            {complete && pageSections.map(({ label, href }) => blogPage ? (
              <Link className="nav-item" href={`${homePrefix}${href}`} key={href} onClick={() => setMenuOpen(false)}>{label}</Link>
            ) : (
              <a className="nav-item" href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            {complete && <Link className={`nav-item${blogPage ? " is-current" : ""}`} href="/blog" aria-current={blogPage ? "page" : undefined} onClick={() => setMenuOpen(false)}>Blog</Link>}
          </div>
        </nav>
      </div>
    </header>
  );
}
