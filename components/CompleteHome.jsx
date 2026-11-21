import { Newsreader } from "next/font/google";
import SiteHeader from "./SiteHeader";
import HeroWave from "./HeroWave";
import CoreServices from "./CoreServices";
import ScrollJourney from "./ScrollJourney";
import CompanySections from "./CompanySections";
import CompanyMotion from "./CompanyMotion";
import SiteFooter from "./SiteFooter";

const editorialFont = Newsreader({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-editorial",
  display: "swap",
});

export default function CompleteHome() {
  return (
    <div id="top" className={`site-shell draft-two draft-three complete-site ${editorialFont.variable}`}>
      <SiteHeader complete />
      <main className="page-canvas" aria-label="Homepage content">
        <ScrollJourney hasStatement={false}>
          <HeroWave showStats />
          <CoreServices startRight controlled withMedia />
        </ScrollJourney>
        <CompanyMotion><CompanySections /></CompanyMotion>
      </main>
      <SiteFooter refined editorialMobile complete />
    </div>
  );
}
