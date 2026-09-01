"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import AnimatedParagraph from "@/components/ui/AnimatedParagraph";
import { process } from "@/data/home";

function RevealWords({ text, className }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="reveal-word">
          <span className="reveal-word__inner reveal-word__inner--entry">{word}</span>
          {index < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const [paused, setPaused] = useState(false);
  const wrapperRef = useRef(null);
  const timerRef = useRef(null);
  const { isPreloaderTransition } = useApp();
  const step = process.steps[active];

  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!entered || paused || isPreloaderTransition) return;
    timerRef.current = window.setTimeout(() => {
      setActive((current) => (current < process.steps.length - 1 ? current + 1 : current));
    }, 4000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, entered, paused, isPreloaderTransition]);

  return (
    <section
      ref={wrapperRef}
      className={`process ${entered ? "process--entered" : ""} ${entered && !paused ? "process--auto" : ""}`}
      style={{ backgroundColor: step.bgColor, color: step.textColor }}
    >
      <div className="process__pin">
        <div className="process__inner">
          <AnimatedParagraph as="h2" className="process__title" text={process.title} />

          <div className="process__grid">
            <ul className="process__steps">
              {process.steps.map((item, index) => (
                <li
                  key={item.label}
                  className={`process__step ${index === active ? "process__step--active" : ""}`}
                  style={{ "--entry-delay": `${0.3 + index * 0.1}s` }}
                >
                  <button
                    type="button"
                    className="process__step-btn"
                    aria-current={index === active ? "step" : undefined}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                    onClick={() => setActive(index)}
                  >
                    <span className="process__step-text">
                      <RevealWords text={item.label} />
                    </span>
                    <span className="process__step-line">
                      <span className="process__step-line-fill" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="process__visual">
              {process.steps.map((item, index) => (
                <div
                  key={item.image}
                  className={`process__visual-layer ${
                    index === active
                      ? "process__visual-layer--active"
                      : index < active
                        ? "process__visual-layer--past"
                        : ""
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={600}
                    height={500}
                    className="process__image"
                  />
                </div>
              ))}
            </div>

            <div className="process__content">
              {process.steps.map((item, index) => (
                <div
                  key={item.label}
                  className={`process__content-inner ${
                    index === active
                      ? "process__content-inner--active"
                      : index < active
                        ? "process__content-inner--past"
                        : "process__content-inner--future"
                  }`}
                >
                  <p className="process__small-label">
                    <RevealWords text={item.smallLabel} />
                  </p>
                  <h3 className="process__step-title">
                    <RevealWords text={item.title} />
                  </h3>
                  <p className="process__description">
                    <RevealWords text={item.description} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
