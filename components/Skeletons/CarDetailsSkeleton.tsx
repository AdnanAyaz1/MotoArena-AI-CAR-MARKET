import { Skeleton } from "@/components/ui/skeleton";

export function CarDetailsSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.02]" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/[0.05] rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-secondary/[0.05] rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-16 py-8">
          <div className="mb-6">
            <Skeleton className="h-4 w-28 rounded-md bg-white/[0.06]" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20 rounded-md bg-white/[0.06]" />
              <Skeleton className="h-10 md:h-12 w-64 md:w-96 rounded-xl bg-white/[0.06]" />
            </div>
            <div>
              <Skeleton className="h-9 md:h-10 w-36 rounded-xl bg-white/[0.06]" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-4 overflow-hidden space-y-4">
              <Skeleton className="h-[320px] sm:h-[420px] md:h-[480px] w-full rounded-2xl bg-white/[0.06]" />
              <div className="flex gap-3 overflow-hidden py-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-16 w-24 flex-shrink-0 rounded-xl bg-white/[0.06]"
                  />
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 overflow-hidden space-y-4">
              <Skeleton className="h-6 w-32 rounded-md bg-white/[0.06]" />
              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-full bg-white/[0.06]" />
                <Skeleton className="h-4 w-11/12 bg-white/[0.06]" />
                <Skeleton className="h-4 w-4/5 bg-white/[0.06]" />
              </div>
            </div>

            <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 overflow-hidden">
              <Skeleton className="h-6 w-28 rounded-md bg-white/[0.06] mb-6" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-12 rounded-xl bg-white/[0.04]"
                  />
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 overflow-hidden">
              <Skeleton className="h-6 w-36 rounded-md bg-white/[0.06] mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-12 rounded-xl bg-white/[0.04]"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 overflow-hidden">
              <Skeleton className="h-5 w-28 rounded-md bg-white/[0.06] mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-14 rounded-xl bg-white/[0.04]"
                  />
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 overflow-hidden space-y-4">
              <Skeleton className="h-12 w-full rounded-xl bg-white/[0.08]" />
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <Skeleton className="h-5 w-32 rounded-md bg-white/[0.06]" />
                <Skeleton className="h-3 w-full rounded-md bg-white/[0.06]" />
                <Skeleton className="h-10 w-full rounded-xl bg-white/[0.06]" />
              </div>
            </div>

            <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 overflow-hidden">
              <Skeleton className="h-5 w-36 rounded-md bg-white/[0.06] mb-4" />
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg bg-white/[0.06] flex-shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-32 rounded-md bg-white/[0.06]" />
                    <Skeleton className="h-3 w-48 rounded-md bg-white/[0.06]" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg bg-white/[0.06] flex-shrink-0" />
                  <Skeleton className="h-3 w-28 rounded-md bg-white/[0.06]" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg bg-white/[0.06] flex-shrink-0" />
                  <Skeleton className="h-3 w-36 rounded-md bg-white/[0.06]" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-3">
                <Skeleton className="h-4 w-28 rounded-md bg-white/[0.06]" />
                <div className="space-y-2 pt-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <Skeleton className="h-3 w-16 rounded-md bg-white/[0.06]" />
                      <Skeleton className="h-3 w-24 rounded-md bg-white/[0.06]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
