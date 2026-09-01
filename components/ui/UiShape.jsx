"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";

const SHAPES = {
  BottomRound: {
    viewBox: "0 0 513 844",
    path: "M258.551 810.297C160.902 775.244 2.92102 629.589 41.9453 526.982C95.2509 386.826 507.783 454.856 474.659 585.261C441.51 715.769 110.654 526.455 155.854 349.429C176.132 270.013 263.725 241.415 332.051 239.977C335.186 239.911 336.319 234.68 333.511 233.285C269.405 201.437 198.84 121.824 207.619 2.64586",
    strokeWidth: 71.6908,
  },
  E: {
    viewBox: "0 0 675 836",
    path: "M246.015 68.4349C367.203 21.1453 536.354 29.1159 607.869 151.373C680.9 276.224 577.366 397.982 493.669 443.777C362.875 515.346 264.126 486.897 214.604 428.725C163.389 368.564 220.064 324.507 256.726 317.41C405.088 288.682 518.9 453.435 528.394 531C563.21 815.475 123.758 921.644 40.3941 582.911",
    strokeWidth: 83.2,
  },
  TopRound: {
    viewBox: "0 0 546 856",
    path: "M270.425 38.4964C372.561 73.8224 537.802 220.611 496.984 324.015C441.229 465.261 9.73912 396.702 44.3848 265.283C79.0577 133.76 425.118 324.547 377.84 502.949C356.856 582.133 266.953 611.185 195.833 613.198C192.14 613.303 190.85 619.406 194.16 621.038C260.632 653.804 332.782 733.603 323.697 852.43",
    strokeWidth: 83.2,
  },
  ReverseB: {
    viewBox: "0 0 598 759",
    path: "M162.768 324.438C206.385 300.028 252.744 286.83 283.36 282.477C370.612 270.071 438.104 303.27 450.126 326.389C472.905 361.692 397.822 421.848 283.36 407.801C168.898 393.754 122.832 284.614 159.7 185.288C189.919 103.877 302.488 34.5676 562.12 48.0663M159.7 185.288C141.867 233.333 143.438 283.674 162.768 324.438M588.906 686.286C501.589 702.315 151.264 769.586 65.8445 590.015C10.7674 453.123 82.0784 369.595 162.768 324.438M283.36 407.801C224.264 400.549 183.4 367.949 162.768 324.438",
    strokeWidth: 92.8013,
    fill: "none",
  },
};

const CARD_SHAPES = ["BottomRound", "E", "TopRound", "ReverseB"];

function preparePaths(container) {
  const paths = container.querySelectorAll("path");
  paths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.transition = "none";
  });
}

function drawPaths(container, duration = 1.5, delay = 0.1) {
  const paths = container.querySelectorAll("path");
  paths.forEach((path) => {
    path.style.transition = `stroke-dashoffset ${duration}s cubic-bezier(0.65, 0, 0.35, 1) ${delay}s`;
    path.style.strokeDashoffset = "0";
  });
}

export default function UiShape({
  shape,
  className = "",
  duration = 1.5,
  delay = 0.1,
  threshold = 0.5,
}) {
  const wrapperRef = useRef(null);
  const drawnRef = useRef(false);
  const { isPreloaderDone, isPreloaderTransition } = useApp();
  const config = SHAPES[shape];

  const canAnimate = isPreloaderDone && !isPreloaderTransition;

  useEffect(() => {
    if (!wrapperRef.current || !config) return;
    preparePaths(wrapperRef.current);
  }, [config]);

  useEffect(() => {
    if (!wrapperRef.current || !config || !canAnimate) return;

    const node = wrapperRef.current;

    const runDraw = () => {
      if (drawnRef.current) return;
      drawnRef.current = true;
      preparePaths(node);
      node.getBoundingClientRect();
      drawPaths(node, duration, delay);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runDraw();
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);

    const rect = node.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
    if (inView) {
      requestAnimationFrame(runDraw);
    }

    return () => observer.disconnect();
  }, [canAnimate, config, duration, delay, threshold]);

  if (!config) return null;

  return (
    <div
      ref={wrapperRef}
      className={`ui-shape ${className}`.trim()}
      style={{
        top: "50%",
        left: "50%",
        width: "60rem",
        transform: "translate(-50%, -50%)",
        opacity: 0.15,
      }}
      aria-hidden="true"
    >
      <svg viewBox={config.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d={config.path}
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          strokeLinejoin={config.strokeLinejoin || "bevel"}
          fill={config.fill || "none"}
        />
      </svg>
    </div>
  );
}

export function getStatsShape(index) {
  return CARD_SHAPES[index % CARD_SHAPES.length];
}
