"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HeroRevealProps {
  children: ReactNode;
  className?: string;
}

export const HeroReveal = ({ children, className }: HeroRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const HeroTitle = ({ children, className }: HeroRevealProps) => {
  return (
    <motion.h1
      initial={{ y: 30 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.h1>
  );
};

export const HeroSubtitle = ({ children, className }: HeroRevealProps) => {
  return (
    <motion.p
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.p>
  );
};

export const HeroSearch = ({ children, className }: HeroRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        delay: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
