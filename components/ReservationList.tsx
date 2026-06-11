"use client";

import React, { useState } from "react";
import { Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import { ExtendedTestDriveBooking } from "@/types/types";
import { toast } from "react-toastify";
import { handleTestDriveStatus } from "@/actions/handleTestDriveStatus";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TestDriveCard } from "./Cards/TestDriveCard";

const ReservationList = ({
  initialData,
}: {
  initialData: ExtendedTestDriveBooking[];
}) => {
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const router = useRouter();

  const handleCancelBooking = async (bookingId: string) => {
    setCancelling(true);
    const res = await handleTestDriveStatus(bookingId, "CANCELLED");
    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
    setCancelling(false);
  };

  // Group bookings by status
  const upcomingBookings = initialData?.filter((booking) =>
    ["PENDING", "CONFIRMED"].includes(booking.status)
  );

  const pastBookings = initialData?.filter((booking) =>
    ["COMPLETED", "CANCELLED", "NO_SHOW"].includes(booking.status)
  );

  // No reservations
  if (initialData?.length === 0) {
    return (
      <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        {/* Glow effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/[0.06] rounded-full blur-[80px]" />

        <div className="relative z-10 min-h-[400px] flex flex-col items-center justify-center text-center p-8">
          <div className="p-4 rounded-2xl bg-primary/10 mb-6">
            <Calendar className="h-10 w-10 text-primary" />
          </div>
          <h3 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-on-surface mb-3">
            No Reservations Yet
          </h3>
          <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] mb-8 max-w-md">
            You don&apos;t have any test drive reservations yet. Browse our luxury
            collection and book a test drive to experience the thrill.
          </p>
          <Link
            href="/cars"
            className="relative group px-8 py-4 rounded-xl gradient-bg text-black font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            <span className="relative z-10">Browse Cars</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Upcoming Bookings */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-primary/50" />
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface">
            Upcoming Test Drives
          </h2>
          {upcomingBookings.length > 0 && (
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-[family-name:var(--font-jetbrains-mono)] text-xs">
              {upcomingBookings.length}
            </span>
          )}
        </div>
        {upcomingBookings.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <p className="text-on-surface-variant/60 font-[family-name:var(--font-jakarta)] text-sm italic">
              No upcoming test drives scheduled.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TestDriveCard
                  booking={booking}
                  onCancel={handleCancelBooking}
                  isCancelling={cancelling}
                  showActions
                  cancelError={cancelError}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Past Bookings */}
      {pastBookings.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-white/20" />
            <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface">
              Past Test Drives
            </h2>
            <span className="px-3 py-1 rounded-full bg-white/5 text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)] text-xs">
              {pastBookings.length}
            </span>
          </div>
          <div className="space-y-4">
            {pastBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TestDriveCard
                  booking={booking}
                  showActions={false}
                  isPast
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationList;
