import SiteHeader from "../../components/SiteHeader";
import HeroWave from "../../components/HeroWave";
import CoreServices from "../../components/CoreServices";
import ScrollJourney from "../../components/ScrollJourney";
import ScrollRevealStatement from "../../components/ScrollRevealStatement";
import SiteFooter from "../../components/SiteFooter";

export const metadata = {
  title: "Hero Draft 3 | Exotic Lotus Infotech",
};

export default function HeroDraftPage() {
  return (
    <div id="top" className="site-shell draft-two draft-three">
      <SiteHeader />
      <main className="page-canvas" aria-label="Homepage content">
        <ScrollJourney>
          <HeroWave />
          <CoreServices startRight controlled withMedia />
          <ScrollRevealStatement controlled />
        </ScrollJourney>
      </main>
      <SiteFooter refined />
    </div>
  );
}
