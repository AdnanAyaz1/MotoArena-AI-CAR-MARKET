"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: "100%" }}
    >
      <div
        className={`rounded-xl border transition-colors duration-300 ${
          isOpen
            ? "border-white/[0.12] bg-white/[0.04]"
            : "border-white/[0.06] bg-white/[0.02]"
        }`}
        style={{ width: "100%" }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="text-white hover:text-blue-400 text-sm font-medium transition-colors">
            {question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="shrink-0"
          >
            <ChevronDown className="size-4 text-gray-500" />
          </motion.span>
        </button>

        <div
          className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
              {answer}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <section className="py-24 bg-[#0a0e18]">
      <div style={{ maxWidth: "48rem", margin: "0 auto", width: "100%", padding: "0 1rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400 text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">
            Got questions? We&apos;ve got answers.
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
    </section>
  );
};

export default FAQ;
