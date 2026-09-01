import Marquee from "@/components/ui/Marquee";
import { brandLogos } from "@/data/home";

export default function LogosMarquee() {
  return (
    <section className="logos-marquee">
      <div className="logos-marquee__inner">
        <p className="logos-marquee__title">
          We partner with France&apos;s leading bike brands
        </p>
        <Marquee items={brandLogos} duration="16s" itemHeight="5rem" tint="native" />
      </div>
    </section>
  );
}
