import { Newsreader } from "next/font/google";
import SiteHeader from "./SiteHeader";
import HeroWave from "./HeroWave";
import CoreServices from "./CoreServices";
import ScrollJourney from "./ScrollJourney";
import ScrollRevealStatement from "./ScrollRevealStatement";
import SiteFooter from "./SiteFooter";

const editorialFont = Newsreader({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-editorial",
  display: "swap",
});

export default function CurrentHome() {
  return (
    <div id="top" className={`site-shell draft-two draft-three ${editorialFont.variable}`}>
      <SiteHeader />
      <main className="page-canvas" aria-label="Homepage content">
        <ScrollJourney>
          <HeroWave />
          <CoreServices startRight controlled withMedia />
          <ScrollRevealStatement controlled />
        </ScrollJourney>
      </main>
      <SiteFooter refined editorialMobile />
    </div>
  );
}
