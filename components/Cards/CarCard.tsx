"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Fuel, Gauge, Palette } from "lucide-react";
import Link from "next/link";

import { ExtendedCar } from "@/types/types";
import ToggleCar from "../Buttons/ToggleCar";
import CarCardImage from "../CardImages/CarCardImage";

const CarCard = ({ car, index = 0 }: { car: ExtendedCar; index?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/cars/${car.id}`} className="block group">
        <div className="relative rounded-3xl border border-white/[0.06] overflow-hidden bg-white/[0.02] hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-500">
          {/* Gradient glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          {/* Corner accent */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/[0.04] rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Image */}
          <div className="relative overflow-hidden h-[220px]">
            {car.images && car.images.length > 0 ? (
              <CarCardImage images={car.images} />
            ) : (
              <div className="w-full h-full bg-surface-container flex items-center justify-center">
                <span className="text-on-surface-variant text-sm">No Image</span>
              </div>
            )}
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />

            {/* Year badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                {car.year}
              </span>
            </div>

            {/* Save button */}
            <div className="absolute top-3 right-3 z-10">
              <ToggleCar car={car} />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-5">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] text-on-surface-variant uppercase tracking-widest mb-0.5">
                  {car.company}
                </p>
                <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-on-surface line-clamp-1">
                  {car.model}
                </h3>
              </div>
              <span className="font-[family-name:var(--font-sora)] text-lg font-bold bg-gradient-to-r from-[#00d2ff] to-[#1fe19e] bg-clip-text text-transparent">
                ${car?.price?.toLocaleString()}
              </span>
            </div>

            {/* Specs row */}
            <div className="flex items-center gap-3 mb-4 text-xs text-on-surface-variant">
              <span className="flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-primary/60" />
                {car.transmission}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span className="flex items-center gap-1">
                <Fuel className="w-3.5 h-3.5 text-primary/60" />
                {car.fuelType}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span className="flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-primary/60" />
                {car.color}
              </span>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] text-on-surface-variant bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-md uppercase tracking-wider">
                {car.bodyType}
              </span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] text-on-surface-variant bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-md uppercase tracking-wider">
                {car?.mileage?.toLocaleString()} mi
              </span>
            </div>

            {/* CTA */}
            <div className="w-full py-3 border border-white/[0.08] text-on-surface font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold uppercase tracking-widest group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300 text-center flex items-center justify-center gap-2 rounded-xl">
              View Details <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CarCard;
