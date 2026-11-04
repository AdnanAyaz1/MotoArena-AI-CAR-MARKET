import { auth } from "@/auth";
import React from "react";
import { redirect } from "next/navigation";
import { db } from "@/lib/prismadb";
import { SavedCarsList } from "@/components/SavedCars";
import { ExtendedCar } from "@/types/types";

const SavedCars = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }
  const cars = await db.car.findMany({
    where: {
      savedBy: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      savedBy: true,
    },
  });

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.02]" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/[0.05] rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-secondary/[0.05] rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-16 pt-28 pb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 gradient-bg" />
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-primary">
              Wishlist
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-sora)] text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-on-surface">Your </span>
            <span className="gradient-text">Saved Cars</span>
          </h1>
          <p className="mt-3 text-on-surface-variant font-[family-name:var(--font-jakarta)] text-base max-w-lg">
            Keep track of the performance vehicles and luxury automobiles you love.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-12">
        <SavedCarsList initialData={cars as ExtendedCar[]} />
      </div>
    </div>
  );
};

export default SavedCars;
