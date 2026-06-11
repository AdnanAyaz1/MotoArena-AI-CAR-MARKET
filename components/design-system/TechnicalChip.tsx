import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TechnicalChipProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary";
}

export const TechnicalChip = ({
  children,
  className,
  variant = "default",
}: TechnicalChipProps) => {
  const variantClasses = {
    default: "border-primary/20 bg-primary/5 text-primary",
    primary: "border-primary/30 bg-primary/10 text-primary",
    secondary: "border-secondary/30 bg-secondary/10 text-secondary",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md",
        "font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.2em] uppercase",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
