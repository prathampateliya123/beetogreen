"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import AnimatedParagraph from "@/components/ui/AnimatedParagraph";
import SwooshButton from "@/components/ui/SwooshButton";
import { hero } from "@/data/home";

export default function HeroSection() {
  const ctasRef = useRef(null);
  const { isPreloaderDone, isPreloaderTransition, lenis } = useApp();

  useEffect(() => {
    if (!isPreloaderDone || isPreloaderTransition || !ctasRef.current) return;
    ctasRef.current.classList.add("section-hero__ctas--ready");
  }, [isPreloaderDone, isPreloaderTransition]);

  const scrollToNext = () => {
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
        />
      </div>
      <div className="section-hero__veil" aria-hidden="true" />

      <div className="section-hero__container">
        <div className="section-hero__content">
          <AnimatedParagraph as="h1" className="section-hero__title" text={hero.title} />

          <div className="section-hero__ctas" ref={ctasRef}>
            <SwooshButton href={hero.ctaPrimary.href} variant="secondary" size="lg">
              {hero.ctaPrimary.label}
            </SwooshButton>
            <button
              type="button"
              className="section-hero__cta-underline"
              onClick={scrollToNext}
            >
              {hero.ctaSecondary.label}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
