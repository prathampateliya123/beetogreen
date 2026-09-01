import Image from "next/image";
import SwooshButton from "@/components/ui/SwooshButton";

export default function CtaSplitSection({ data }) {
  const textLeft = data.textPosition === "left";

  return (
    <section className="section-cta-split">
      <div className="section-cta-split__inner">
        <div
          className={`section-cta-split__card section-cta-split__card--text-${data.textPosition} ${data.overflow ? "section-cta-split__card--overflow" : ""}`}
          style={{ backgroundColor: data.bgColor, color: data.textColor }}
        >
          <div className="section-cta-split__content">
            {data.label && <p className="section-cta-split__label">{data.label}</p>}
            <h2 className="section-cta-split__title">{data.title}</h2>
            {data.subtitle && <p className="section-cta-split__subtitle">{data.subtitle}</p>}
            {data.cta && (
              <div className="section-cta-split__cta">
                <SwooshButton
                  href={data.cta.href}
                  variant="white"
                  size="lg"
                  className="section-cta-split__cta-link"
                >
                  {data.cta.label}
                </SwooshButton>
              </div>
            )}
          </div>

          {data.image && (
            <div className="section-cta-split__visual">
              <Image
                src={data.image}
                alt=""
                width={600}
                height={500}
                className="section-cta-split__image"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
