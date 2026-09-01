"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApp } from "@/context/AppContext";
import AnimatedWords from "@/components/ui/AnimatedWords";
import SwooshButton from "@/components/ui/SwooshButton";
import { hero } from "@/data/home";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const ctasRef = useRef(null);
  const { isPreloaderDone, lenis } = useApp();

  useEffect(() => {
    if (!isPreloaderDone || !ctasRef.current) return;
    ctasRef.current.classList.add("section-hero__ctas--ready");
  }, [isPreloaderDone]);

  const scrollToNext = () => {
    const target = document.getElementById("hero-next");
    if (target && lenis) {
      lenis.scrollTo(target);
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section-hero" ref={sectionRef}>
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
          <p className="section-hero__label">{hero.label}</p>
          <AnimatedWords as="h1" className="section-hero__title" text={hero.title} />
          <p className="section-hero__subtitle">{hero.subtitle}</p>

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

        <p
          className="section-hero__bottom-text"
          dangerouslySetInnerHTML={{ __html: hero.bottomText }}
        />
      </div>

      <div id="hero-next" aria-hidden="true" />
    </section>
  );
}
