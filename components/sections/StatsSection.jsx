"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedParagraph from "@/components/ui/AnimatedParagraph";
import UiShape, { getStatsShape } from "@/components/ui/UiShape";
import { stats } from "@/data/home";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_QUERY = "(max-width: 768px)";

export default function StatsSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const cardsRef = useRef(null);
  const wrapRefs = useRef([]);
  const [shapeEntered, setShapeEntered] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const markShapeEntered = (index) => {
    setShapeEntered((prev) => {
      if (prev[index]) return prev;
      return { ...prev, [index]: true };
    });
  };

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const syncMobile = () => setIsMobile(media.matches);
    syncMobile();
    media.addEventListener("change", syncMobile);
    return () => media.removeEventListener("change", syncMobile);
  }, []);

  useEffect(() => {
    const wraps = wrapRefs.current.filter(Boolean);
    const lastWrap = wraps[wraps.length - 1];
    const triggers = [];

    if (!bgRef.current || !lastWrap || wraps.length === 0) return;

    if (isMobile) {
      wraps.forEach((wrap, index) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: wrap,
            start: "top 85%",
            onEnter: () => markShapeEntered(index),
            onEnterBack: () => markShapeEntered(index),
          })
        );
      });

      ScrollTrigger.refresh();

      wraps.forEach((wrap, index) => {
        const rect = wrap.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          markShapeEntered(index);
        }
      });

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    }

    triggers.push(
      ScrollTrigger.create({
        trigger: bgRef.current,
        start: "top top",
        endTrigger: lastWrap,
        end: "top top",
        pin: true,
        pinSpacing: false,
      })
    );

    wraps.forEach((wrap, index) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: wrap,
          start: "top top",
          endTrigger: lastWrap,
          end: "top top",
          pin: true,
          pinSpacing: false,
        })
      );

      triggers.push(
        ScrollTrigger.create({
          trigger: wrap,
          start: "top top",
          onEnter: () => markShapeEntered(index),
          onEnterBack: () => markShapeEntered(index),
        })
      );

      if (index < wraps.length - 1) {
        const nextWrap = wraps[index + 1];
        triggers.push(
          ScrollTrigger.create({
            trigger: nextWrap,
            start: "top bottom",
            end: "top top",
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(wrap, {
                rotate: 4 * progress,
                rotateX: 36 * progress,
                scale: 1 - 0.2 * progress,
              });
            },
          })
        );
      }
    });

    ScrollTrigger.refresh();

    wraps.forEach((wrap, index) => {
      const rect = wrap.getBoundingClientRect();
      if (rect.top <= 1 && rect.bottom > window.innerHeight * 0.5) {
        markShapeEntered(index);
      }
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      wraps.forEach((wrap) => {
        gsap.set(wrap, { clearProps: "rotate,rotateX,scale" });
      });
    };
  }, [isMobile]);

  return (
    <section className={`stats ${isMobile ? "stats--no-pin" : ""}`} ref={sectionRef}>
      <div className="stats__bg" ref={bgRef}>
        <Image
          src="/images/Card-section2.png"
          alt="Beetogreen employee"
          fill
          sizes="100vw"
          className="stats__bg-image"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="stats__cards" ref={cardsRef}>
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className="stats__card-wrap"
            ref={(el) => {
              wrapRefs.current[index] = el;
            }}
          >
            <article
              className="stats__card"
              style={{
                "--card-bg": stat.bgColor,
                "--card-color": stat.textColor,
                backgroundColor: stat.bgColor,
                color: stat.textColor,
              }}
            >
              <UiShape shape={getStatsShape(index)} entered={shapeEntered[index]} />

              <AnimatedParagraph as="h3" className="stats__card-title" text={stat.title} />

              <div
                className={`stats__card-subtitle-row ${
                  stat.value ? "stats__card-subtitle-row--with-number" : ""
                }`}
              >
                {stat.value && (
                  <AnimatedParagraph as="p" className="stats__card-number" text={stat.value} delay={0} />
                )}
                {stat.subtitle && (
                  <AnimatedParagraph as="p" className="stats__card-subtitle" text={stat.subtitle} delay={0} />
                )}
              </div>

              {stat.description && (
                <AnimatedParagraph
                  as="p"
                  className="stats__card-description"
                  text={stat.description}
                  delay={0}
                />
              )}
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
