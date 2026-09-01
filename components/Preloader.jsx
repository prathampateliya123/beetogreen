"use client";

import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { useApp } from "@/context/AppContext";
import preloaderAnimation from "@/data/preloader-lottie.json";

const WIPE_TRIGGER_RATIO = 0.75;

export default function Preloader() {
  const { lenis, setIsPreloaderDone, setIsPreloaderTransition } = useApp();
  const containerRef = useRef(null);
  const lottieRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [lottieVisible, setLottieVisible] = useState(false);
  const exitedRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (lenis) lenis.stop();
    return () => {
      document.body.style.overflow = "";
    };
  }, [lenis]);

  const exitPreloader = () => {
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
  };

  const handleLoaded = () => {
    setLottieVisible(true);
    const anim = lottieRef.current;
    if (!anim) return;

    const totalFrames = anim.totalFrames;
    const triggerFrame = totalFrames * WIPE_TRIGGER_RATIO;

    const onEnterFrame = () => {
      if (anim.currentFrame >= triggerFrame) {
        anim.removeEventListener("enterFrame", onEnterFrame);
        exitPreloader();
      }
    };

    anim.addEventListener("enterFrame", onEnterFrame);
    anim.addEventListener("complete", exitPreloader);
  };

  if (!visible) return null;

  return (
    <div ref={containerRef} className="preloader">
      <div
        className="preloader__lottie"
        style={{ opacity: lottieVisible ? 1 : 0, transition: "opacity 0.6s ease" }}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={preloaderAnimation}
          loop={false}
          autoplay
          onDOMLoaded={handleLoaded}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
