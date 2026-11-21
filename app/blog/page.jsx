import Link from "next/link";
import BlogIndex from "../../components/BlogIndex";
import { blogPosts } from "../../lib/blogPosts";

export const metadata = {
  title: "Blog | Exotic Lotus Infotech",
  description: "Ideas and practical insights on AI, automation, web development, and digital products from Exotic Lotus Infotech.",
};

export default function BlogPage() {
  return (
    <>
      <section className="blog-hero" aria-labelledby="blog-title">
        <div className="blog-container">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Blog</span>
          </nav>
          <div className="blog-eyebrow"><span /> IDEAS & INSIGHTS</div>
          <h1 id="blog-title">The Exotic Lotus <em>Blog.</em></h1>
          <p>Industry insights, tech comparisons, and useful perspectives on AI automation, web development, and mobile products.</p>
        </div>
      </section>
      <BlogIndex posts={blogPosts} />
    </>
  );
}
