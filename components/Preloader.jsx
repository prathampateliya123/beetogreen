"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Lottie } from "lottie-react";
import { gsap } from "gsap";
import { useApp } from "@/context/AppContext";
import preloaderAnimation from "@/data/preloader-lottie.json";

const WIPE_TRIGGER_RATIO = 0.75;
const TOTAL_FRAMES = preloaderAnimation.op - preloaderAnimation.ip;

export default function Preloader() {
  const { lenis, setIsPreloaderDone, setIsPreloaderTransition } = useApp();
  const containerRef = useRef(null);
  const exitedRef = useRef(false);
  const [visible, setVisible] = useState(true);
  const [lottieVisible, setLottieVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (lenis) lenis.stop();
    return () => {
      document.body.style.overflow = "";
    };
  }, [lenis]);

  const exitPreloader = useCallback(() => {
    if (!containerRef.current || exitedRef.current) return;
    exitedRef.current = true;

    gsap.to(containerRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 1.2,
      ease: "expo.inOut",
      onStart: () => {
        window.setTimeout(() => {
          setIsPreloaderTransition(false);
          if (lenis) lenis.start();
        }, 600);
      },
      onComplete: () => {
        setVisible(false);
        setIsPreloaderDone(true);
        document.body.style.overflow = "";
      },
    });
  }, [lenis, setIsPreloaderDone, setIsPreloaderTransition]);

  const triggerFrame = TOTAL_FRAMES * WIPE_TRIGGER_RATIO;

  const subscriptions = {
    ready: () => setLottieVisible(true),
    frame: ({ currentFrame }) => {
      if (currentFrame >= triggerFrame) exitPreloader();
    },
    complete: () => exitPreloader(),
  };

  if (!visible) return null;

  return (
    <div ref={containerRef} className="preloader">
      <div
        className="preloader__lottie"
        style={{ opacity: lottieVisible ? 1 : 0, transition: "opacity 0.6s ease" }}
      >
        <Lottie
          src={preloaderAnimation}
          loop={false}
          autoplay
          subscriptions={subscriptions}
          className="preloader__lottie-player"
        />
      </div>
    </div>
  );
}
