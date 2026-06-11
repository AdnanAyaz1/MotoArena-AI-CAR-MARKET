"use client";

import { motion } from "framer-motion";

export const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gradient orb - top left */}
      <motion.div
        className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[120px]"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Large gradient orb - bottom right */}
      <motion.div
        className="absolute -bottom-48 -right-48 w-[800px] h-[800px] rounded-full bg-secondary/15 blur-[120px]"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Medium gradient orb - center left */}
      <motion.div
        className="absolute top-1/2 -left-24 w-[600px] h-[600px] rounded-full bg-primary-container/15 blur-[120px]"
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Subtle dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-30" />
    </div>
  );
};
