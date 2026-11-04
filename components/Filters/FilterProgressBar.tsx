"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useFilterContext } from "./FilterContext";

export const FilterProgressBar = () => {
  const { isPending } = useFilterContext();

  return (
    <AnimatePresence>
      {isPending && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent overflow-hidden pointer-events-none"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut",
            }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#00d2ff] to-[#1fe19e] shadow-[0_0_12px_rgba(0,210,255,0.8)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterProgressBar;
