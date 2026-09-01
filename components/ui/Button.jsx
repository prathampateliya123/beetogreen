import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-lime text-dark hover:bg-lime/90 border border-transparent",
  secondary:
    "bg-dark text-lime border border-lime hover:bg-dark/90",
  tertiary:
    "bg-transparent text-current border border-current hover:bg-white/10",
  ghost:
    "bg-white text-dark hover:bg-white/90 border border-transparent",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition-all duration-300",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
