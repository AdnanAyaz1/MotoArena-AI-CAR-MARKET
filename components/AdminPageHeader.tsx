"use client";

import { motion } from "framer-motion";

const AdminPageHeader = ({
  label,
  title,
}: {
  label: string;
  title: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="h-px w-12 gradient-bg" />
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-primary">
          {label}
        </span>
      </div>
      <h1 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl font-bold text-on-surface">
        {title}
      </h1>
    </motion.div>
  );
};

export default AdminPageHeader;
