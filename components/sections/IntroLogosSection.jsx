import Image from "next/image";
import { introLogos } from "@/data/home";

export default function IntroLogosSection() {
  return (
    <section className="intro-logos" style={{ backgroundColor: "#005236" }}>
      <div className="intro-logos__container">
        <ul className="intro-logos__list">
          {introLogos.map((logo) => (
            <li key={logo.src} className="intro-logos__item">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={60}
                className="intro-logos__logo"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
