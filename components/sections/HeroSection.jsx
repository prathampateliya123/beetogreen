"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useApp } from "@/context/AppContext";
import AnimatedParagraph from "@/components/ui/AnimatedParagraph";
import SwooshButton from "@/components/ui/SwooshButton";
import { hero } from "@/data/home";

const HERO_SHAPE_PATH =
  "M270.425 38.4964C372.561 73.8224 537.802 220.611 496.984 324.015C441.229 465.261 9.73912 396.702 44.3848 265.283C79.0577 133.76 425.118 324.547 377.84 502.949C356.856 582.133 266.953 611.185 195.833 613.198C192.14 613.303 190.85 619.406 194.16 621.038C260.632 653.804 332.782 733.603 323.697 852.43";

export default function HeroSection() {
  const ctasRef = useRef(null);
  const shapePathRef = useRef(null);
  const { isPreloaderDone, isPreloaderTransition, lenis } = useApp();

  useEffect(() => {
    if (!isPreloaderDone || isPreloaderTransition || !ctasRef.current) return;
    ctasRef.current.classList.add("section-hero__ctas--ready");
  }, [isPreloaderDone, isPreloaderTransition]);

  useEffect(() => {
    if (!shapePathRef.current || !isPreloaderDone || isPreloaderTransition) return;
    const path = shapePathRef.current;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2.4,
      ease: "power2.inOut",
      delay: 0.2,
    });
  }, [isPreloaderDone, isPreloaderTransition]);

  const scrollToNext = (event) => {
    event.preventDefault();
    const target = document.getElementById("hero-next");
    if (target && lenis) {
      lenis.scrollTo(target);
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section-hero">
      <div className="section-hero__bg" aria-hidden="true">
        <video
          className="section-hero__bg-media"
          src="/media/Hero_mini_comp.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
      <div className="section-hero__veil" aria-hidden="true" />

      <div
        className="ui-shape section-hero__shape"
        style={{
          top: "-10rem",
          left: "-10rem",
          width: "110rem",
          opacity: 1,
          color: hero.shapeColor,
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 546 856" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            ref={shapePathRef}
            d={HERO_SHAPE_PATH}
            stroke="currentColor"
            strokeWidth="83.2"
            strokeLinejoin="bevel"
            fill="none"
          />
        </svg>
      </div>

      <div
        className="section-hero__container"
        style={{ "--asterisk-color": hero.asteriskColor }}
      >
        <div className="section-hero__content">
          <AnimatedParagraph
            as="h1"
            className="section-hero__title"
            text={hero.title}
            style={{ color: hero.titleColor }}
          />
          <AnimatedParagraph
            as="p"
            className="section-hero__subtitle"
            text={hero.subtitle}
            style={{ color: hero.subtitleColor }}
          />

          <div className="section-hero__ctas" ref={ctasRef}>
            <SwooshButton href={hero.ctaPrimary.href} variant="secondary" size="lg">
              {hero.ctaPrimary.label}
            </SwooshButton>
            <a
              href={hero.ctaSecondary.href}
              className="section-hero__cta-underline"
              style={{ color: hero.titleColor }}
              onClick={scrollToNext}
            >
              {hero.ctaSecondary.label}
            </a>
          </div>
        </div>

        <AnimatedParagraph
          as="p"
          className="section-hero__bottom-text"
          text={hero.bottomText}
          style={{ color: hero.bottomTextColor }}
        />
      </div>
    </section>
  );
}
