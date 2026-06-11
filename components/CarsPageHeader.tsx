"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";

interface CarsPageHeaderProps {
  search?: string;
  totalCars: number;
}

const CarsPageHeader = ({ search, totalCars }: CarsPageHeaderProps) => {
  return (
    <div className="relative overflow-hidden border-b border-white/[0.06]">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-primary/[0.04] rounded-full blur-[100px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[250px] bg-secondary/[0.03] rounded-full blur-[80px]" />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 px-5 md:px-16 py-16 md:py-24 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 gradient-bg" />
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-primary">
              Inventory
            </span>
          </div>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-sora)] text-[40px] md:text-[56px] font-bold text-on-surface leading-[1.05] tracking-tight mb-4">
            {search ? (
              <>
                Results for{" "}
                <span className="bg-gradient-to-r from-[#00d2ff] to-[#1fe19e] bg-clip-text text-transparent">
                  &ldquo;{search}&rdquo;
                </span>
              </>
            ) : (
              <>
                Browse{" "}
                <span className="bg-gradient-to-r from-[#00d2ff] to-[#1fe19e] bg-clip-text text-transparent">
                  Cars
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-lg max-w-xl">
            {search
              ? `Showing ${totalCars} result${totalCars !== 1 ? "s" : ""} for your search.`
              : "Explore our curated collection of premium vehicles."}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-6 mt-8"
        >
          <div className="flex items-center gap-2 text-on-surface-variant">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider">
              {totalCars} vehicle{totalCars !== 1 ? "s" : ""} found
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CarsPageHeader;
