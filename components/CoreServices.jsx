"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const services = [
  {
    title: "CRM & ERP Solutions",
    description:
      "Organize customer, team, and operational work in systems shaped around your processes.",
    image: "/services/crm-erp-product.png",
    imageAlt: "Connected customer, operations, and analytics panels",
  },
  {
    title: "SaaS & Custom Software",
    description:
      "Develop a focused platform or product for workflows that off-the-shelf tools cannot fit.",
    image: "/services/saas-custom-product.png",
    imageAlt: "Custom software platform with connected modules",
  },
  {
    title: "AI & Business Automation",
    description:
      "Connect tools and reduce repetitive tasks with carefully designed automation.",
    image: "/services/ai-automation-product.png",
    imageAlt: "Automated workflow connecting inputs to business tasks",
  },
  {
    title: "Web & Mobile Applications",
    description:
      "Put the right experience in the hands of teams and customers, wherever they work.",
    image: "/services/web-mobile-product.png",
    imageAlt: "Web dashboard and mobile application displayed together",
  },
];

function clamp(value) {
  return Math.max(0, Math.min(1, value));
}

function makeRoute(points) {
  if (!points.length) return "";

  let route = `M ${points[0].x} ${points[0].y}`;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const direction = Math.sign(current.x - previous.x);

    if (!direction || Math.abs(current.x - previous.x) < 8) {
      route += ` L ${current.x} ${current.y}`;
      continue;
    }

    const midpoint = (previous.y + current.y) / 2;
    const radius = Math.min(34, (current.y - previous.y) / 4, Math.abs(current.x - previous.x) / 5);

    route += ` L ${previous.x} ${midpoint - radius}`;
    route += ` Q ${previous.x} ${midpoint} ${previous.x + direction * radius} ${midpoint}`;
    route += ` L ${current.x - direction * radius} ${midpoint}`;
    route += ` Q ${current.x} ${midpoint} ${current.x} ${midpoint + radius}`;
    route += ` L ${current.x} ${current.y}`;
  }

  return route;
}

export default function CoreServices({ startRight = false, controlled = false, withMedia = false }) {
  const flowRef = useRef(null);

  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return;

    const svg = flow.querySelector("[data-services-svg]");
    const backgroundPath = flow.querySelector("[data-services-background]");
    const progressPath = flow.querySelector("[data-services-progress]");
    const anchors = Array.from(flow.querySelectorAll("[data-service-anchor]"));
    const rows = Array.from(flow.querySelectorAll("[data-service-row]"));
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let points = [];
    let pathLength = 0;
    let frame = 0;

    function update() {
      frame = 0;
      if (!pathLength || points.length < 2) return;

      if (motionPreference.matches) {
        progressPath.style.strokeDashoffset = "0";
        rows.forEach((row) => row.classList.add("is-active"));
        return;
      }

      const flowTop = flow.getBoundingClientRect().top;
      const firstY = points[0].y;
      const lastY = points[points.length - 1].y;
      const distance = lastY - firstY + window.innerHeight * 0.57;
      const progress = clamp((window.innerHeight * 0.82 - flowTop - firstY) / distance);

      progressPath.style.strokeDashoffset = String(pathLength * (1 - progress));
      rows.forEach((row, index) => {
        const threshold = index / (rows.length - 1);
        row.classList.toggle("is-active", progress > 0 && progress >= threshold);
      });
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    function measure() {
      const rect = flow.getBoundingClientRect();
      points = anchors.map((anchor) => {
        const anchorRect = anchor.getBoundingClientRect();
        return {
          x: Number((anchorRect.left + anchorRect.width / 2 - rect.left).toFixed(2)),
          y: Number((anchorRect.top + anchorRect.height / 2 - rect.top).toFixed(2)),
        };
      });

      svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
      const route = makeRoute(points);
      backgroundPath.setAttribute("d", route);
      progressPath.setAttribute("d", route);
      pathLength = progressPath.getTotalLength();
      progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
      if (controlled) {
        progressPath.style.strokeDashoffset = motionPreference.matches ? "0" : String(pathLength);
        rows.forEach((row) => row.classList.toggle("is-active", motionPreference.matches));
      } else {
        update();
      }
    }

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(flow);
    measure();
    if (!controlled) window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measure);
    motionPreference.addEventListener("change", measure);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      if (!controlled) window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measure);
      motionPreference.removeEventListener("change", measure);
    };
  }, [controlled]);

  return (
    <section className="services-section" id="core-services" aria-labelledby="services-heading">
      <div className="services-inner">
        <div className="services-intro">
          <div>
            <p className="services-eyebrow">Core services</p>
            <h2 id="services-heading">Software built for real work.</h2>
          </div>
          <p className="services-intro-copy">
            From internal systems to customer-facing products, we develop software around practical business needs.
          </p>
        </div>

        <div className="services-flow" ref={flowRef}>
          <svg className="services-route" data-services-svg aria-hidden="true" preserveAspectRatio="none">
            <path className="services-route-background" data-services-background />
            <path className="services-route-progress" data-services-progress />
          </svg>

          {services.map((service, index) => (
            <article
              className={`service-row${(index + Number(startRight)) % 2 ? " is-right" : ""}`}
              data-service-row
              key={service.title}
            >
              <span className="service-anchor" data-service-anchor aria-hidden="true" />
              <div className="service-media">
                {withMedia && (
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 700px) calc(100vw - 90px), (max-width: 899px) 38vw, 41vw"
                  />
                )}
              </div>
              <div className="service-detail">
                <p className="service-index">{String(index + 1).padStart(2, "0")} / 04</p>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
