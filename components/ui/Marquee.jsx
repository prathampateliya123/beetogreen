"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Marquee({
  items,
  duration = "16s",
  gap = "8rem",
  itemHeight = "5rem",
  blur = true,
  tint = "native",
  className,
}) {
  const trackRef = useRef(null);
  const doubled = [...items, ...items];

  return (
    <div
      className={cn("marquee", blur && "marquee--blur", tint && `marquee--tint-${tint}`, className)}
      style={{
        "--marquee-duration": duration,
        "--marquee-gap": gap,
        "--marquee-item-height": itemHeight,
        "--marquee-direction": "normal",
      }}
    >
      <div className="marquee__track">
        <ul className="marquee__list mq" ref={trackRef}>
          {doubled.map((item, index) => (
            <li key={`${item.src}-${index}`} className="marquee__item">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width || 200}
                height={item.height || 80}
                className="marquee__logo"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
