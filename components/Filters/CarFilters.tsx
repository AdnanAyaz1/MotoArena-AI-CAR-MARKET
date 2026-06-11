"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, RotateCcw, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
  const params = new URLSearchParams(searchParams.toString());
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortByOpen, setSortByOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.priceRange.min,
    filters.priceRange.max,
  ]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  const [selectedFuelType, setSelectedFuelType] = useState<string | null>(null);
  const [selectedTransmission, setSelectedTransmission] = useState<string | null>(null);

  const clearFilters = () => {
    setPriceRange([filters.priceRange.min, filters.priceRange.max]);
    setSelectedCompany(null);
    setSelectedBodyType(null);
    setSelectedFuelType(null);
    setSelectedTransmission(null);
    setSortBy("oldest");

    const currentSearch = searchParams.get("search");
    params.delete("company");
    params.delete("bodyType");
    params.delete("fuelType");
    params.delete("transmission");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("sort");
    params.delete("page");

    if (currentSearch) {
      params.set("search", currentSearch);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const sortValue = searchParams.get("sort");
    if (sortValue) setSortBy(sortValue);
    else setSortBy("oldest");
    const companyParam = searchParams.get("company");
    const bodyTypeParam = searchParams.get("bodyType");
    const fuelTypeParam = searchParams.get("fuelType");
    const transmissionParam = searchParams.get("transmission");

    if (companyParam) setSelectedCompany(companyParam);
    if (bodyTypeParam) setSelectedBodyType(bodyTypeParam);
    if (fuelTypeParam) setSelectedFuelType(fuelTypeParam);
    if (transmissionParam) setSelectedTransmission(transmissionParam);
  }, [searchParams]);

  const handleFilter = (type: string, value: string) => {
    if (value === "") {
      params.delete(type);
    } else if (params.get(type) !== value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    router.push(`?${params.toString()}`);
  };

  const handleCompanyFilter = (value: string) => {
    handleFilter("company", value);
    setSelectedCompany(selectedCompany === value ? null : value);
  };

  const handleBodyTypeFilter = (value: string) => {
    handleFilter("bodyType", value);
    setSelectedBodyType(selectedBodyType === value ? null : value);
  };

  const handleFuelTypeFilter = (value: string) => {
    handleFilter("fuelType", value);
    setSelectedFuelType(selectedFuelType === value ? null : value);
  };

  const handleTransmissionFilter = (value: string) => {
    handleFilter("transmission", value);
    setSelectedTransmission(selectedTransmission === value ? null : value);
  };

  const handlePriceFilter = (value: [number, number]) => {
    setPriceRange(value);
    params.set("minPrice", value[0].toString());
    params.set("maxPrice", value[1].toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const sortOptions = [
    { value: "oldest", label: "Oldest First" },
    { value: "newest", label: "Newest First" },
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
  ];

  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setSortByOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

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
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto bg-[#0e1417] border-white/[0.06]">
            <SheetHeader>
              <SheetTitle className="text-on-surface font-[family-name:var(--font-sora)] text-lg">
                Filters
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
