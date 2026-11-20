import Hero from "./Hero";

export default function HeroWave() {
  return (
    <div className="hero-wave-stage">
      <svg
        className="hero-wave-backdrop"
        viewBox="0 0 1440 760"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hero-wave-bloom">
            <stop offset="0" stopColor="#d3b4fa" stopOpacity=".66" />
            <stop offset="1" stopColor="#d3b4fa" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hero-wave-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f9eefa" stopOpacity=".22" />
            <stop offset=".56" stopColor="#dbc4f3" stopOpacity=".44" />
            <stop offset="1" stopColor="#a27de1" stopOpacity=".17" />
          </linearGradient>
          <linearGradient id="hero-wave-bottom" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#efdcf5" stopOpacity=".22" />
            <stop offset=".55" stopColor="#c6a4ed" stopOpacity=".34" />
            <stop offset="1" stopColor="#e9daf7" stopOpacity=".14" />
          </linearGradient>
        </defs>
        <ellipse cx="1100" cy="330" rx="490" ry="330" fill="url(#hero-wave-bloom)" />
        <path
          d="M0 530 C210 550 280 665 472 581 C641 506 705 460 850 478 C1045 504 1100 622 1440 516 L1440 760 L0 760 Z"
          fill="url(#hero-wave-top)"
        />
        <path
          d="M0 630 C195 688 288 747 455 691 C653 625 777 554 956 585 C1135 616 1260 705 1440 610 L1440 760 L0 760 Z"
          fill="url(#hero-wave-bottom)"
        />
        <path
          d="M0 533 C208 555 289 665 472 581 C641 506 705 460 850 478 C1045 504 1100 622 1440 516"
          fill="none"
          stroke="#fff"
          strokeOpacity=".4"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="hero-wave-backdrop hero-wave-backdrop-mobile"
        viewBox="0 0 390 740"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-wave-mobile-front" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#eee0f8" stopOpacity=".12" />
            <stop offset=".65" stopColor="#cfb3ee" stopOpacity=".45" />
            <stop offset="1" stopColor="#e6d5f6" stopOpacity=".25" />
          </linearGradient>
          <linearGradient id="hero-wave-mobile-back" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#efe0f7" stopOpacity=".08" />
            <stop offset="1" stopColor="#d2b3ed" stopOpacity=".32" />
          </linearGradient>
        </defs>
        <path
          d="M0 570 C80 590 120 525 199 551 C275 577 302 542 390 515 L390 740 L0 740 Z"
          fill="url(#hero-wave-mobile-back)"
        />
        <path
          d="M0 636 C90 665 126 610 213 626 C302 643 327 610 390 581 L390 740 L0 740 Z"
          fill="url(#hero-wave-mobile-front)"
        />
      </svg>
      <Hero secondaryAction />
    </div>
  );
}
