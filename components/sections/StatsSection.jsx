"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/data/home";

export default function StatsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const wraps = sectionRef.current?.querySelectorAll(".stats__card-wrap");
    if (!wraps?.length) return;

    wraps.forEach((wrap, index) => {
      const card = wrap.querySelector(".stats__card");
      if (!card) return;

      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
      });

      gsap.fromTo(
        card,
        { scale: 1, rotateX: 0, rotate: 0 },
        {
          scale: 0.85,
          rotateX: 8,
          rotate: index % 2 === 0 ? -3 : 3,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "center center",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="stats" ref={sectionRef}>
      <div className="stats__bg" style={{ position: "relative" }}>
        <Image
          src="/images/Card-section2_1.png"
          alt=""
          fill
          sizes="100vw"
          className="stats__bg-image"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="stats__cards">
        {stats.map((stat) => (
          <div key={stat.title} className="stats__card-wrap">
            <article
              className="stats__card"
              style={{
                "--card-bg": stat.bgColor,
                "--card-color": stat.textColor,
                backgroundColor: stat.bgColor,
                color: stat.textColor,
              }}
            >
              <h3 className="stats__card-title">{stat.title}</h3>
              <div
                className={`stats__card-subtitle-row ${stat.value ? "stats__card-subtitle-row--with-number" : ""}`}
              >
                {stat.value && <p className="stats__card-number">{stat.value}</p>}
                {stat.subtitle && <p className="stats__card-subtitle">{stat.subtitle}</p>}
              </div>
              <p className="stats__card-description">{stat.description}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
