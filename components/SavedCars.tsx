"use client";

import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";
import CarCard from "./Cards/CarCard";
import { ExtendedCar } from "@/types/types";

export function SavedCarsList({ initialData }: { initialData: ExtendedCar[] }) {
  if (!initialData || initialData.length === 0) {
    return (
      <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-12 md:p-16 text-center overflow-hidden max-w-2xl mx-auto my-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-secondary/[0.02] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-primary/[0.04] rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-secondary/[0.04] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6 shadow-xl">
            <Heart className="h-9 w-9 text-primary/70" strokeWidth={1.5} />
          </div>

          <h3 className="font-[family-name:var(--font-sora)] text-2xl md:text-3xl font-bold text-on-surface mb-3">
            No Saved Cars
          </h3>

          <p className="font-[family-name:var(--font-jakarta)] text-on-surface-variant text-base mb-8 max-w-md mx-auto leading-relaxed">
            You haven&apos;t saved any cars yet. Browse our collection and click the
            heart icon on any vehicle to save it for later.
          </p>

          <Link
            href="/cars"
            className="inline-flex items-center gap-2 gradient-bg text-black font-semibold px-8 py-3.5 rounded-xl hover:brightness-110 shadow-lg shadow-primary/20 transition-all font-[family-name:var(--font-jakarta)] text-sm uppercase tracking-wider"
          >
            <span>Browse Cars</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {initialData.map((car, index) => (
        <CarCard key={car.id} car={car} index={index} />
      ))}
    </div>
  );
}
