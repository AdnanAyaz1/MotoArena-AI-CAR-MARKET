import { cn } from "@/lib/utils";

interface SpecItem {
  value: string;
  label: string;
}

interface SpecHUDProps {
  specs: SpecItem[];
  className?: string;
  layout?: "horizontal" | "vertical";
}

export const SpecHUD = ({
  specs,
  className,
  layout = "horizontal",
}: SpecHUDProps) => {
  return (
    <div
      className={cn(
        layout === "horizontal"
          ? "grid grid-cols-3 gap-4"
          : "flex flex-col gap-3",
        className
      )}
    >
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="glass-card p-4 rounded-lg text-center"
        >
          <div className="font-[family-name:var(--font-sora)] text-lg font-bold text-primary">
            {spec.value}
          </div>
          <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-on-surface-variant uppercase mt-1 tracking-widest">
            {spec.label}
          </div>
        </div>
      ))}
    </div>
  );
};
