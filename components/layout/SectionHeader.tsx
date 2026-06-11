import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: string;
  chip?: ReactNode;
  className?: string;
  align?: "left" | "center";
  gradientLine?: boolean;
}

export const SectionHeader = ({
  title,
  subtitle,
  chip,
  className,
  align = "left",
  gradientLine = true,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {chip && <div className="mb-4">{chip}</div>}
      <div className={cn("mb-4", align === "center" && "flex justify-center")}>
        {title}
      </div>
      {gradientLine && (
        <div
          className={cn(
            "h-1 w-32 gradient-bg rounded-full",
            align === "center" && "mx-auto"
          )}
        />
      )}
      {subtitle && (
        <p className="mt-6 text-on-surface-variant text-lg max-w-2xl leading-relaxed opacity-80 font-[family-name:var(--font-inter)]">
          {subtitle}
        </p>
      )}
    </div>
  );
};
