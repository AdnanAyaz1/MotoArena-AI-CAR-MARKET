import React from "react";

export function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.04]">
        <h3 className="font-[family-name:var(--font-sora)] text-sm font-semibold text-on-surface">
          {title}
        </h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
