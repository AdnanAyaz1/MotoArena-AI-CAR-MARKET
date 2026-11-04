"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, RotateCcw, ChevronDown, Loader2 } from "lucide-react";
import { useState, useEffect, useRef, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import CompanyFilter from "./FilterComponents/CompanyFilter";
import BodyTypeFilter from "./FilterComponents/BodyTypeFilter";
import FuelTypeFilter from "./FilterComponents/FuelTypeFilter";
import TransmissionFilter from "./FilterComponents/TransmissionFilter";
import PriceRangeFilters from "./FilterComponents/PriceRangeFilters";

export interface CarFiltersProps {
  company: string[];
  bodyTypes: string[];
  fuelTypes: string[];
  transmissions: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

const CarFilters = ({ filters }: { filters: CarFiltersProps }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "oldest");
  const [sortByOpen, setSortByOpen] = useState(false);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice")) || filters.priceRange.min,
    Number(searchParams.get("maxPrice")) || filters.priceRange.max,
  ]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(searchParams.get("company"));
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(searchParams.get("bodyType"));
  const [selectedFuelType, setSelectedFuelType] = useState<string | null>(searchParams.get("fuelType"));
  const [selectedTransmission, setSelectedTransmission] = useState<string | null>(searchParams.get("transmission"));

  // Keep state synchronized with URL for browser back/forward navigation
  useEffect(() => {
    setSortBy(searchParams.get("sort") || "oldest");
    setSelectedCompany(searchParams.get("company"));
    setSelectedBodyType(searchParams.get("bodyType"));
    setSelectedFuelType(searchParams.get("fuelType"));
    setSelectedTransmission(searchParams.get("transmission"));
    setPriceRange([
      Number(searchParams.get("minPrice")) || filters.priceRange.min,
      Number(searchParams.get("maxPrice")) || filters.priceRange.max,
    ]);
  }, [searchParams, filters.priceRange.min, filters.priceRange.max]);

  const applyParams = (updater: (params: URLSearchParams) => void) => {
    const currentParams = new URLSearchParams(window.location.search);
    updater(currentParams);
    currentParams.delete("page");

    const query = currentParams.toString();
    const newUrl = query ? `?${query}` : window.location.pathname;

    // 1. Instant 0ms browser URL bar update
    window.history.replaceState(null, "", newUrl);

    // 2. Non-blocking background transition for Next.js Server Component fetch
    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  };

  const handleCompanyFilter = (value: string) => {
    const nextVal = selectedCompany === value || value === "" ? null : value;
    setSelectedCompany(nextVal);
    applyParams((p) => {
      if (nextVal) p.set("company", nextVal);
      else p.delete("company");
    });
  };

  const handleBodyTypeFilter = (value: string) => {
    const nextVal = selectedBodyType === value || value === "" ? null : value;
    setSelectedBodyType(nextVal);
    applyParams((p) => {
      if (nextVal) p.set("bodyType", nextVal);
      else p.delete("bodyType");
    });
  };

  const handleFuelTypeFilter = (value: string) => {
    const nextVal = selectedFuelType === value || value === "" ? null : value;
    setSelectedFuelType(nextVal);
    applyParams((p) => {
      if (nextVal) p.set("fuelType", nextVal);
      else p.delete("fuelType");
    });
  };

  const handleTransmissionFilter = (value: string) => {
    const nextVal = selectedTransmission === value || value === "" ? null : value;
    setSelectedTransmission(nextVal);
    applyParams((p) => {
      if (nextVal) p.set("transmission", nextVal);
      else p.delete("transmission");
    });
  };

  const handlePriceFilter = (value: [number, number]) => {
    setPriceRange(value);
    applyParams((p) => {
      p.set("minPrice", value[0].toString());
      p.set("maxPrice", value[1].toString());
    });
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setSortByOpen(false);
    applyParams((p) => {
      p.set("sort", value);
    });
  };

  const clearFilters = () => {
    setPriceRange([filters.priceRange.min, filters.priceRange.max]);
    setSelectedCompany(null);
    setSelectedBodyType(null);
    setSelectedFuelType(null);
    setSelectedTransmission(null);
    setSortBy("oldest");

    const currentParams = new URLSearchParams(window.location.search);
    const currentSearch = currentParams.get("search");
    currentParams.delete("company");
    currentParams.delete("bodyType");
    currentParams.delete("fuelType");
    currentParams.delete("transmission");
    currentParams.delete("minPrice");
    currentParams.delete("maxPrice");
    currentParams.delete("sort");
    currentParams.delete("page");

    if (currentSearch) {
      currentParams.set("search", currentSearch);
    }

    const query = currentParams.toString();
    const newUrl = query ? `?${query}` : window.location.pathname;

    window.history.replaceState(null, "", newUrl);

    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  };

  const sortOptions = [
    { value: "oldest", label: "Oldest First" },
    { value: "newest", label: "Newest First" },
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
  ];

  const sortOptionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortOptionsRef.current && !sortOptionsRef.current.contains(event.target as Node)) {
        setSortByOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const activeFilterCount = [
    selectedCompany,
    selectedBodyType,
    selectedFuelType,
    selectedTransmission,
  ].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-1">
      <PriceRangeFilters
        filters={{ priceRange: { min: filters.priceRange.min, max: filters.priceRange.max } }}
        priceRange={priceRange}
        handlePriceFilter={handlePriceFilter}
      />
      <CompanyFilter
        companies={filters.company}
        selectedCompany={selectedCompany}
        onCompanyChange={handleCompanyFilter}
      />
      <BodyTypeFilter
        bodyTypes={filters.bodyTypes}
        selectedBodyType={selectedBodyType}
        onBodyTypeChange={handleBodyTypeFilter}
      />
      <FuelTypeFilter
        fuelTypes={filters.fuelTypes}
        selectedFuelType={selectedFuelType}
        onFuelTypeChange={handleFuelTypeFilter}
      />
      <TransmissionFilter
        transmissions={filters.transmissions}
        selectedTransmission={selectedTransmission}
        onTransmissionChange={handleTransmissionFilter}
      />
    </div>
  );

  return (
    <div className="flex lg:flex-col justify-between gap-4">
      {/* Mobile Filters */}
      <div className="lg:hidden mb-4">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-on-surface font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full gradient-bg text-black text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
              {isPending && <Loader2 className="w-3.5 h-3.5 text-primary animate-spin ml-1" />}
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto bg-[#0e1417] border-white/[0.06]">
            <SheetHeader>
              <SheetTitle className="text-on-surface font-[family-name:var(--font-sora)] text-lg flex items-center justify-between">
                <span>Filters</span>
                {isPending && (
                  <span className="flex items-center gap-1.5 text-xs text-primary font-[family-name:var(--font-jetbrains-mono)]">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Updating
                  </span>
                )}
              </SheetTitle>
            </SheetHeader>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Sort By - Desktop */}
      <div className="relative min-w-[180px] lg:w-full" ref={sortOptionsRef}>
        <button
          onClick={() => setSortByOpen(!sortByOpen)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.10] transition-all duration-300"
        >
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant uppercase tracking-wider">
            {sortBy ? sortOptions.find(o => o.value === sortBy)?.label : "Sort By"}
          </span>
          <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform duration-200 ${sortByOpen ? "rotate-180" : ""}`} />
        </button>
        {sortByOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-50 top-full left-0 w-full mt-2 rounded-xl border border-white/[0.08] bg-[#1a2024] shadow-2xl overflow-hidden"
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortByChange(option.value)}
                className={`w-full px-4 py-3 text-left font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider transition-colors ${
                  sortBy === option.value
                    ? "text-primary bg-primary/10"
                    : "text-on-surface-variant hover:bg-white/[0.04] hover:text-on-surface"
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/[0.06] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <span className="font-[family-name:var(--font-sora)] text-sm font-bold text-on-surface">
                  Filters
                </span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full gradient-bg text-black text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
                {isPending && (
                  <span className="flex items-center gap-1 text-[11px] text-primary font-[family-name:var(--font-jetbrains-mono)] animate-pulse ml-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                  </span>
                )}
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-primary transition-colors font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wider"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            <FilterContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarFilters;
