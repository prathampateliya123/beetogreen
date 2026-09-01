"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedWords from "@/components/ui/AnimatedWords";
import SwooshButton from "@/components/ui/SwooshButton";
import Marquee from "@/components/ui/Marquee";
import { activez } from "@/data/home";

export default function ActivezSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".activez__card");
    if (!cards?.length) return;

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 80 + index * 40, rotate: 7 + index * 2, opacity: 0.6 },
        {
          y: 0,
          rotate: 7,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${index * 15}% center`,
            end: `top+=${(index + 1) * 25}% center`,
            scrub: 0.5,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section id="activez" className="activez" ref={sectionRef} style={{ background: "#0C1E18", color: "#fff" }}>
      <div className="activez__container">
        <h2 className="activez__title" style={{ color: "#E6FF55" }}>
          <AnimatedWords as="span" text={activez.title} />
        </h2>
        <p className="activez__subtitle">{activez.subtitle}</p>

        <div className="activez__cta">
          <SwooshButton href={activez.cta.href} variant="secondary" size="lg">
            {activez.cta.label}
          </SwooshButton>
        </div>

        {activez.cards.map((card, index) => (
          <article
            key={card.title}
            className="activez__card"
            style={{
              bottom: `${15 + index * 8}rem`,
              right: `${5 + index * 2}rem`,
              background: index === 0 ? "#E6FF55" : index === 1 ? "#005236" : "#F5F0E6",
              color: index === 0 ? "#0C1E18" : index === 1 ? "#E6FF55" : "#0C1E18",
            }}
          >
            <div className="activez__card-image">
              <Image
                src={card.image}
                alt=""
                width={300}
                height={150}
                className="activez__card-img"
              />
            </div>
            <div className="activez__card-text">
              <p className="activez__card-title">{card.stat}</p>
              <p className="activez__card-subtitle">{card.statLabel}</p>
              <p className="activez__card-disclaimer">{card.description}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="activez__marquee-label">{activez.marqueeLabel}</p>
      <div className="activez__marquee">
        <Marquee
          items={activez.partnerLogos}
          duration="20s"
          itemHeight="4rem"
          tint="black"
        />
      </div>
    </section>
  );
}
