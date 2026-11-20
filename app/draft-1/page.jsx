import SiteHeader from "../../components/SiteHeader";
import Hero from "../../components/Hero";
import CoreServices from "../../components/CoreServices";
import ScrollRevealStatement from "../../components/ScrollRevealStatement";
import SiteFooter from "../../components/SiteFooter";

export const metadata = {
  title: "Draft 1 | Exotic Lotus Infotech",
};

export default function DraftOnePage() {
  return (
    <div id="top" className="site-shell">
      <SiteHeader />
      <main className="page-canvas" aria-label="Homepage content">
        <Hero />
        <CoreServices />
        <ScrollRevealStatement />
      </main>
      <SiteFooter />
    </div>
  );
}
