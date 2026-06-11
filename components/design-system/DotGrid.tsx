import { cn } from "@/lib/utils";

interface DotGridProps {
  className?: string;
  fixed?: boolean;
}

export const DotGrid = ({ className, fixed = true }: DotGridProps) => {
  return (
    <div
      className={cn(
        fixed && "fixed inset-0",
        "dot-grid pointer-events-none z-10 opacity-50",
        className
      )}
    />
  );
};
