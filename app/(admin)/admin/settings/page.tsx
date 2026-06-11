"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ManageUsers from "./components/ManageUsers";
import ManageWorkingHours from "./components/ManageWorkingHours";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<"working-hours" | "users">(
    "working-hours"
  );

  return (
    <div className="px-6 md:px-10 max-w-[1400px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px w-12 gradient-bg" />
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-primary">
            Configuration
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl font-bold text-on-surface">
          Settings
        </h1>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 rounded-2xl bg-white/[0.02] border border-white/[0.06] w-fit mb-8">
        <button
          onClick={() => setActiveTab("working-hours")}
          className={`px-6 py-2.5 rounded-xl font-[family-name:var(--font-jakarta)] text-sm font-medium transition-all duration-300 ${
            activeTab === "working-hours"
              ? "gradient-bg text-black"
              : "text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04]"
          }`}
        >
          Working Hours
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-6 py-2.5 rounded-xl font-[family-name:var(--font-jakarta)] text-sm font-medium transition-all duration-300 ${
            activeTab === "users"
              ? "gradient-bg text-black"
              : "text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04]"
          }`}
        >
          Users
        </button>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "working-hours" ? (
          <ManageWorkingHours />
        ) : (
          <ManageUsers />
        )}
      </motion.div>
    </div>
  );
};

export default Settings;
