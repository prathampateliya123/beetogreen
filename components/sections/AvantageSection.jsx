"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import AnimatedParagraph from "@/components/ui/AnimatedParagraph";
import SwooshButton from "@/components/ui/SwooshButton";
import { avantages } from "@/data/home";

export default function AvantageSection() {
  const [tab, setTab] = useState("companies");
  const pillRef = useRef(null);
  const toggleRef = useRef(null);
  const btnRefs = useRef([]);
  const cards = avantages[tab];

  const updatePill = () => {
    const activeIndex = tab === "companies" ? 0 : 1;
    const activeBtn = btnRefs.current[activeIndex];
    const pill = pillRef.current;
    if (!activeBtn || !pill) return;
    pill.style.width = `${activeBtn.offsetWidth}px`;
    pill.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
  };

  useEffect(() => {
    updatePill();
    const observer = new ResizeObserver(updatePill);
    if (toggleRef.current) observer.observe(toggleRef.current);
    return () => observer.disconnect();
  }, [tab]);

  return (
    <section className="avantage">
      <div className="avantage__container">
        <AnimatedParagraph as="h2" className="avantage__title" text={avantages.title} />

        <div className="avantage__toggle" ref={toggleRef}>
          <span className="avantage__toggle-pill" ref={pillRef} />
          {[
            { id: "companies", label: "Companies" },
            { id: "employees", label: "Employees" },
          ].map((item, index) => (
            <button
              key={item.id}
              type="button"
              ref={(el) => {
                btnRefs.current[index] = el;
              }}
              className={`avantage__toggle-btn ${tab === item.id ? "avantage__toggle-btn--active" : ""}`}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="avantage__cards">
          <div className="avantage__cards-grid" key={tab}>
            {cards.map((card) => (
              <article
                key={card.title}
                className="avantage-card ui-card"
                style={{
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                }}
              >
                <h3 className="avantage-card__title">{card.title}</h3>
                <div className="avantage-card__content">
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                {card.cta && (
                  <SwooshButton
                    href={card.cta.href}
                    variant={card.bgColor === "#e6ff55" ? "primary" : "white"}
                    size="md"
                    className="avantage-card__cta-link"
                  >
                    {card.cta.label}
                  </SwooshButton>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
