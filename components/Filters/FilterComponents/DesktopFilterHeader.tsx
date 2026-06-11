import { Sliders, X } from "lucide-react";
import React from "react";

const DesktopFilterHeader = ({
  params,
  clearFilters,
}: {
  params: URLSearchParams;
  clearFilters: () => void;
}) => {
  return (
    <div className="p-4 border-b border-white/[0.06] flex justify-between items-center">
      <h3 className="font-[family-name:var(--font-sora)] text-sm font-bold text-on-surface flex items-center gap-2">
        <Sliders className="h-4 w-4 text-primary" />
        Filters
      </h3>
      {params.size > 0 && (
        <button
          className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-primary transition-colors font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wider"
          onClick={clearFilters}
        >
          <X className="h-3 w-3" />
          Clear All
        </button>
      )}
    </div>
  );
};

export default DesktopFilterHeader;
