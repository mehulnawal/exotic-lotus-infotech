"use client";

import { useEffect, useRef } from "react";

function clamp(value) {
  return Math.max(0, Math.min(1, value));
}

function mix(from, to, progress) {
  return from + (to - from) * progress;
}

function quickApproach(progress, strength) {
  return (1 - Math.exp(-strength * progress)) / (1 - Math.exp(-strength));
}

export default function ScrollJourney({ children, hasStatement = true }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const art = scene?.querySelector(".hero-art");
    const flow = scene?.querySelector(".services-flow");
    const route = scene?.querySelector("[data-services-progress]");
    const statement = scene?.querySelector(".statement-section");
    const heading = statement?.querySelector(".statement-heading");
    const words = Array.from(heading?.querySelectorAll("[data-reveal-word]") ?? []);
    const rows = Array.from(scene?.querySelectorAll("[data-service-row]") ?? []);
    const editorialReveal = Boolean(scene?.closest(".draft-three"));
    if (!scene || !art || !flow || !route || (hasStatement && (!statement || !heading))) return;

    const heroImage = art.querySelector("img");
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let geometry = null;
    let displayedScroll = window.scrollY;
    let previousFrameTime = 0;
    let updateFrame = 0;
    let measureFrame = 0;
    let lastTextProgress = -1;
    let lastActiveRows = -1;
    let lastRowReveals = [];

    function reset() {
      geometry = null;
      scene.classList.remove("is-journey-ready");
      heading?.classList.remove("is-ready");
      art.style.transform = "";
      art.style.opacity = "";
      route.style.strokeDashoffset = motionPreference.matches ? "0" : "";
      rows.forEach((row) => {
        row.classList.toggle("is-active", motionPreference.matches);
        const detail = row.querySelector(".service-detail");
        detail.style.opacity = "";
        detail.style.transform = "";
      });
      words.forEach((word) => word.style.removeProperty("--word-opacity"));
    }

    function render(scroll) {
      if (!geometry || motionPreference.matches) return;

      const routeProgress = clamp((scroll - geometry.routeStart) / geometry.routeDistance);
      const dashOffset = String(geometry.pathLength * (1 - routeProgress));
      if (route.style.strokeDashoffset !== dashOffset) route.style.strokeDashoffset = dashOffset;
      const activeRows = routeProgress > 0
        ? Math.min(rows.length, Math.floor(routeProgress * (rows.length - 1)) + 1)
        : 0;
      if (activeRows !== lastActiveRows) {
        rows.forEach((row, index) => row.classList.toggle("is-active", index < activeRows));
        lastActiveRows = activeRows;
      }

      let x = geometry.artX;
      let y = geometry.artY;
      let scale = 1;
      let opacity = 1;
      const mobile = geometry.mobile;

      if (scroll >= geometry.shrinkStart && scroll < geometry.routeStart) {
        const progress = clamp((scroll - geometry.startScroll) / (geometry.routeStart - geometry.startScroll));
        const shrinkProgress = mobile
          ? clamp((scroll - geometry.shrinkStart) / (geometry.shrinkEnd - geometry.shrinkStart))
          : progress;
        const shrink = mobile
          ? shrinkProgress * shrinkProgress * (3 - 2 * shrinkProgress)
          : quickApproach(progress, 3);
        const fastProgress = quickApproach(mobile ? shrink : progress, 4);
        x = mix(geometry.artX, geometry.firstX, fastProgress);
        y = mix(geometry.artY, geometry.firstY, mobile ? quickApproach(progress, 3.5) : progress);
        scale = mix(1, geometry.markerScale, shrink);
      } else if (scroll >= geometry.routeStart && scroll < geometry.routeEnd) {
        const point = route.getPointAtLength(routeProgress * geometry.pathLength);
        x = geometry.flowX + point.x;
        y = geometry.flowY + point.y;
        scale = geometry.markerScale;
      } else if ((mobile || !hasStatement) && scroll >= geometry.routeEnd) {
        const progress = clamp((scroll - geometry.routeEnd) / (geometry.exitEnd - geometry.routeEnd));
        x = geometry.lastX;
        y = geometry.lastY - 24 * progress;
        scale = geometry.markerScale * (1 + progress * 0.2);
        opacity = 1 - progress * progress * (3 - 2 * progress);
      } else if (scroll >= geometry.routeEnd && scroll < geometry.whyArrive) {
        const progress = clamp((scroll - geometry.routeEnd) / (geometry.whyArrive - geometry.routeEnd));
        x = mix(geometry.lastX, geometry.whyX, quickApproach(progress, 5));
        y = mix(geometry.lastY, geometry.whyY, progress);
        scale = mix(geometry.markerScale, geometry.whyScale, clamp((progress - 0.72) / 0.28));
      } else if (scroll >= geometry.whyArrive) {
        x = geometry.whyX;
        y = geometry.whyY;
        scale = geometry.whyScale;

        if (scroll >= geometry.whyDepart) {
          const progress = clamp((scroll - geometry.whyDepart) / (geometry.exitEnd - geometry.whyDepart));
          y -= window.innerHeight * 0.22 * progress;
          scale *= 1 - progress * 0.12;
          opacity = 1 - progress;
        }
      }

      if (mobile) {
        const halfWidth = (geometry.artWidth * scale) / 2;
        x = Math.min(x, geometry.viewportRight - halfWidth - 16);
      }

      const transform = `translate3d(${(x - geometry.artX).toFixed(2)}px, ${(y - geometry.artY).toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      const opacityValue = opacity.toFixed(3);
      if (art.style.transform !== transform) art.style.transform = transform;
      if (art.style.opacity !== opacityValue) art.style.opacity = opacityValue;

      rows.forEach((row, index) => {
        const rowTop = geometry.rowTops[index] - scroll;
        const reveal = clamp((window.innerHeight * 0.88 - rowTop) / (window.innerHeight * 0.42));
        if (Math.abs(reveal - (lastRowReveals[index] ?? -1)) < 0.002) return;
        lastRowReveals[index] = reveal;
        const detail = row.querySelector(".service-detail");
        detail.style.opacity = (0.42 + reveal * 0.58).toFixed(3);
        detail.style.transform = `translate3d(0, ${((1 - reveal) * 18).toFixed(2)}px, 0)`;
      });

      if (heading) {
        const headingTop = geometry.headingTop - scroll;
        const start = window.innerHeight * 0.82;
        const end = window.innerHeight * (mobile ? 0.42 : 0.3);
        const textProgress = clamp((start - headingTop) / (start - end));
        if (Math.abs(textProgress - lastTextProgress) >= 0.002) {
          lastTextProgress = textProgress;
          words.forEach((word, index) => {
            const reveal = clamp(textProgress * (words.length + 0.5) - index);
            const restingOpacity = editorialReveal ? 0.2 : 0.46;
            word.style.setProperty("--word-opacity", (restingOpacity + reveal * (1 - restingOpacity)).toFixed(3));
          });
        }
      }
    }

    function update(time) {
      updateFrame = 0;
      if (!geometry || motionPreference.matches) return;

      const elapsed = previousFrameTime ? time - previousFrameTime : 16;
      previousFrameTime = time;
      const blend = 1 - Math.exp(-elapsed / 105);
      displayedScroll += (window.scrollY - displayedScroll) * blend;
      if (Math.abs(window.scrollY - displayedScroll) < 0.25) displayedScroll = window.scrollY;
      render(displayedScroll);
      if (displayedScroll !== window.scrollY) scheduleUpdate();
    }

    function scheduleUpdate() {
      if (!updateFrame) updateFrame = window.requestAnimationFrame(update);
    }

    function measure() {
      measureFrame = 0;
      if (motionPreference.matches) {
        reset();
        return;
      }

      if (!route.getAttribute("d")) {
        scheduleMeasure();
        return;
      }

      const previousTransform = art.style.transform;
      art.style.transform = "none";
      const artRect = art.getBoundingClientRect();
      art.style.transform = previousTransform;

      const sceneRect = scene.getBoundingClientRect();
      const flowRect = flow.getBoundingClientRect();
      const statementRect = statement?.getBoundingClientRect();
      const headingRect = heading?.getBoundingClientRect();
      const pathLength = route.getTotalLength();
      if (!pathLength || !artRect.width) return;

      const first = route.getPointAtLength(0);
      const last = route.getPointAtLength(pathLength);
      const mobile = window.innerWidth <= 700;
      const startPosition = mobile ? 0.53 : 0.65;
      const endPosition = mobile ? 0.48 : 0.55;
      const routeStart = flowRect.top + window.scrollY + first.y - window.innerHeight * startPosition;
      const routeDistance = last.y - first.y + window.innerHeight * (startPosition - endPosition);
      const routeEnd = routeStart + routeDistance;
      const artX = artRect.left - sceneRect.left + artRect.width / 2;
      const artY = artRect.top - sceneRect.top + artRect.height / 2;
      const flowX = flowRect.left - sceneRect.left;
      const flowY = flowRect.top - sceneRect.top;
      const firstX = flowX + first.x;
      const firstY = flowY + first.y;
      const lastX = flowX + last.x;
      const lastY = flowY + last.y;
      const whyX = statementRect ? statementRect.right - sceneRect.left - (mobile ? 80 : 180) : lastX;
      const whyY = statementRect
        ? mobile
          ? headingRect.bottom - sceneRect.top + 42
          : statementRect.top - sceneRect.top + statementRect.height * 0.52
        : lastY;
      const statementTop = statementRect ? statementRect.top + window.scrollY : routeEnd;
      const statementBottom = statementRect ? statementRect.bottom + window.scrollY : routeEnd;
      const whyArrive = Math.max(routeEnd + 100, statementTop - window.innerHeight * 0.3);
      const whyDepart = Math.max(whyArrive + 80, statementBottom - window.innerHeight * 0.62);
      const mobileExitEnd = Math.max(routeEnd + 100, statementTop - window.innerHeight * 0.78);

      const startScroll = Math.max(0, Math.min(routeStart - 120, artRect.bottom + window.scrollY - window.innerHeight * 0.4));

      geometry = {
        artX,
        artY,
        artWidth: artRect.width,
        viewportRight: window.innerWidth - sceneRect.left,
        flowX,
        flowY,
        firstX,
        firstY,
        lastX,
        lastY,
        whyX,
        whyY,
        headingTop: headingRect ? headingRect.top + window.scrollY : null,
        rowTops: rows.map((row) => row.getBoundingClientRect().top + window.scrollY),
        pathLength,
        mobile,
        markerScale: Math.min(1, (mobile ? 48 : 96) / artRect.width),
        whyScale: Math.min(1, (mobile ? 135 : 250) / artRect.width),
        startScroll,
        shrinkStart: mobile ? Math.max(0, startScroll - window.innerHeight * 0.25) : startScroll,
        shrinkEnd: mobile ? startScroll + 40 : startScroll,
        routeStart,
        routeDistance,
        routeEnd,
        whyArrive,
        whyDepart,
        exitEnd: !hasStatement
          ? routeEnd + Math.max(140, window.innerHeight * 0.28)
          : mobile ? mobileExitEnd : Math.max(whyDepart + 50, statementBottom - window.innerHeight * 0.47),
      };

      scene.classList.add("is-journey-ready");
      heading?.classList.add("is-ready");
      lastTextProgress = -1;
      lastActiveRows = -1;
      lastRowReveals = [];
      displayedScroll = window.scrollY;
      previousFrameTime = 0;
      render(displayedScroll);
    }

    function scheduleMeasure() {
      if (!measureFrame) measureFrame = window.requestAnimationFrame(measure);
    }

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(art);
    resizeObserver.observe(flow);
    if (statement) resizeObserver.observe(statement);
    const header = scene.closest(".site-shell")?.querySelector(".site-header");
    if (header) resizeObserver.observe(header);
    scheduleMeasure();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    heroImage?.addEventListener("load", scheduleMeasure);
    motionPreference.addEventListener("change", scheduleMeasure);

    return () => {
      window.cancelAnimationFrame(updateFrame);
      window.cancelAnimationFrame(measureFrame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleMeasure);
      heroImage?.removeEventListener("load", scheduleMeasure);
      motionPreference.removeEventListener("change", scheduleMeasure);
      reset();
    };
  }, [hasStatement]);

  return <div className="scroll-journey" ref={sceneRef}>{children}</div>;
}
