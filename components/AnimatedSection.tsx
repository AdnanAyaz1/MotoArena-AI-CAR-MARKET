"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type AnimationVariant = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleUp" | "fadeIn";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  variant?: AnimationVariant;
  duration?: number;
  className?: string;
}

const variants: Record<AnimationVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export const AnimatedSection = ({
  children,
  delay = 0,
  variant = "fadeUp",
  duration = 0.6,
  className,
}: AnimatedSectionProps) => {
  return (
    <motion.div
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
