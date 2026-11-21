import { Newsreader } from "next/font/google";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import "./blog.css";

const editorialFont = Newsreader({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-editorial",
  display: "swap",
});

export default function BlogLayout({ children }) {
  return (
    <div id="top" className={`site-shell draft-two draft-three complete-site blog-site ${editorialFont.variable}`}>
      <SiteHeader complete blogPage />
      <main className="blog-main">{children}</main>
      <SiteFooter refined editorialMobile complete blogPage />
    </div>
  );
}
