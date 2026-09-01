"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { testimonials } from "@/data/home";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 8000;
    const start = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / duration) * 100, 100));
    }, 50);

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
      setProgress(0);
    }, duration);

    return () => {
      clearInterval(timer);
      clearInterval(progressInterval);
    };
  }, [active]);

  const item = testimonials[active];
  const counter = String(active + 1).padStart(2, "0");
  const total = String(testimonials.length).padStart(2, "0");

  const goNext = () => {
    setActive((current) => (current + 1) % testimonials.length);
    setProgress(0);
  };

  const goPrev = () => {
    setActive((current) => (current - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  };

  return (
    <section className="testimonials">
      <div className="testimonials__inner">
        <div className="testimonials__header">
          <p className="testimonials__counter">
            {counter} / {total}
          </p>
          <h2 className="testimonials__label">Don&apos;t just take our word for it…</h2>
          <div className="testimonials__nav">
            <button type="button" className="testimonials__arrow" onClick={goPrev} aria-label="Previous testimonial">
              ←
            </button>
            <button
              type="button"
              className="testimonials__arrow testimonials__arrow--next"
              onClick={goNext}
              aria-label="Next testimonial"
              style={{ "--progress": `${progress}%` }}
            >
              →
            </button>
          </div>
        </div>

        <blockquote className="testimonials__quote">
          {item.quote.split(" ").map((word, index) => (
            <span key={`${word}-${index}`} className="testimonials__word">
              <span className="testimonials__word-inner">{word} </span>
            </span>
          ))}
        </blockquote>

        <footer className="testimonials__author">
          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className="testimonials__author-photo"
          />
          <div>
            <cite className="testimonials__author-name">{item.name}</cite>
            <p className="testimonials__author-company">{item.company}</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
