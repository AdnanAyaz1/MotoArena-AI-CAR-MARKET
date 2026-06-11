"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { SectionContainer } from "@/components/layout";

export const NewsletterCTA = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <SectionContainer>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl mx-auto rounded-3xl border border-white/[0.06] overflow-hidden bg-white/[0.02] hover:border-white/[0.10] transition-all duration-500 group"
      >
        {/* Gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-secondary/[0.04] opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
        {/* Corner accents */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/[0.06] rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-secondary/[0.05] rounded-full blur-[100px]" />
        {/* Top accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative z-10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 mb-6"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-primary">
                Exclusive Access
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-sora)] text-[32px] md:text-[40px] uppercase tracking-tight font-bold text-on-surface mb-4 leading-tight"
            >
              Join the{" "}
              <span className="gradient-text">Inner Circle</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-jakarta)] text-on-surface-variant text-lg leading-relaxed"
            >
              Get early access to off-market inventory and private auction
              events.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-auto"
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest w-full sm:w-80 focus:ring-1 focus:ring-primary focus:border-primary text-on-surface placeholder:text-on-surface-variant transition-all duration-300 hover:border-white/[0.15]"
                required
              />
              <button
                type="submit"
                className="gradient-bg text-on-primary-fixed font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold uppercase px-8 py-4 hover:brightness-110 transition-all duration-300 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                Subscribe <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </SectionContainer>
  );
};
