"use client";

import { motion } from "framer-motion";
import { carBrands } from "@/data/car-brands";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function BrandGrid() {
  return (
    <section className="py-24 bg-[#080c14]">
      <div className="container mx-auto px-4">
        <AnimatedSection variant="fadeUp">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm font-medium mb-4">
              Trusted Brands
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Browse by Brand
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Explore vehicles from the world&apos;s most renowned automotive manufacturers
            </p>
          </div>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.02 },
            },
          }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3"
        >
          {carBrands.map((brand) => (
            <motion.a
              key={brand.name}
              href={`/cars?company=${brand.name}`}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.06] hover:border-white/[0.12] transition-colors duration-300 cursor-pointer"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="w-10 h-10 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 items-center justify-center text-xs font-bold text-gray-400 hidden"
                >
                  {brand.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors duration-300 text-center leading-tight">
                {brand.name}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
