"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";

function splitHtmlToWords(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
}

export default function AnimatedParagraph({
  text,
  html,
  as: Tag = "p",
  className,
  style,
  delay = 0.05,
}) {
  const ref = useRef(null);
  const { isPreloaderDone, isPreloaderTransition } = useApp();

  useEffect(() => {
    if (!ref.current || !isPreloaderDone || isPreloaderTransition) return;

    const words = ref.current.querySelectorAll(".animated-paragraph__word-inner");
    words.forEach((word, index) => {
      word.style.transitionDelay = `${delay + index * 0.04}s`;
      requestAnimationFrame(() => word.classList.add("is-visible"));
    });
  }, [isPreloaderDone, isPreloaderTransition, delay, text, html]);

  const content = html ? splitHtmlToWords(html) : (text || "").split(" ");

  return (
    <Tag ref={ref} className={className} style={style} data-animation="paragraph">
      {content.map((word, index) => (
        <span key={`${word}-${index}`} className="animated-paragraph__word">
          <span className="animated-paragraph__word-inner">{word}</span>
          {index < content.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
