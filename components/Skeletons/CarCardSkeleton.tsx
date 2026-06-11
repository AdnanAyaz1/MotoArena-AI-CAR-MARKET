import { Skeleton } from "@/components/ui/skeleton";

export function CarCardSkeleton() {
  return (
    <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      {/* Image */}
      <div className="relative h-[220px]">
        <Skeleton className="absolute inset-0 bg-white/[0.04] rounded-none" />
        {/* Year badge */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-12 rounded-lg bg-white/[0.06]" />
        </div>
        {/* Save button */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-8 w-8 rounded-lg bg-white/[0.06]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1.5">
            <Skeleton className="h-2.5 w-16 bg-white/[0.06]" />
            <Skeleton className="h-5 w-32 bg-white/[0.06]" />
          </div>
          <Skeleton className="h-5 w-20 bg-white/[0.06]" />
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-3.5 w-20 bg-white/[0.06]" />
          <Skeleton className="h-1 w-1 rounded-full bg-white/[0.06]" />
          <Skeleton className="h-3.5 w-16 bg-white/[0.06]" />
          <Skeleton className="h-1 w-1 rounded-full bg-white/[0.06]" />
          <Skeleton className="h-3.5 w-14 bg-white/[0.06]" />
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-md bg-white/[0.06]" />
          <Skeleton className="h-5 w-20 rounded-md bg-white/[0.06]" />
        </div>

        {/* CTA */}
        <Skeleton className="h-11 w-full rounded-xl bg-white/[0.06]" />
      </div>
    </div>
  );
}

export function CarGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CarCardSkeleton key={i} />
      ))}
    </div>
  );
}
