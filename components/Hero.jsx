import { getImageProps } from "next/image";

export default function Hero() {
  const commonImageProps = {
    alt: "",
    sizes: "(max-width: 899px) 100vw, (max-width: 1400px) 75vw, 980px",
    fetchPriority: "high",
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: "/hero/hero-lotus-desktop.webp",
    width: 1672,
    height: 941,
  });

  const {
    props: { srcSet: mobileSrcSet, ...mobileImageProps },
  } = getImageProps({
    ...commonImageProps,
    src: "/hero/hero-lotus-mobile.webp",
    width: 1254,
    height: 1254,
  });

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">Custom software development</p>
          <h1 id="hero-title" className="hero-title">
            <span>Business Software</span>
            <span>
              That Works <em>for You</em>
            </span>
          </h1>
          <p className="hero-description">
            We design and build CRM, ERP, SaaS and management systems that solve real business challenges.
          </p>
          <a
            className="hero-button"
            href="https://www.instagram.com/exoticlotus.tech/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Start a project with Exotic Lotus Infotech on Instagram"
          >
            Start a Project
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="hero-art" aria-hidden="true">
          <picture className="hero-picture">
            <source
              media="(min-width: 900px)"
              srcSet={desktopSrcSet}
              sizes="(max-width: 1400px) 75vw, 980px"
            />
            <img
              {...mobileImageProps}
              srcSet={mobileSrcSet}
              className="hero-image"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
