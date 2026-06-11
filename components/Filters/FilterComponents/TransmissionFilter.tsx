"use client";

import { Check, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface TransmissionFilterProps {
  transmissions: string[];
  selectedTransmission: string | null;
  onTransmissionChange: (value: string) => void;
}

const TransmissionFilter = ({
  transmissions,
  selectedTransmission,
  onTransmissionChange,
}: TransmissionFilterProps) => {
  const searchParams = useSearchParams();

  return (
    <div className="space-y-3 p-4 border-b border-white/[0.06]">
      <h4 className="text-xs font-bold font-[family-name:var(--font-jetbrains-mono)] text-on-surface-variant uppercase tracking-wider flex justify-between">
        <span>Transmission</span>
        {searchParams.get("transmission") && (
          <button
            className="text-primary flex items-center cursor-pointer hover:text-secondary transition-colors"
            onClick={() => onTransmissionChange("")}
          >
            <X className="mr-1 h-3 w-3" />
            Clear
          </button>
        )}
      </h4>
      <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
        {transmissions.map((transmission) => (
          <button
            key={transmission}
            onClick={() => onTransmissionChange(transmission)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              selectedTransmission === transmission
                ? "gradient-bg text-black"
                : "bg-white/[0.04] text-on-surface-variant hover:bg-white/[0.08] hover:text-on-surface border border-white/[0.06]"
            )}
          >
            {transmission}
            {selectedTransmission === transmission && (
              <Check className="h-3 w-3 inline" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransmissionFilter;
