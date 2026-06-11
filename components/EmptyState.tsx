"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-full"
    >
      <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/[0.04] rounded-full blur-[80px]" />

        <div className="relative z-10 min-h-[400px] flex flex-col items-center justify-center text-center p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/10"
          >
            <SearchX className="w-10 h-10 text-primary" />
          </motion.div>

          <h3 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-on-surface mb-3">
            No cars found
          </h3>
          <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] max-w-md leading-relaxed">
            We couldn&apos;t find any cars matching your search criteria. Try
            adjusting your filters or search term.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState;
