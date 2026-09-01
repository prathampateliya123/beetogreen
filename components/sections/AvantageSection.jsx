"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AnimatedWords from "@/components/ui/AnimatedWords";
import SwooshButton from "@/components/ui/SwooshButton";
import { avantages } from "@/data/home";

export default function AvantageSection() {
  const [tab, setTab] = useState("companies");
  const pillRef = useRef(null);
  const btnRefs = useRef([]);
  const cards = avantages[tab];

  useEffect(() => {
    const activeBtn = btnRefs.current[tab === "companies" ? 0 : 1];
    const pill = pillRef.current;
    if (!activeBtn || !pill) return;
    pill.style.width = `${activeBtn.offsetWidth}px`;
    pill.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
  }, [tab]);

  return (
    <section className="avantage">
      <div className="avantage__container">
        <AnimatedWords as="h2" className="avantage__title" text={avantages.title} />

        <div className="avantage__toggle">
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
          <div className="avantage__cards-grid">
            {cards.map((card) => (
              <article
                key={card.title}
                className="avantage-card ui-card"
                style={{
                  "--card-bg": card.bgColor,
                  "--card-color": card.textColor,
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
                  <Link href={card.cta.href} className="avantage-card__cta-link">
                    <span className="avantage-card__cta-underline">{card.cta.label}</span>
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
