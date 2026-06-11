"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { SectionContainer } from "@/components/layout";
import { faqItems } from "@/lib/constants";

const FAQItem = ({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: "100%" }}
    >
      <div
        className={`relative rounded-2xl border overflow-hidden transition-all duration-500 ${
          isOpen
            ? "border-white/[0.12] bg-white/[0.04]"
            : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.03] hover:border-white/[0.10]"
        }`}
        style={{ width: "100%" }}
      >
        {/* Gradient glow on hover / open */}
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent transition-opacity duration-700 ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
        {/* Corner accent */}
        <div className={`absolute -top-16 -right-16 w-40 h-40 bg-primary/[0.04] rounded-full blur-[50px] transition-opacity duration-700 ${isOpen ? "opacity-100" : "opacity-0"}`} />

        <div className="relative z-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
          >
            <span className={`text-sm font-medium font-[family-name:var(--font-jakarta)] transition-colors ${isOpen ? "text-primary" : "text-on-surface hover:text-primary"}`}>
              {question}
            </span>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="shrink-0"
            >
              <ChevronDown className={`size-4 transition-colors ${isOpen ? "text-primary" : "text-on-surface-variant"}`} />
            </motion.span>
          </button>

          <div
            className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="px-6 pb-5 text-on-surface-variant text-sm leading-relaxed font-[family-name:var(--font-jakarta)]">
                {answer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const FAQSection = () => {
  return (
    <SectionContainer>
      <div style={{ maxWidth: "48rem", margin: "0 auto", width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 gradient-bg" />
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-primary">
              FAQ
            </span>
            <div className="h-px w-12 gradient-bg" />
          </div>
          <h2 className="font-[family-name:var(--font-sora)] text-[32px] md:text-[48px] font-bold text-on-surface mb-4 tracking-tight">
            Got <span className="gradient-text">Questions</span>?
          </h2>
          <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-lg">
            We&apos;ve got answers.
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
          {faqItems.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};
