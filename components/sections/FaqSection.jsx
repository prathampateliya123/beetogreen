"use client";

import { useState } from "react";
import { faqItems } from "@/data/home";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq">
      <div className="faq__inner">
        <div className="faq__left">
          <h2 className="faq__title">Frequently asked questions</h2>
        </div>

        <div className="faq__right">
          <div className="faq__list">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.question} className="faq__item">
                  <button
                    type="button"
                    className="faq__question"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className="faq__question-text">{item.question}</span>
                    <span className="faq__icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq__answer" id={`faq-answer-${index}`}>
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
