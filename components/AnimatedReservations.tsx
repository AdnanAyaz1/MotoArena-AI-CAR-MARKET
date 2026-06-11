"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import { ExtendedTestDriveBooking } from "@/types/types";
import ReservationList from "@/components/ReservationList";

const AnimatedReservations = ({
  initialData,
}: {
  initialData: ExtendedTestDriveBooking[];
}) => {
  const hasBookings = initialData && initialData.length > 0;
  const upcomingCount = initialData?.filter((b) =>
    ["PENDING", "CONFIRMED"].includes(b.status)
  ).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.08] via-surface to-surface" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/[0.06] rounded-full blur-[150px]" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-secondary/[0.05] rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-16">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-on-surface-variant/60 font-[family-name:var(--font-jakarta)] text-sm mb-8"
          >
            <Link href="/" className="hover:text-on-surface transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-on-surface">Reservations</span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="h-px w-12 gradient-bg" />
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-primary">
                  Your Bookings
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-[family-name:var(--font-sora)] text-[36px] md:text-[56px] font-bold text-on-surface leading-[1.05] tracking-tight"
              >
                Test Drive{" "}
                <span className="gradient-text">Reservations</span>
              </motion.h1>
            </div>

            {hasBookings && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent rounded-2xl" />
                  <div className="relative flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-jetbrains-mono)] text-2xl font-bold text-on-surface">
                        {upcomingCount}
                      </p>
                      <p className="text-on-surface-variant/60 text-xs font-[family-name:var(--font-jakarta)]">
                        Upcoming
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ReservationList initialData={initialData} />
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedReservations;
