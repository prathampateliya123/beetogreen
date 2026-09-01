"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { testimonials } from "@/data/home";

const DURATION = 8000;

function ProgressRing({ paused }) {
  return (
    <svg className="testimonials__arrow-progress" viewBox="0 0 52 52" aria-hidden="true">
      <circle
        cx="26"
        cy="26"
        r="24"
        className={paused ? "testimonials__arrow--paused" : ""}
        style={{ animationDuration: `${DURATION}ms` }}
      />
    </svg>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const item = testimonials[active];
  const counter = String(active + 1).padStart(2, "0");
  const total = String(testimonials.length).padStart(2, "0");

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setTimeout(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, paused]);

  const goNext = () => setActive((current) => (current + 1) % testimonials.length);
  const goPrev = () =>
    setActive((current) => (current - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="testimonials">
      <div className="testimonials__inner">
        <div className="testimonials__container">
          <div className="testimonials__nav">
            <button
              type="button"
              className="testimonials__arrow"
              onClick={goPrev}
              aria-label="Previous testimonial"
            >
              <svg className="testimonials__arrow-icon" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <button
              type="button"
              className="testimonials__arrow testimonials__arrow--next"
              onClick={goNext}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              aria-label="Next testimonial"
            >
              <ProgressRing paused={paused} key={active} />
              <svg className="testimonials__arrow-icon" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>

          <div className="testimonials__content">
            <div className="testimonials__header">
              <p className="testimonials__counter">
                {counter} / {total}
              </p>
              <h2 className="testimonials__label">Don&apos;t just take our word for it…</h2>
            </div>

            <blockquote className="testimonials__quote testimonials__quote--entered">
              {item.quote.split(" ").map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="testimonials__word"
                  style={{ "--delay": `${index * 0.005}s` }}
                >
                  <span className="testimonials__word-inner">{word} </span>
                </span>
              ))}
            </blockquote>

            <footer className="testimonials__author">
              <div className="testimonials__author-photo">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="testimonials__author-image"
                />
              </div>
              <div className="testimonials__author-info">
                <div className="testimonials__author-text">
                  <cite className="testimonials__author-name">{item.name}</cite>
                  <p className="testimonials__author-company">{item.company}</p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
