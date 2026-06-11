import { Skeleton } from "@/components/ui/skeleton";

export function FilterSidebarSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.06] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded bg-white/[0.06]" />
          <Skeleton className="h-4 w-16 bg-white/[0.06]" />
        </div>
        <Skeleton className="h-3.5 w-14 bg-white/[0.06]" />
      </div>

      {/* Price Range */}
      <div className="p-4 border-b border-white/[0.06] space-y-4">
        <Skeleton className="h-3 w-24 bg-white/[0.06]" />
        <Skeleton className="h-1.5 w-full rounded-full bg-white/[0.06]" />
        <div className="flex justify-between">
          <Skeleton className="h-6 w-16 rounded bg-white/[0.06]" />
          <Skeleton className="h-6 w-16 rounded bg-white/[0.06]" />
        </div>
      </div>

      {/* Company Filter */}
      <div className="p-4 border-b border-white/[0.06] space-y-3">
        <Skeleton className="h-3 w-18 bg-white/[0.06]" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-20 rounded-lg bg-white/[0.06]" />
          ))}
        </div>
      </div>

      {/* Body Type Filter */}
      <div className="p-4 border-b border-white/[0.06] space-y-3">
        <Skeleton className="h-3 w-20 bg-white/[0.06]" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-18 rounded-lg bg-white/[0.06]" />
          ))}
        </div>
      </div>

      {/* Fuel Type Filter */}
      <div className="p-4 border-b border-white/[0.06] space-y-3">
        <Skeleton className="h-3 w-20 bg-white/[0.06]" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-18 rounded-lg bg-white/[0.06]" />
          ))}
        </div>
      </div>

      {/* Transmission Filter */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-24 bg-white/[0.06]" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-18 rounded-lg bg-white/[0.06]" />
          ))}
        </div>
      </div>
    </div>
  );
}
