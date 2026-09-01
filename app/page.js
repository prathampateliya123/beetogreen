import HeroSection from "@/components/sections/HeroSection";
import IntroLogosSection from "@/components/sections/IntroLogosSection";
import ActivezSection from "@/components/sections/ActivezSection";
import ProcessSection from "@/components/sections/ProcessSection";
import AvantageSection from "@/components/sections/AvantageSection";
import StatsSection from "@/components/sections/StatsSection";
import CtaSplitSection from "@/components/sections/CtaSplitSection";
import LogosMarquee from "@/components/sections/LogosMarquee";
import Co2SimulatorSection from "@/components/sections/Co2SimulatorSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import { ctaSplits } from "@/data/home";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroLogosSection />
      <ActivezSection />
      <ProcessSection />
      <AvantageSection />
      <StatsSection />
      <CtaSplitSection data={ctaSplits[0]} />
      <LogosMarquee />
      <Co2SimulatorSection />
      <CtaSplitSection data={ctaSplits[1]} />
      <TestimonialsSection />
      <CtaSplitSection data={ctaSplits[2]} />
      <FaqSection />
    </>
  );
}
