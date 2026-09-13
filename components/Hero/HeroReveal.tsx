"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface HeroRevealProps {
  children: ReactNode;
  className?: string;
}

export const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const HeroSectionContainer = ({
  children,
  className,
}: HeroRevealProps) => {
  return (
    <motion.div
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const HeroReveal = ({ children, className }: HeroRevealProps) => {
  return (
    <motion.div variants={heroItemVariants} className={className}>
      {children}
    </motion.div>
  );
};

const heroTitleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const HeroTitle = ({ children, className }: HeroRevealProps) => {
  return (
    <motion.h1 variants={heroTitleVariants} className={className}>
      {children}
    </motion.h1>
  );
};

const heroSubtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const HeroSubtitle = ({ children, className }: HeroRevealProps) => {
  return (
    <motion.p variants={heroSubtitleVariants} className={className}>
      {children}
    </motion.p>
  );
};

const heroSearchVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const HeroSearch = ({ children, className }: HeroRevealProps) => {
  return (
    <motion.div variants={heroSearchVariants} className={className}>
      {children}
    </motion.div>
  );
};