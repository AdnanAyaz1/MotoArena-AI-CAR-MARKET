"use client";

import { ArrowUpRight } from "lucide-react";

export const NewsletterForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full md:w-auto">
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
    </div>
  );
};
