"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Headphones, Shield, Zap, ArrowUpRight } from "lucide-react";

import { CountingNumber } from "@/components/CountingNumber";

const features = [
  {
    icon: ShieldCheck,
    title: "Certified Precision",
    description:
      "Every vehicle undergoes a rigorous 300-point inspection by factory-trained master technicians.",
    iconBg: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
    span: "col-span-1 row-span-2",
    large: true,
  },
  {
    icon: Headphones,
    title: "24/7 Concierge",
    description:
      "Dedicated automotive advisor handling maintenance, logistics, and everything in between.",
    iconBg: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary",
    span: "col-span-1 row-span-1",
    large: false,
  },
  {
    icon: Shield,
    title: "Guaranteed Authenticity",
    description:
      "Complete provenance verification ensuring the historical integrity of every investment.",
    iconBg: "from-tertiary/20 to-tertiary/5",
    iconColor: "text-tertiary",
    span: "col-span-1 row-span-1",
    large: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const ExperienceSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated background gradient mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/[0.04] rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-tertiary/[0.03] rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-16">
        {/* Top heading area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 gradient-bg" />
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-primary">
              Why Motoverse
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-sora)] text-[36px] md:text-[56px] font-bold text-on-surface leading-[1.05] tracking-tight max-w-xl">
            Built for the{" "}
            <span className="relative inline-block">
              <span className="gradient-text">obsessed</span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] gradient-bg rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-auto">
          {/* Large hero card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="md:row-span-2 group relative rounded-3xl border border-white/[0.06] overflow-hidden min-h-[320px] md:min-h-[480px]"
          >
            {/* Card gradient bg */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.03] transition-colors duration-500" />

            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/[0.06] rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-8 border border-primary/10 group-hover:scale-110 group-hover:border-primary/20 transition-all duration-500">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-sora)] text-2xl md:text-3xl font-bold text-on-surface mb-4 tracking-tight">
                  Certified{" "}
                  <span className="text-primary">Precision</span>
                </h3>
                <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] leading-relaxed max-w-sm text-base md:text-lg">
                  Every vehicle undergoes a rigorous 300-point inspection by
                  factory-trained master technicians. Only the flawless make it
                  to our showroom.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 mt-8">
                Learn more <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Top right card */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="group relative rounded-3xl border border-white/[0.06] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.03] transition-colors duration-500" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/[0.06] rounded-full blur-[50px] translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 p-8 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mb-6 border border-secondary/10 group-hover:scale-110 group-hover:border-secondary/20 transition-all duration-500">
                <Headphones className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface mb-3 tracking-tight">
                24/7 <span className="text-secondary">Concierge</span>
              </h3>
              <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] leading-relaxed text-sm flex-1">
                A dedicated automotive advisor available around the clock for
                maintenance, logistics, and everything in between.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 mt-6">
                Learn more <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Bottom right card */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="group relative rounded-3xl border border-white/[0.06] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-tertiary/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.03] transition-colors duration-500" />
            <div className="absolute top-0 left-0 w-32 h-32 bg-tertiary/[0.06] rounded-full blur-[50px] -translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 p-8 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-tertiary/20 to-tertiary/5 flex items-center justify-center mb-6 border border-tertiary/10 group-hover:scale-110 group-hover:border-tertiary/20 transition-all duration-500">
                <Shield className="w-7 h-7 text-tertiary" />
              </div>
              <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface mb-3 tracking-tight">
                Guaranteed{" "}
                <span className="text-tertiary">Authenticity</span>
              </h3>
              <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] leading-relaxed text-sm flex-1">
                Complete chain of custody and provenance verification ensuring
                the historical integrity of every investment.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-tertiary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 mt-6">
                Learn more <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/[0.06] pt-10"
        >
          {[
            { value: 300, suffix: "+", label: "Point Inspection" },
            { value: 24, suffix: "/7", label: "Support Available" },
            { value: 100, suffix: "%", label: "Verified Listings" },
            { value: 15, suffix: "K+", label: "Happy Clients" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="font-[family-name:var(--font-sora)] text-2xl md:text-3xl font-bold gradient-text mb-1">
                <CountingNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={2}
                  delay={0.5 + i * 0.15}
                />
              </div>
              <div className="font-[family-name:var(--font-jakarta)] text-xs uppercase tracking-wider text-on-surface-variant">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
