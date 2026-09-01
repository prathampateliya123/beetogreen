"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variantClasses = {
  primary: "button--primary",
  secondary: "button--secondary",
  white: "button--white",
  transparent: "button--transparent",
  tertiary: "button--tertiary",
};

const sizeClasses = {
  sm: "button--sm",
  md: "button--md",
  lg: "button--lg",
};

export default function SwooshButton({
  children,
  href,
  variant = "primary",
  size = "md",
  swoosh = true,
  className,
  onClick,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !swoosh) return;
    const layers = ref.current.querySelectorAll(".button__bg-inner");
    layers.forEach((layer, index) => {
      layer.style.setProperty("--index", index);
    });
  }, [swoosh]);

  const classes = cn(
    "button",
    variantClasses[variant],
    sizeClasses[size],
    swoosh && "button--swoosh",
    className
  );

  const content = (
    <>
      {swoosh && (
        <span className="button__bg">
          <span className="button__bg-inner button__bg-inner--first" />
          <span className="button__bg-inner button__bg-inner--second" />
        </span>
      )}
      <span className="button__inner" data-text={children}>
        <span className="button__text">{children}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} ref={ref} onClick={onClick} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} ref={ref} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
