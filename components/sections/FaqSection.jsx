"use client";

import { useState } from "react";
import { faqItems } from "@/data/home";

function splitAnswerWords(text) {
  let delayIndex = 0;
  return text.split(/\s+/).filter(Boolean).map((word) => ({
    text: word,
    delayIndex: delayIndex++,
  }));
}

function FaqIcon() {
  return (
    <span className="faq__icon" aria-hidden="true">
      <span className="faq__icon-line faq__icon-line--horizontal" />
      <span className="faq__icon-line faq__icon-line--vertical" />
    </span>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section className="faq">
      <div className="faq__inner">
        <div className="faq__container">
          <div className="faq__left">
            <h2 className="faq__title">Frequently asked questions</h2>
          </div>

          <ul className="faq__list">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const words = splitAnswerWords(item.answer);

              return (
                <li
                  key={item.question}
                  className={`faq__item ${isOpen ? "faq__item--open" : ""}`.trim()}
                >
                  <button
                    type="button"
                    className="faq__question"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => toggleItem(index)}
                  >
                    <p className="faq__question-text">{item.question}</p>
                    <FaqIcon />
                  </button>

                  <div id={`faq-answer-${index}`} className="faq__answer-wrap">
                    <div className="faq__answer-inner">
                      <p className="faq__answer">
                        {words.map((word, wordIndex) => (
                          <span key={`${index}-${wordIndex}`} className="faq__word">
                            <span
                              className="faq__word-inner"
                              style={{ "--delay": `${word.delayIndex * 0.005}s` }}
                            >
                              {word.text}
                              {wordIndex < words.length - 1 ? "\u00a0" : ""}
                            </span>
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
