"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const statusOptions = [
  { value: "PENDING", label: "Pending", color: "text-amber-400", bg: "bg-amber-500/10" },
  { value: "CONFIRMED", label: "Confirmed", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { value: "COMPLETED", label: "Completed", color: "text-blue-400", bg: "bg-blue-500/10" },
  { value: "CANCELLED", label: "Cancelled", color: "text-on-surface-variant", bg: "bg-white/5" },
  { value: "NO_SHOW", label: "No Show", color: "text-red-400", bg: "bg-red-500/10" },
];

export const statusFilterOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "No Show", value: "NO_SHOW" },
];

export function StatusSelector({
  currentStatus,
  bookingId,
  onUpdate,
  disabled,
  onOpenChange,
}: {
  currentStatus: string;
  bookingId: string;
  onUpdate: (id: string, status: string) => void;
  disabled: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = statusOptions.find((s) => s.value === currentStatus) || statusOptions[0];

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 outline-none disabled:opacity-50"
      >
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${current.bg} ${current.color.replace("text-", "bg-")}`} />
          <span className={`font-[family-name:var(--font-jakarta)] text-sm ${current.color}`}>
            {current.label}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-on-surface-variant/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full mb-2 left-0 z-50 w-full rounded-xl border border-white/[0.08] bg-[#1a2328] shadow-2xl shadow-black/50 overflow-hidden"
          >
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onUpdate(bookingId, opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.04] transition-colors duration-200 ${
                  opt.value === currentStatus ? "bg-white/[0.03]" : ""
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${opt.bg} ${opt.color.replace("text-", "bg-")}`} />
                <span className={`font-[family-name:var(--font-jakarta)] text-sm flex-1 text-left ${
                  opt.value === currentStatus ? opt.color : "text-on-surface"
                }`}>
                  {opt.label}
                </span>
                {opt.value === currentStatus && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
