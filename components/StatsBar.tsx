"use client";

import { motion, Variants } from "framer-motion";

import { CountingNumber } from "@/components/CountingNumber";

const stats = [
  { value: 12400, suffix: "+", label: "Premium Vehicles" },
  { value: 850, suffix: "+", label: "Certified Dealers" },
  { value: 99.2, suffix: "%", label: "Satisfaction", decimals: 1 },
];

const statsBarVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      staggerChildren: 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const statItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export const StatsBar = () => {
  return (
    <motion.div
      variants={statsBarVariants}
      className="mt-8 sm:mt-16 grid grid-cols-3 gap-2 sm:gap-8 md:gap-16 w-full"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={statItemVariants}
          className="flex flex-col items-center group"
        >
          <span className="font-[family-name:var(--font-sora)] text-2xl sm:text-4xl md:text-5xl font-semibold gradient-text">
            <CountingNumber
              target={stat.value}
              suffix={stat.suffix}
              decimals={stat.decimals}
              duration={1.2}
              delay={0.1 + index * 0.06}
            />
          </span>
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] sm:text-[11px] text-outline uppercase tracking-wider sm:tracking-widest mt-1 sm:mt-2 text-center">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};