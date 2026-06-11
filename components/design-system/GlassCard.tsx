import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "li";
}

export const GlassCard = ({
  children,
  className,
  hover = false,
  as: Component = "div",
}: GlassCardProps) => {
  return (
    <Component
      className={cn(
        "glass-card rounded-xl",
        hover && "transition-all duration-500 hover:border-primary/30 group",
        className
      )}
    >
      {children}
    </Component>
  );
};
