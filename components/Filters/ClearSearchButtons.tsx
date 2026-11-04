"use client";

import { X, Loader2 } from "lucide-react";
import { useFilterContext } from "./FilterContext";

interface ClearSearchButtonsProps {
  search: string;
}

const ClearSearchButtons = ({ search }: ClearSearchButtonsProps) => {
  const { applyFilter, isPending } = useFilterContext();

  const handleClearSearch = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    params.delete("page");
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    applyFilter(newUrl);
  };

  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={handleClearSearch}
        disabled={isPending}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.10] bg-white/[0.03] text-on-surface font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 disabled:opacity-50"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 text-primary animate-spin" />
        ) : (
          <X className="w-4 h-4" />
        )}
        {isPending ? "Clearing..." : "Clear Search"}
      </button>
    </div>
  );
};

export default ClearSearchButtons;
