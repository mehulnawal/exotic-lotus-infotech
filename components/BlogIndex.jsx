"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogCategories } from "../lib/blogPosts";

export default function BlogIndex({ posts }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const visiblePosts = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    return posts.filter((post) =>
      (category === "All" || post.category === category) &&
      (!search || `${post.title} ${post.category} ${post.excerpt}`.toLocaleLowerCase().includes(search))
    );
  }, [category, posts, query]);

  return (
    <section className="blog-listing" aria-label="Blog articles">
      <div className="blog-container">
        <div className="blog-listing-top">
          <div>
            <span className="blog-section-label">EXPLORE THE JOURNAL</span>
            <h2>Latest <span>thinking.</span></h2>
          </div>
          <p>Stories about the tools, choices, and ideas shaping better digital work.</p>
        </div>
        <div className="blog-filters">
          <div className="blog-filter-chips" aria-label="Filter by category">
            {blogCategories.map((item) => (
              <button
                key={item}
                type="button"
                className={`blog-filter-chip${category === item ? " is-selected" : ""}`}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >{item}</button>
            ))}
          </div>
          <label className="blog-search">
            <span className="visually-hidden">Search articles</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10.8" cy="10.8" r="6.7"/><path d="m16 16 5 5"/></svg>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles..." />
          </label>
        </div>
        {visiblePosts.length ? (
          <div className="blog-card-grid">
            {visiblePosts.map((post) => (
              <article className="blog-card" key={post.slug}>
                <Link className="blog-card-media" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                  <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 680px" />
                </Link>
                <div className="blog-card-content">
                  <div className="blog-card-meta"><span className="blog-category">{post.category}</span><span>{post.readingTime}</span></div>
                  <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-card-bottom">
                    <span>{post.date} · {post.author}</span>
                    <Link href={`/blog/${post.slug}`}>Read article <span aria-hidden="true">↗</span></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="blog-empty" role="status">
            <h3>No articles found.</h3>
            <p>Try another search or choose a different category.</p>
            <button type="button" onClick={() => { setCategory("All"); setQuery(""); }}>Clear filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
