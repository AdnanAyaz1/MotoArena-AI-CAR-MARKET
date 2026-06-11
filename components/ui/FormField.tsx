import React from "react";

export function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-on-surface-variant/60 uppercase tracking-wider mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-red-400 font-[family-name:var(--font-jakarta)] text-xs">
          {error}
        </p>
      )}
    </div>
  );
}
