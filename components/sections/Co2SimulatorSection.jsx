"use client";

import { useMemo, useState } from "react";
import SwooshButton from "@/components/ui/SwooshButton";
import { calculateCo2, formatNumber } from "@/lib/co2";
import { simulator } from "@/data/home";

function IconCar() {
  return <span className="simulator-co2__equiv-icon" aria-hidden="true">🚗</span>;
}
function IconPlane() {
  return <span className="simulator-co2__equiv-icon" aria-hidden="true">✈️</span>;
}
function IconHeat() {
  return <span className="simulator-co2__equiv-icon" aria-hidden="true">🔥</span>;
}

export default function Co2SimulatorSection() {
  const [employees, setEmployees] = useState(200);
  const [bikeRatio, setBikeRatio] = useState(20);
  const [remoteRatio, setRemoteRatio] = useState(80);

  const result = useMemo(
    () => calculateCo2(employees, bikeRatio, remoteRatio),
    [employees, bikeRatio, remoteRatio]
  );

  return (
    <section id="simulator" className="simulator-co2">
      <div className="simulator-co2__inner">
        <header className="simulator-co2__header">
          <h2 className="simulator-co2__title">{simulator.title}</h2>
          <p className="simulator-co2__subtitle">{simulator.subtitle}</p>
        </header>

        <div className="simulator-co2__card">
          <div className="simulator-co2__grid">
            <div className="simulator-co2__inputs">
              <div className="simulator-co2__field">
                <label htmlFor="simulator-co2-nb-salaries" className="simulator-co2__field-label">
                  {simulator.nbSalariesLabel}
                </label>
                <div className="simulator-co2__slider-row">
                  <input
                    id="simulator-co2-nb-salaries"
                    type="range"
                    min="1"
                    max="5000"
                    step="1"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="simulator-co2__slider"
                  />
                  <span className="simulator-co2__slider-value">
                    {employees.toLocaleString("fr-FR")}
                  </span>
                </div>
              </div>

              <div className="simulator-co2__field">
                <label htmlFor="simulator-co2-ratio-velo" className="simulator-co2__field-label">
                  {simulator.ratioVeloLabel}
                </label>
                <div className="simulator-co2__slider-row">
                  <input
                    id="simulator-co2-ratio-velo"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={bikeRatio}
                    onChange={(e) => setBikeRatio(Number(e.target.value))}
                    className="simulator-co2__slider"
                  />
                  <span className="simulator-co2__slider-value">{bikeRatio} %</span>
                </div>
              </div>

              <div className="simulator-co2__field">
                <label htmlFor="simulator-co2-ratio-teletravail" className="simulator-co2__field-label">
                  {simulator.ratioTeletravailLabel}
                </label>
                <div className="simulator-co2__slider-row">
                  <input
                    id="simulator-co2-ratio-teletravail"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={remoteRatio}
                    onChange={(e) => setRemoteRatio(Number(e.target.value))}
                    className="simulator-co2__slider"
                  />
                  <span className="simulator-co2__slider-value">{remoteRatio} %</span>
                </div>
              </div>
            </div>

            <div className="simulator-co2__result-wrap">
              <div className="simulator-co2__result">
                <p className="simulator-co2__result-value">
                  {formatNumber(result.totalKg)}{" "}
                  <span className="simulator-co2__result-unit">Kg/an</span>
                </p>
                <p className="simulator-co2__result-label">{simulator.resultLabel}</p>
              </div>
            </div>
          </div>

          <div className="simulator-co2__equiv">
            <p className="simulator-co2__equiv-title">{simulator.equivTitle}</p>
            <div className="simulator-co2__equiv-grid">
              <div className="simulator-co2__equiv-card">
                <IconCar />
                <p className="simulator-co2__equiv-value">{formatNumber(result.carKm)}</p>
                <p className="simulator-co2__equiv-label">{simulator.equivVoitureLabel}</p>
              </div>
              <div className="simulator-co2__equiv-card">
                <IconPlane />
                <p className="simulator-co2__equiv-value">{formatNumber(result.planeKm)}</p>
                <p className="simulator-co2__equiv-label">{simulator.equivAvionLabel}</p>
              </div>
              <div className="simulator-co2__equiv-card">
                <IconHeat />
                <p className="simulator-co2__equiv-value">{formatNumber(result.heatingDays)}</p>
                <p className="simulator-co2__equiv-label">{simulator.equivChauffageLabel}</p>
              </div>
            </div>
          </div>

          <div className="simulator-co2__cta">
            <p className="simulator-co2__cta-intro">{simulator.ctaIntro}</p>
            <SwooshButton href={simulator.cta.href} variant="primary" size="lg">
              {simulator.cta.label}
            </SwooshButton>
          </div>
        </div>
      </div>
    </section>
  );
}
