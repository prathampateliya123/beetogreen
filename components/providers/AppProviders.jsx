"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppProvider, useApp } from "@/context/AppContext";
import Preloader from "@/components/Preloader";

gsap.registerPlugin(ScrollTrigger);

function SmoothScroll({ children }) {
  const { setLenis } = useApp();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, [setLenis]);

  return children;
}

export default function AppProviders({ children }) {
  return (
    <AppProvider>
      <Preloader />
      <SmoothScroll>{children}</SmoothScroll>
    </AppProvider>
  );
}
