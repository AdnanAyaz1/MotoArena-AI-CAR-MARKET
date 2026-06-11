"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface ClearSearchButtonsProps {
  search: string;
}

const ClearSearchButtons = ({ search }: ClearSearchButtonsProps) => {
  const router = useRouter();

  const handleClearSearch = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={handleClearSearch}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.10] bg-white/[0.03] text-on-surface font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300"
      >
        <X className="w-4 h-4" />
        Clear Search
      </button>
    </div>
  );
};

export default ClearSearchButtons;
