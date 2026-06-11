"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
  Calendar,
  TrendingUp,
  Info,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { DashboardDataResponse } from "@/types/types";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  index,
  trend,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: any;
  color: string;
  index: number;
  trend?: "up" | "down";
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-500"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/[0.04] rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    <div className="relative z-10 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-[family-name:var(--font-jetbrains-mono)] ${
              trend === "up"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {trend === "up" ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
          </div>
        )}
      </div>
      <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant/50 uppercase tracking-wider mb-1">
        {title}
      </p>
      <p className="font-[family-name:var(--font-sora)] text-3xl font-bold text-on-surface mb-1">
        {value}
      </p>
      <p className="font-[family-name:var(--font-jakarta)] text-xs text-on-surface-variant/60">
        {subtitle}
      </p>
    </div>
  </motion.div>
);

const ProgressBar = ({
  label,
  value,
  color,
  count,
  total,
}: {
  label: string;
  value: number;
  color: string;
  count: number;
  total: number;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-on-surface-variant font-[family-name:var(--font-jakarta)]">
        {label}
      </span>
      <span className="text-on-surface font-[family-name:var(--font-jetbrains-mono)] text-xs">
        {count} ({value.toFixed(1)}%)
      </span>
    </div>
    <div className="w-full bg-white/[0.04] rounded-full h-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`${color} h-2 rounded-full`}
      />
    </div>
  </div>
);

export function Dashboard({
  initialData,
  success,
}: {
  initialData: DashboardDataResponse;
  success: boolean;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "test-drives">(
    "overview"
  );

  if (!initialData || !success) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-red-400" />
          <p className="text-red-400 font-[family-name:var(--font-jakarta)]">
            Failed to load dashboard data
          </p>
        </div>
      </div>
    );
  }

  const { cars, testDrives } = initialData;

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex gap-2 p-1 rounded-2xl bg-white/[0.02] border border-white/[0.06] w-fit">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-6 py-2.5 rounded-xl font-[family-name:var(--font-jakarta)] text-sm font-medium transition-all duration-300 ${
            activeTab === "overview"
              ? "gradient-bg text-black"
              : "text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04]"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("test-drives")}
          className={`px-6 py-2.5 rounded-xl font-[family-name:var(--font-jakarta)] text-sm font-medium transition-all duration-300 ${
            activeTab === "test-drives"
              ? "gradient-bg text-black"
              : "text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04]"
          }`}
        >
          Test Drives
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Cars"
              value={cars.total}
              subtitle={`${cars.available} available, ${cars.sold} sold`}
              icon={Car}
              color="bg-primary/10 text-primary"
              index={0}
            />
            <StatCard
              title="Test Drives"
              value={testDrives.total}
              subtitle={`${testDrives.pending} pending, ${testDrives.confirmed} confirmed`}
              icon={Calendar}
              color="bg-secondary/10 text-secondary"
              index={1}
            />
            <StatCard
              title="Conversion Rate"
              value={`${testDrives.conversionRate}%`}
              subtitle="From test drives to sales"
              icon={TrendingUp}
              color="bg-tertiary/10 text-tertiary"
              index={2}
              trend="up"
            />
            <StatCard
              title="Cars Sold"
              value={cars.sold}
              subtitle={`${((cars.sold / cars.total) * 100).toFixed(1)}% of inventory`}
              icon={DollarSign}
              color="bg-emerald-500/10 text-emerald-400"
              index={3}
            />
          </div>

          {/* Dealership Summary */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Inventory Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent" />
              <div className="relative z-10 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <BarChart3 className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-on-surface">
                    Inventory Status
                  </h3>
                </div>

                <div className="space-y-5">
                  <ProgressBar
                    label="Available"
                    value={(cars.available / cars.total) * 100}
                    color="bg-emerald-500"
                    count={cars.available}
                    total={cars.total}
                  />
                  <ProgressBar
                    label="Sold"
                    value={(cars.sold / cars.total) * 100}
                    color="bg-primary"
                    count={cars.sold}
                    total={cars.total}
                  />
                  <ProgressBar
                    label="Unavailable"
                    value={(cars.unavailable / cars.total) * 100}
                    color="bg-amber-500"
                    count={cars.unavailable}
                    total={cars.total}
                  />
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.02] via-transparent to-transparent" />
              <div className="relative z-10 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-secondary/10">
                    <TrendingUp className="w-4 h-4 text-secondary" />
                  </div>
                  <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-on-surface">
                    Quick Stats
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                    <p className="font-[family-name:var(--font-sora)] text-2xl font-bold text-primary">
                      {cars.sold}
                    </p>
                    <p className="text-on-surface-variant/60 font-[family-name:var(--font-jakarta)] text-xs mt-1">
                      Cars Sold
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                    <p className="font-[family-name:var(--font-sora)] text-2xl font-bold text-tertiary">
                      {testDrives.pending + testDrives.confirmed}
                    </p>
                    <p className="text-on-surface-variant/60 font-[family-name:var(--font-jakarta)] text-xs mt-1">
                      Upcoming Drives
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                    <p className="font-[family-name:var(--font-sora)] text-2xl font-bold text-secondary">
                      {((cars.available / (cars.total || 1)) * 100).toFixed(0)}%
                    </p>
                    <p className="text-on-surface-variant/60 font-[family-name:var(--font-jakarta)] text-xs mt-1">
                      Availability
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                    <p className="font-[family-name:var(--font-sora)] text-2xl font-bold text-emerald-400">
                      {testDrives.conversionRate}%
                    </p>
                    <p className="text-on-surface-variant/60 font-[family-name:var(--font-jakarta)] text-xs mt-1">
                      Conversion
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Test Drives Tab */}
      {activeTab === "test-drives" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Status Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <StatCard
              title="Total"
              value={testDrives.total}
              subtitle="All bookings"
              icon={Calendar}
              color="bg-primary/10 text-primary"
              index={0}
            />
            <StatCard
              title="Pending"
              value={testDrives.pending}
              subtitle={`${testDrives.total ? ((testDrives.pending / testDrives.total) * 100).toFixed(1) : 0}% of total`}
              icon={Clock}
              color="bg-amber-500/10 text-amber-400"
              index={1}
            />
            <StatCard
              title="Confirmed"
              value={testDrives.confirmed}
              subtitle={`${testDrives.total ? ((testDrives.confirmed / testDrives.total) * 100).toFixed(1) : 0}% of total`}
              icon={CheckCircle}
              color="bg-emerald-500/10 text-emerald-400"
              index={2}
            />
            <StatCard
              title="Completed"
              value={testDrives.completed}
              subtitle={`${testDrives.total ? ((testDrives.completed / testDrives.total) * 100).toFixed(1) : 0}% of total`}
              icon={CheckCircle}
              color="bg-blue-500/10 text-blue-400"
              index={3}
            />
            <StatCard
              title="Cancelled"
              value={testDrives.cancelled}
              subtitle={`${testDrives.total ? ((testDrives.cancelled / testDrives.total) * 100).toFixed(1) : 0}% of total`}
              icon={XCircle}
              color="bg-red-500/10 text-red-400"
              index={4}
            />
          </div>

          {/* Status Breakdown */}
          <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent" />
            <div className="relative z-10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-primary/10">
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-on-surface">
                  Booking Status Breakdown
                </h3>
              </div>

              <div className="space-y-5">
                <ProgressBar
                  label="Pending"
                  value={(testDrives.pending / testDrives.total) * 100}
                  color="bg-amber-500"
                  count={testDrives.pending}
                  total={testDrives.total}
                />
                <ProgressBar
                  label="Confirmed"
                  value={(testDrives.confirmed / testDrives.total) * 100}
                  color="bg-emerald-500"
                  count={testDrives.confirmed}
                  total={testDrives.total}
                />
                <ProgressBar
                  label="Completed"
                  value={(testDrives.completed / testDrives.total) * 100}
                  color="bg-blue-500"
                  count={testDrives.completed}
                  total={testDrives.total}
                />
                <ProgressBar
                  label="Cancelled"
                  value={(testDrives.cancelled / testDrives.total) * 100}
                  color="bg-red-500"
                  count={testDrives.cancelled}
                  total={testDrives.total}
                />
                <ProgressBar
                  label="No Show"
                  value={(testDrives.noShow / testDrives.total) * 100}
                  color="bg-on-surface-variant"
                  count={testDrives.noShow}
                  total={testDrives.total}
                />
              </div>
            </div>
          </div>

          {/* Conversion & Completion */}
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent" />
              <div className="relative z-10 p-6 text-center">
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant/50 uppercase tracking-wider mb-2">
                  Conversion Rate
                </p>
                <p className="font-[family-name:var(--font-sora)] text-5xl font-bold gradient-text">
                  {testDrives.conversionRate}%
                </p>
                <p className="text-on-surface-variant/60 font-[family-name:var(--font-jakarta)] text-sm mt-2">
                  Test drives resulting in purchases
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.03] via-transparent to-transparent" />
              <div className="relative z-10 p-6 text-center">
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant/50 uppercase tracking-wider mb-2">
                  Completion Rate
                </p>
                <p className="font-[family-name:var(--font-sora)] text-5xl font-bold text-secondary">
                  {testDrives.total
                    ? ((testDrives.completed / testDrives.total) * 100).toFixed(1)
                    : 0}
                  %
                </p>
                <p className="text-on-surface-variant/60 font-[family-name:var(--font-jakarta)] text-sm mt-2">
                  Test drives successfully completed
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
