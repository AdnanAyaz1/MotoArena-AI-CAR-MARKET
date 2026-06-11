import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  withPadding?: boolean;
}

export const SectionContainer = ({
  children,
  className,
  withPadding = true,
}: SectionContainerProps) => {
  return (
    <section
      className={cn(
        "relative z-20",
        withPadding && "py-[64px] md:py-[128px] px-5 md:px-16",
        "max-w-[1440px] mx-auto",
        className
      )}
    >
      {children}
    </section>
  );
};
