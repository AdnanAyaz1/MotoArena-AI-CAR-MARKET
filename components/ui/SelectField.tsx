import React from "react";
import { ChevronDown } from "lucide-react";

export function SelectField({
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder: string;
  error: boolean;
}) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 pr-10 rounded-xl border bg-white/[0.02] text-on-surface font-[family-name:var(--font-jakarta)] text-sm appearance-none cursor-pointer focus:border-primary/50 hover:bg-white/[0.04] focus:bg-white/[0.04] transition-all duration-300 outline-none ${
          error
            ? "border-red-500/50"
            : "border-white/[0.06]"
        } ${!value ? "text-on-surface-variant/40" : ""}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 pointer-events-none" />
    </div>
  );
}
