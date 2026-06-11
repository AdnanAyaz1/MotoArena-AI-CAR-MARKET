"use client";

import { useState } from "react";
import Link from "next/link";
import CarImage from "@/components/CardImages/CarImage";
import { format, parseISO } from "date-fns";
import {
  Calendar,
  Car,
  Clock,
  User,
  Loader2,
  ArrowRight,
  X,
  AlertTriangle,
  FileText,
  MoreHorizontal,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { ExtendedTestDriveBooking } from "@/types/types";
import { motion, AnimatePresence } from "framer-motion";

const formatTime = (timeString: string) => {
  try {
    return format(parseISO(`2022-01-01T${timeString}`), "h:mm a");
  } catch {
    return timeString;
  }
};

const getStatusConfig = (status: string) => {
  switch (status) {
    case "PENDING":
      return {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        dot: "bg-amber-400",
        border: "border-amber-500/20",
        label: "Pending",
      };
    case "CONFIRMED":
      return {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        dot: "bg-emerald-400",
        border: "border-emerald-500/20",
        label: "Confirmed",
      };
    case "COMPLETED":
      return {
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        dot: "bg-blue-400",
        border: "border-blue-500/20",
        label: "Completed",
      };
    case "CANCELLED":
      return {
        bg: "bg-white/5",
        text: "text-on-surface-variant",
        dot: "bg-on-surface-variant",
        border: "border-white/[0.06]",
        label: "Cancelled",
      };
    case "NO_SHOW":
      return {
        bg: "bg-red-500/10",
        text: "text-red-400",
        dot: "bg-red-400",
        border: "border-red-500/20",
        label: "No Show",
      };
    default:
      return {
        bg: "bg-white/5",
        text: "text-on-surface-variant",
        dot: "bg-on-surface-variant",
        border: "border-white/[0.06]",
        label: status,
      };
  }
};

export function TestDriveCard({
  booking,
  onCancel,
  cancelError,
  showActions = true,
  isPast = false,
  isAdmin = false,
  isCancelling = false,
  renderStatusSelector = () => null,
}: {
  booking: ExtendedTestDriveBooking;
  onCancel?: (bookingId: string) => Promise<void>;
  showActions?: boolean;
  isPast?: boolean;
  isAdmin?: boolean;
  isCancelling?: boolean;
  cancelError?: string | null;
  renderStatusSelector?: () => React.ReactNode;
}) {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const statusConfig = getStatusConfig(booking.status);

  const handleCancel = async () => {
    if (!onCancel) return;
    await onCancel(booking.id);
    setCancelDialogOpen(false);
  };

  // Admin compact layout
  if (isAdmin) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500 ${
            isPast ? "opacity-50 hover:opacity-100" : ""
          }`}
        >
          {/* Hover glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 p-5 sm:p-6">
            {/* Top row: Car + Status */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4 min-w-0">
                {/* Image */}
                <div className="w-24 h-20 rounded-xl overflow-hidden bg-white/[0.02] flex-shrink-0 relative">
                  {booking?.car?.images && booking.car.images.length > 0 ? (
                    <CarImage
                      src={booking.car.images[0]}
                      alt={`${booking.car.company} ${booking.car.model}`}
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car className="w-7 h-7 text-on-surface-variant/20" />
                    </div>
                  )}
                  {/* Year badge */}
                  <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm">
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] text-white/80">
                      {booking.car.year}
                    </span>
                  </div>
                </div>

                {/* Car Info */}
                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-on-surface truncate group-hover:text-primary/90 transition-colors duration-300">
                    {booking.car.company} {booking.car.model}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {booking.car.color && (
                      <span className="text-on-surface-variant/60 font-[family-name:var(--font-jakarta)] text-sm">
                        {booking.car.color}
                      </span>
                    )}
                    {booking.car.color && booking.user && (
                      <span className="text-on-surface-variant/30">·</span>
                    )}
                    {booking.user && (
                      <div className="flex items-center gap-1.5 text-on-surface-variant/60">
                        <User className="w-3.5 h-3.5" />
                        <span className="font-[family-name:var(--font-jakarta)] text-sm truncate max-w-[180px]">
                          {booking.user.name || booking.user.email}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status badge */}
              <div
                className={`flex-shrink-0 px-3 py-1.5 rounded-full ${statusConfig.bg} border ${statusConfig.border}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${statusConfig.dot} animate-pulse`}
                  />
                  <span
                    className={`font-[family-name:var(--font-jetbrains-mono)] text-[11px] ${statusConfig.text}`}
                  >
                    {statusConfig.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Details row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4">
              <div className="flex items-center gap-2 text-on-surface-variant/60">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="font-[family-name:var(--font-jakarta)] text-sm">
                  {format(new Date(booking.bookingDate), "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant/60">
                <div className="p-1.5 rounded-lg bg-secondary/10">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                </div>
                <span className="font-[family-name:var(--font-jakarta)] text-sm">
                  {formatTime(booking.startTime)} –{" "}
                  {formatTime(booking.endTime)}
                </span>
              </div>
              {booking.notes && (
                <div className="flex items-center gap-2 text-on-surface-variant/40">
                  <FileText className="w-3.5 h-3.5" />
                  <span className="font-[family-name:var(--font-jakarta)] text-sm truncate max-w-[250px]">
                    {booking.notes}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom row: Status selector + Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-white/[0.04]">
              {/* Status selector */}
              <div className="flex-1">
                {renderStatusSelector()}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/cars/${booking.carId}`}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-primary/10 hover:border-primary/20 text-on-surface-variant hover:text-primary font-[family-name:var(--font-jakarta)] text-sm transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">View</span>
                </Link>

                {showActions &&
                  (booking.status === "PENDING" ||
                    booking.status === "CONFIRMED") && (
                    <button
                      onClick={() => setCancelDialogOpen(true)}
                      disabled={isCancelling}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/30 text-red-400 font-[family-name:var(--font-jakarta)] text-sm transition-all duration-300 disabled:opacity-50"
                    >
                      {isCancelling ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Cancel</span>
                        </>
                      )}
                    </button>
                  )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cancel Dialog */}
        <AnimatePresence>
          {onCancel && cancelDialogOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setCancelDialogOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-sm"
              >
                <div className="relative rounded-2xl border border-white/[0.06] bg-surface overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] via-transparent to-transparent" />
                  <div className="relative z-10 p-5">
                    <button
                      onClick={() => setCancelDialogOpen(false)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/[0.05] text-on-surface-variant hover:text-on-surface transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                      </div>
                    </div>

                    <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-on-surface text-center mb-1">
                      Cancel Booking
                    </h3>
                    <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-xs text-center mb-4">
                      Cancel test drive for{" "}
                      <span className="text-on-surface font-medium">
                        {booking.car.year} {booking.car.company}{" "}
                        {booking.car.model}
                      </span>
                      ?
                    </p>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-on-surface-variant flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(booking.bookingDate), "MMM d")}
                        </span>
                        <span className="text-on-surface-variant flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {formatTime(booking.startTime)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setCancelDialogOpen(false)}
                        disabled={isCancelling}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] text-on-surface font-[family-name:var(--font-jakarta)] text-xs font-medium transition-all duration-300"
                      >
                        Keep
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isCancelling}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 font-[family-name:var(--font-jakarta)] text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1.5"
                      >
                        {isCancelling ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          "Cancel"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Public/user layout (unchanged from before)
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-500 ${
          isPast ? "opacity-60 hover:opacity-100" : ""
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/[0.04] rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative z-10 flex flex-col lg:flex-row">
          {/* Car Image */}
          <div className="lg:w-[280px] relative h-56 lg:h-auto overflow-hidden">
            {booking?.car?.images && booking.car.images.length > 0 ? (
              <div className="relative w-full h-full">
                <CarImage
                  src={booking.car.images[0]}
                  alt={`${booking.car.company} ${booking.car.model}`}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 280px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface/80 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent lg:hidden" />
              </div>
            ) : (
              <div className="w-full h-full bg-white/[0.02] flex items-center justify-center">
                <Car className="h-16 w-16 text-on-surface-variant/20" />
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4"
            >
              <div
                className={`px-3 py-1.5 rounded-full ${statusConfig.bg} backdrop-blur-md border ${statusConfig.border}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} animate-pulse`}
                  />
                  <span
                    className={`font-[family-name:var(--font-jetbrains-mono)] text-xs ${statusConfig.text}`}
                  >
                    {statusConfig.label}
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="absolute bottom-4 left-4 hidden sm:block">
              <div className="px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/[0.1]">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-white/80">
                  {booking?.car?.year}
                </span>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="flex-1 p-5 sm:p-6 lg:p-7">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface group-hover:text-primary/90 transition-colors duration-300">
                  {booking?.car?.company} {booking?.car?.model}
                </h3>
                {booking?.car?.color && (
                  <p className="text-on-surface-variant/60 font-[family-name:var(--font-jakarta)] text-sm mt-1">
                    {booking.car.color}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {booking?.car?.fuelType && (
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-on-surface-variant uppercase tracking-wider">
                    {booking.car.fuelType}
                  </span>
                )}
                {booking?.car?.transmission && (
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-on-surface-variant uppercase tracking-wider">
                    {booking.car.transmission}
                  </span>
                )}
              </div>
            </div>

            {renderStatusSelector()}

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-on-surface-variant/50 uppercase tracking-wider mb-0.5">
                    Date
                  </p>
                  <span className="font-[family-name:var(--font-jakarta)] text-sm text-on-surface">
                    {format(new Date(booking?.bookingDate), "MMM d, yyyy")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-secondary/10">
                  <Clock className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-on-surface-variant/50 uppercase tracking-wider mb-0.5">
                    Time
                  </p>
                  <span className="font-[family-name:var(--font-jakarta)] text-sm text-on-surface">
                    {formatTime(booking?.startTime)} –{" "}
                    {formatTime(booking?.endTime)}
                  </span>
                </div>
              </div>
            </div>

            {booking?.notes && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-3.5 h-3.5 text-on-surface-variant/40" />
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-on-surface-variant/50 uppercase tracking-wider">
                    Notes
                  </p>
                </div>
                <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm leading-relaxed">
                  {booking?.notes}
                </p>
              </motion.div>
            )}
          </div>

          {/* Actions */}
          {showActions && (
            <div className="p-5 sm:p-6 lg:p-7 border-t lg:border-t-0 lg:border-l border-white/[0.06] lg:w-56 flex flex-row lg:flex-col gap-3 justify-end lg:justify-center">
              <Link
                href={`/cars/${booking?.carId}`}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-primary/10 hover:border-primary/20 text-on-surface hover:text-primary font-[family-name:var(--font-jakarta)] text-sm font-medium transition-all duration-300 group/btn"
              >
                View Car
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
              {(booking.status === "PENDING" ||
                booking.status === "CONFIRMED") && (
                <button
                  onClick={() => setCancelDialogOpen(true)}
                  disabled={isCancelling}
                  className="flex-1 lg:flex-none px-5 py-3.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/30 text-red-400 font-[family-name:var(--font-jakarta)] text-sm font-medium transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isCancelling ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Cancel"
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Cancel Dialog - User view */}
      <AnimatePresence>
        {onCancel && cancelDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setCancelDialogOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-md"
            >
              <div className="relative rounded-3xl border border-white/[0.06] bg-surface overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] via-transparent to-transparent" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/[0.06] rounded-full blur-[80px]" />

                <div className="relative z-10 p-6">
                  <button
                    onClick={() => setCancelDialogOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/[0.05] text-on-surface-variant hover:text-on-surface transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex justify-center mb-5">
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                    </div>
                  </div>

                  <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface text-center mb-2">
                    Cancel Test Drive
                  </h3>
                  <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm text-center mb-6">
                    Are you sure you want to cancel your test drive for the{" "}
                    <span className="text-on-surface font-medium">
                      {booking.car.year} {booking.car.company}{" "}
                      {booking.car.model}
                    </span>
                    ?
                  </p>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] mb-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <Calendar className="w-4 h-4" />
                          <span>Date</span>
                        </div>
                        <span className="text-on-surface font-[family-name:var(--font-jakarta)] font-medium">
                          {format(new Date(booking.bookingDate), "MMMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <Clock className="w-4 h-4" />
                          <span>Time</span>
                        </div>
                        <span className="text-on-surface font-[family-name:var(--font-jakarta)] font-medium">
                          {formatTime(booking.startTime)} –{" "}
                          {formatTime(booking.endTime)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setCancelDialogOpen(false)}
                      disabled={isCancelling}
                      className="flex-1 px-5 py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] text-on-surface font-[family-name:var(--font-jakarta)] text-sm font-medium transition-all duration-300"
                    >
                      Keep Reservation
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isCancelling}
                      className="flex-1 px-5 py-3.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 text-red-400 font-[family-name:var(--font-jakarta)] text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {isCancelling ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Cancelling...
                        </>
                      ) : (
                        "Cancel Booking"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
