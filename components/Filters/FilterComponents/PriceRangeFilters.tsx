import React from "react";

import { Slider } from "../../ui/slider";

const PriceRangeFilters = ({
  filters,
  priceRange,
  handlePriceFilter,
}: {
  filters: {
    priceRange: {
      min: number;
      max: number;
    };
  };
  priceRange: [number, number];
  handlePriceFilter: (val: [number, number]) => void;
}) => {
  return (
    <div className="space-y-4 p-4 border-b border-white/[0.06]">
      <h3 className="text-xs font-bold font-[family-name:var(--font-jetbrains-mono)] text-on-surface-variant uppercase tracking-wider">
        Price Range
      </h3>
      <div className="px-2">
        <Slider
          min={filters.priceRange.min}
          max={filters.priceRange.max}
          step={100}
          value={priceRange}
          onValueChange={(val) => handlePriceFilter(val as [number, number])}
        />
      </div>
      <div className="flex items-center justify-between text-xs font-medium text-on-surface">
        <div className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06] font-[family-name:var(--font-jetbrains-mono)]">
          $ {priceRange[0]}
        </div>
        <div className="text-on-surface-variant">to</div>
        <div className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06] font-[family-name:var(--font-jetbrains-mono)]">
          $ {priceRange[1]}
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilters;
