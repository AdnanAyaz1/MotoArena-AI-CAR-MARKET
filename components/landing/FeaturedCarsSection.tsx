"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { GradientText } from "@/components/design-system";
import { SectionContainer } from "@/components/layout";
import { ExtendedCar } from "@/types/types";
import CarImage from "@/components/CardImages/CarImage";

interface FeaturedCarsSectionProps {
  cars: ExtendedCar[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export const FeaturedCarsSection = ({ cars }: FeaturedCarsSectionProps) => {
  const mainCar = cars[0];
  const sideCars = cars.slice(1, 3);

  return (
    <SectionContainer>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-between items-end mb-16"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 gradient-bg" />
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-primary">
              Inventory
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-sora)] text-[32px] md:text-[48px] font-bold text-on-surface uppercase tracking-tight">
            Masterpieces in{" "}
            <span className="gradient-text">Motion</span>
          </h2>
          <p className="mt-4 text-on-surface-variant font-[family-name:var(--font-jakarta)] max-w-md">
            The current highlight reel of automotive engineering.
          </p>
        </div>
        <Link
          href="/cars"
          className="hidden md:inline-flex items-center gap-2 border border-white/15 px-8 py-3.5 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-xl"
        >
          View All <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-6 relative z-10"
      >
        {/* Main Car Card - Horizontal */}
        {mainCar && (
          <motion.div variants={itemVariants}>
            <Link href={`/cars/${mainCar.id}`} className="block group">
              <div className="relative rounded-3xl border border-white/[0.06] overflow-hidden bg-white/[0.02] hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-500">
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                {/* Corner accent */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/[0.04] rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10 flex flex-col lg:flex-row">
                  <div className="w-full lg:w-2/3 h-[350px] lg:h-[420px] relative overflow-hidden">
                    {mainCar.images && mainCar.images.length > 0 ? (
                      <CarImage
                        src={mainCar.images[0]}
                        alt={`${mainCar.company} ${mainCar.model}`}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-container flex items-center justify-center">
                        <span className="text-on-surface-variant">No Image</span>
                      </div>
                    )}
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface/80 hidden lg:block" />
                  </div>

                  <div className="w-full lg:w-1/3 p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">
                            {mainCar.company}
                          </p>
                          <h3 className="font-[family-name:var(--font-sora)] text-2xl uppercase tracking-tight text-on-surface">
                            {mainCar.model}
                          </h3>
                        </div>
                        <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-secondary bg-secondary/10 px-3 py-1 rounded-lg">
                          {mainCar.year}
                        </span>
                      </div>
                      <p className="font-[family-name:var(--font-jakarta)] text-sm text-on-surface-variant mb-8 leading-relaxed">
                        {mainCar.description?.slice(0, 120)}...
                      </p>
                      <div className="grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-6">
                        {[
                          { label: "Power", value: mainCar.fuelType },
                          { label: "Gear", value: mainCar.transmission },
                          { label: "Mileage", value: mainCar.mileage?.toLocaleString() },
                          { label: "Body", value: mainCar.bodyType },
                        ].map((spec) => (
                          <div key={spec.label}>
                            <span className="block font-[family-name:var(--font-jetbrains-mono)] text-[9px] text-on-surface-variant uppercase mb-1 tracking-widest">
                              {spec.label}
                            </span>
                            <span className="block font-[family-name:var(--font-jetbrains-mono)] text-sm text-primary">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8">
                      <GradientText className="font-[family-name:var(--font-sora)] text-3xl font-extrabold block mb-4">
                        ${mainCar.price?.toLocaleString()}
                      </GradientText>
                      <div className="w-full py-4 border border-primary/30 text-primary font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold uppercase tracking-widest group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all text-center flex items-center justify-center gap-2 rounded-xl">
                        View Details <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Side Cars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sideCars.map((car, index) => (
            <motion.div key={car.id} variants={itemVariants}>
              <Link href={`/cars/${car.id}`} className="block group">
                <div className="relative rounded-3xl border border-white/[0.06] overflow-hidden bg-white/[0.02] hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-500">
                  {/* Gradient glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${index === 0 ? "from-secondary/[0.04]" : "from-primary/[0.04]"} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  {/* Corner accent */}
                  <div className={`absolute -top-20 -right-20 w-48 h-48 ${index === 0 ? "bg-secondary/[0.04]" : "bg-primary/[0.04]"} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                  <div className="relative z-10 flex flex-col lg:flex-row">
                    <div className="w-full lg:w-3/5 h-[280px] lg:h-[300px] relative overflow-hidden">
                      {car.images && car.images.length > 0 ? (
                        <CarImage
                          src={car.images[0]}
                          alt={`${car.company} ${car.model}`}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-surface-container flex items-center justify-center">
                          <span className="text-on-surface-variant">No Image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface/60 hidden lg:block" />
                    </div>

                    <div className="w-full lg:w-2/5 p-6 lg:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] text-on-surface-variant uppercase tracking-widest mb-1">
                              {car.company}
                            </p>
                            <h3 className="font-[family-name:var(--font-sora)] text-lg uppercase tracking-tight text-on-surface">
                              {car.model}
                            </h3>
                          </div>
                          <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-secondary bg-secondary/10 px-2.5 py-1 rounded-lg">
                            {car.year}
                          </span>
                        </div>
                        <p className="font-[family-name:var(--font-jakarta)] text-xs text-on-surface-variant mb-4 leading-relaxed">
                          {car.description?.slice(0, 80)}...
                        </p>
                        <div className="grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-4">
                          <div>
                            <span className="block font-[family-name:var(--font-jetbrains-mono)] text-[8px] text-on-surface-variant uppercase mb-0.5 tracking-widest">
                              Fuel
                            </span>
                            <span className="block font-[family-name:var(--font-jetbrains-mono)] text-xs text-primary">
                              {car.fuelType}
                            </span>
                          </div>
                          <div>
                            <span className="block font-[family-name:var(--font-jetbrains-mono)] text-[8px] text-on-surface-variant uppercase mb-0.5 tracking-widest">
                              Gear
                            </span>
                            <span className="block font-[family-name:var(--font-jetbrains-mono)] text-xs text-primary">
                              {car.transmission}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5">
                        <GradientText className="font-[family-name:var(--font-sora)] text-xl font-bold block mb-3">
                          ${car.price?.toLocaleString()}
                        </GradientText>
                        <div className="w-full py-3 border border-secondary/30 text-secondary font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold uppercase tracking-widest group-hover:bg-secondary group-hover:text-black group-hover:border-secondary transition-all text-center flex items-center justify-center gap-2 rounded-xl">
                          View Details <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="md:hidden mt-4">
          <Link
            href="/cars"
            className="w-full border border-white/15 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center flex items-center justify-center gap-2 rounded-xl"
          >
            View Full Inventory <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </SectionContainer>
  );
};
