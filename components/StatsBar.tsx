"use client";

import { motion } from "framer-motion";

import { CountingNumber } from "@/components/CountingNumber";

const stats = [
  { value: 12400, suffix: "+", label: "Premium Vehicles" },
  { value: 850, suffix: "+", label: "Certified Dealers" },
  { value: 99.2, suffix: "%", label: "Satisfaction", decimals: 1 },
];

export const StatsBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 w-full"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.1 + index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center group"
        >
          <span className="font-[family-name:var(--font-sora)] text-4xl md:text-5xl font-semibold gradient-text">
            <CountingNumber
              target={stat.value}
              suffix={stat.suffix}
              decimals={stat.decimals}
              duration={2.5}
              delay={1.2 + index * 0.15}
            />
          </span>
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-outline uppercase tracking-widest mt-2">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};
