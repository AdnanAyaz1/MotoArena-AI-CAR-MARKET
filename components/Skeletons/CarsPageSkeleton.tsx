import { Skeleton } from "@/components/ui/skeleton";

import { CarGridSkeleton } from "./CarCardSkeleton";
import { FilterSidebarSkeleton } from "./FilterSidebarSkeleton";

export function CarsPageSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-secondary/[0.02] to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/[0.04] rounded-full blur-[120px]" />
        <div className="absolute top-20 -left-20 w-60 h-60 bg-secondary/[0.04] rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-16 pt-[140px] pb-[80px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <Skeleton className="h-4 w-24 bg-white/[0.06]" />
              <Skeleton className="h-12 w-64 bg-white/[0.06]" />
              <Skeleton className="h-5 w-48 bg-white/[0.06]" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-11 w-32 rounded-xl bg-white/[0.06]" />
              <Skeleton className="h-11 w-32 rounded-xl bg-white/[0.06]" />
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="px-5 md:px-16 max-w-[1440px] mx-auto pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters skeleton */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-28">
              <FilterSidebarSkeleton />
            </div>
          </div>

          {/* Grid skeleton */}
          <div className="flex-1">
            <CarGridSkeleton count={6} />
          </div>
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center mt-12 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-xl bg-white/[0.06]" />
          ))}
        </div>
      </div>
    </div>
  );
}
