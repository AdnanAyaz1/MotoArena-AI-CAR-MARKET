import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PillButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
}

export const PillButton = ({
  children,
  className,
  variant = "primary",
  size = "md",
  as: Component = "button",
  href,
  onClick,
}: PillButtonProps) => {
  const sizeClasses = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-2.5 text-base",
    lg: "px-10 py-4 text-base",
  };

  const variantClasses = {
    primary:
      "gradient-bg text-on-primary-fixed font-bold hover:brightness-110 shadow-lg shadow-primary/20",
    ghost:
      "bg-white/5 border border-white/10 backdrop-blur-md text-on-surface hover:bg-white/10 font-semibold",
    secondary:
      "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 font-semibold",
  };

  const props =
    Component === "a" ? { href } : { onClick, type: "button" as const };

  return (
    <Component
      className={cn(
        "rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
