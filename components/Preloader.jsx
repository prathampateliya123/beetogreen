"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import BLogo from "@/components/ui/BLogo";

export default function Preloader() {
  const { setIsPreloaderDone } = useApp();
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 1200);
    const doneTimer = setTimeout(() => {
      setHidden(true);
      setIsPreloaderDone(true);
    }, 2200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [setIsPreloaderDone]);

  if (hidden) return null;

  return (
    <div className={`preloader ${exiting ? "preloader--exit" : ""}`}>
      <BLogo className="preloader__logo" color="#E6FF55" />
    </div>
  );
}
