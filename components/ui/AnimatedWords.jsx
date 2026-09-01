"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";

export default function AnimatedWords({
  text,
  as: Tag = "span",
  className,
  delay = 0,
}) {
  const ref = useRef(null);
  const { isPreloaderDone } = useApp();

  useEffect(() => {
    if (!ref.current || !isPreloaderDone) return;

    const words = ref.current.querySelectorAll(".word-inner");
    words.forEach((word, index) => {
      word.style.transitionDelay = `${delay + index * 0.04}s`;
      requestAnimationFrame(() => {
        word.classList.add("is-visible");
      });
    });
  }, [isPreloaderDone, delay, text]);

  const parts = text.split(" ");

  return (
    <Tag ref={ref} className={className} data-animation="title">
      {parts.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="word-inner">{word}</span>
          {index < parts.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
