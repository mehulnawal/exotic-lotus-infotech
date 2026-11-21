import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleTools from "../../../components/ArticleTools";
import { blogPosts, getBlogPost } from "../../../lib/blogPosts";

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article not found | Exotic Lotus Infotech" };
  return {
    title: `${post.title} | Exotic Lotus Infotech`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", images: [post.image] },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="blog-article">
      <header className="blog-article-hero">
        <div className="blog-container">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span>
            <Link href="/blog">Blog</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{post.title}</span>
          </nav>
          <Link className="blog-back-link" href="/blog"><span aria-hidden="true">←</span> Back to Blog</Link>
          <div className="blog-article-label"><span className="blog-category">{post.category}</span><span>{post.readingTime}</span></div>
          <h1>{post.title}</h1>
          <p className="blog-article-deck">{post.excerpt}</p>
          <div className="blog-author"><span className="blog-author-mark" aria-hidden="true">EL</span><span><strong>Exotic Lotus Infotech</strong><small>{post.author} · <time dateTime={post.dateTime}>{post.date}</time></small></span></div>
        </div>
      </header>

      <div className="blog-container blog-article-content-grid">
        <div className="blog-article-body">
          <div className="blog-article-image"><Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 850px" /></div>
          <div className="blog-prose">
            {post.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {post.quote && <blockquote>{post.quote}</blockquote>}
            {post.sections.map((section) => (
              <section id={section.id} className="blog-prose-section" key={section.id}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.quote && <blockquote>{section.quote}</blockquote>}
                {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                {section.platformLink && <a className="blog-platform-link" href={section.platformLink.href} target="_blank" rel="noopener noreferrer">{section.platformLink.label} <span aria-hidden="true">↗</span></a>}
                {section.table && (
                  <div className="blog-table-scroll" role="region" tabIndex="0" aria-label="Technology cost comparison">
                    <table><thead><tr>{section.table.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
                      <tbody>{section.table.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>
          <div className="blog-tags" aria-label="Article topics">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
          <div className="blog-article-end"><span>MORE FROM THE JOURNAL</span><Link href="/blog">Explore all articles <span aria-hidden="true">↗</span></Link></div>
        </div>
        <ArticleTools sections={post.sections} title={post.title} />
      </div>
    </article>
  );
}
