import SiteHeader from "../components/SiteHeader";
import Hero from "../components/Hero";
import CoreServices from "../components/CoreServices";
import ScrollJourney from "../components/ScrollJourney";
import ScrollRevealStatement from "../components/ScrollRevealStatement";
import SiteFooter from "../components/SiteFooter";

export default function HomePage() {
  return (
    <div id="top" className="site-shell draft-two">
      <SiteHeader />
      <main className="page-canvas" aria-label="Homepage content">
        <ScrollJourney>
          <Hero />
          <CoreServices startRight controlled withMedia />
          <ScrollRevealStatement controlled />
        </ScrollJourney>
      </main>
      <SiteFooter refined />
    </div>
  );
}
