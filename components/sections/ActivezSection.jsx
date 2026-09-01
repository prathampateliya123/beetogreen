"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import AnimatedParagraph from "@/components/ui/AnimatedParagraph";
import Marquee from "@/components/ui/Marquee";
import { activez } from "@/data/home";

export default function ActivezSection() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onScroll = () => {
      const rect = card.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * 0.15;
      card.style.setProperty("--parallax-y", `${offset}px`);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="hero-next">
      <section id="activez" className="activez" style={{ backgroundColor: activez.bgColor }}>
        <div className="activez__container">
          <AnimatedParagraph
            tag="h2"
            html={activez.title}
            className="activez__title"
            style={{ color: activez.titleColor }}
          />

          {(activez.cardImage || activez.cardTitle) && (
            <div
              ref={cardRef}
              className="activez__card"
              style={{
                backgroundColor: activez.cardBgColor,
                color: activez.cardTextColor,
              }}
            >
              {activez.cardImage && (
                <div className="activez__card-image">
                  <Image
                    src={activez.cardImage}
                    alt=""
                    width={320}
                    height={150}
                    className="activez__card-img"
                  />
                </div>
              )}
              <div className="activez__card-text">
                {activez.cardTitle && (
                  <p className="activez__card-title">{activez.cardTitle}</p>
                )}
                {activez.cardSubtitle && (
                  <p className="activez__card-subtitle">{activez.cardSubtitle}</p>
                )}
                {activez.cardDisclaimer && (
                  <p className="activez__card-disclaimer">{activez.cardDisclaimer}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {activez.marqueeLabel && (
          <p className="activez__marquee-label" style={{ color: activez.subtitleColor }}>
            {activez.marqueeLabel}
          </p>
        )}

        {activez.partnerLogos.length > 0 && (
          <div className="activez__marquee">
            <Marquee
              items={activez.partnerLogos}
              duration="16s"
              itemHeight="6rem"
              tint="white"
            />
          </div>
        )}
      </section>
    </div>
  );
}
