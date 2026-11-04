"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useFilterContext } from "@/components/Filters/FilterContext";
import CarCard from "@/components/Cards/CarCard";
import EmptyState from "@/components/EmptyState";
import ClearSearchButtons from "@/components/Filters/ClearSearchButtons";
import { ExtendedCar } from "@/types/types";
import { cn } from "@/lib/utils";

interface CarsListingsSectionProps {
  cars?: ExtendedCar[];
  search?: string;
}

export const CarsListingsSection = ({
  cars,
  search,
}: CarsListingsSectionProps) => {
  const { isPending } = useFilterContext();

  return (
    <div className="relative">
      <AnimatePresence>
        {isPending && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-28 z-30 flex justify-center mb-6 pointer-events-none"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0e1417]/95 border border-primary/30 shadow-[0_0_30px_rgba(0,210,255,0.25)] backdrop-blur-md">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface uppercase tracking-wider font-semibold">
                Applying filters...
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "transition-all duration-300",
          isPending && "opacity-40 grayscale-[20%] pointer-events-none select-none"
        )}
      >
        {search && cars && cars.length === 0 ? (
          <div className="text-center py-16">
            <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/[0.04] rounded-full blur-[80px]" />

              <div className="relative z-10">
                <h3 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-on-surface mb-3">
                  No matching cars found
                </h3>
                <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] mb-6 max-w-md mx-auto">
                  No cars match your search for &ldquo;{search}&rdquo; with the
                  current filters. Try adjusting your search or filters.
                </p>
                <ClearSearchButtons search={search} />
              </div>
            </div>
          </div>
        ) : cars && cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car, index) => (
              <CarCard
                key={car.id}
                car={car}
                index={index}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default CarsListingsSection;
