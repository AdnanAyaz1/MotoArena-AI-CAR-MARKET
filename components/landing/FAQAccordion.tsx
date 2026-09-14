"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { faqItems } from "@/lib/constants";

export const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
      {faqItems.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} style={{ width: "100%" }}>
            <div
              className={`relative rounded-2xl border overflow-hidden transition-all duration-500 ${
                isOpen
                  ? "border-white/[0.12] bg-white/[0.04]"
                  : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.03] hover:border-white/[0.10]"
              }`}
              style={{ width: "100%" }}
            >
              {/* Gradient glow on hover / open */}
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent transition-opacity duration-700 ${isOpen ? "opacity-100" : "opacity-0"}`} />
              {/* Corner accent */}
              <div className={`absolute -top-16 -right-16 w-40 h-40 bg-primary/[0.04] rounded-full blur-[50px] transition-opacity duration-700 ${isOpen ? "opacity-100" : "opacity-0"}`} />

              <div className="relative z-10">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className={`text-sm font-medium font-[family-name:var(--font-jakarta)] transition-colors ${isOpen ? "text-primary" : "text-on-surface hover:text-primary"}`}>
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <ChevronDown className={`size-4 transition-colors ${isOpen ? "text-primary" : "text-on-surface-variant"}`} />
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 text-on-surface-variant text-sm leading-relaxed font-[family-name:var(--font-jakarta)]">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
