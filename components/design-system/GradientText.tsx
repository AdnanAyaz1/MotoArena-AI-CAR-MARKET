import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
}

export const GradientText = ({
  children,
  className,
  as: Component = "span",
}: GradientTextProps) => {
  return (
    <Component className={cn("gradient-text", className)}>
      {children}
    </Component>
  );
};
