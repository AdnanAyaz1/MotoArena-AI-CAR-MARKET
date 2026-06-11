"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Search,
  CalendarRange,
  AlertCircle,
} from "lucide-react";
import { TestDriveCard } from "@/components/Cards/TestDriveCard";
import { ExtendedTestDriveBooking } from "@/types/types";
import { handleTestDriveStatus } from "@/actions/handleTestDriveStatus";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { StatusSelector, statusFilterOptions } from "@/components/StatusSelector";

export const TestDrivesList = ({
  testDrives,
  success,
}: {
  testDrives: ExtendedTestDriveBooking[];
  success: boolean;
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFilter("search", search);
  };

  useEffect(() => {
    setTimeout(() => {
      handleFilter("search", search);
    }, 300);
  }, [search]);

  const handleFilter = (type: string, value: string) => {
    if (type === "status") setStatusFilter(value);

    if (value === "all" || value === "") {
      params.delete(type);
    } else if (params.get(type) !== value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    setUpdatingStatus(true);
    if (newStatus) {
      const res = await handleTestDriveStatus(
        bookingId,
        newStatus as
          | "PENDING"
          | "CONFIRMED"
          | "COMPLETED"
          | "CANCELLED"
          | "NO_SHOW"
      );
      if (res?.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update test drive status");
      }
      setUpdatingStatus(false);
    }
  };

  const handleCancel = async (bookingId: string) => {
    setCancelling(true);
    const res = await handleTestDriveStatus(bookingId, "CANCELLED");
    if (res?.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res?.message || "Failed to cancel test drive");
    }
    setCancelling(false);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
      >
        {/* Status Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {statusFilterOptions.map((chip) => (
            <button
              key={chip.value}
              onClick={() => handleFilter("status", chip.value)}
              className={`px-4 py-2 rounded-xl font-[family-name:var(--font-jakarta)] text-xs font-medium transition-all duration-300 ${
                (statusFilter === chip.value ||
                  (!statusFilter && chip.value === "all"))
                  ? "gradient-bg text-black"
                  : "border border-white/[0.06] bg-white/[0.02] text-on-surface-variant hover:bg-white/[0.05] hover:text-on-surface"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto sm:ml-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
            <input
              type="search"
              placeholder="Search by car or customer..."
              className="w-full sm:w-72 pl-11 pr-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-on-surface font-[family-name:var(--font-jakarta)] text-sm placeholder:text-on-surface-variant/40 focus:border-primary/50 hover:bg-white/[0.04] focus:bg-white/[0.04] transition-all duration-300 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </motion.div>

      {/* Content */}
      {!success ? (
        <div className="relative rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400 font-[family-name:var(--font-jakarta)]">
              Failed to load test drives. Please try again.
            </p>
          </div>
        </div>
      ) : testDrives?.length === 0 ? (
        <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent" />
          <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="p-4 rounded-2xl bg-primary/10 mb-6">
              <CalendarRange className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface mb-2">
              No Test Drives Found
            </h3>
            <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm max-w-md">
              {statusFilter || search
                ? "No test drives match your search criteria."
                : "There are no test drive bookings yet."}
            </p>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {testDrives?.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={openDropdownId === booking.id ? "relative z-50" : "relative z-0"}
            >
              <TestDriveCard
                booking={booking}
                onCancel={handleCancel}
                showActions={["PENDING", "CONFIRMED"].includes(booking.status)}
                isAdmin={true}
                isCancelling={cancelling}
                cancelError={cancelError}
                renderStatusSelector={() => (
                  <StatusSelector
                    currentStatus={booking.status}
                    bookingId={booking.id}
                    onUpdate={handleUpdateStatus}
                    disabled={updatingStatus}
                    onOpenChange={(isOpen) => setOpenDropdownId(isOpen ? booking.id : null)}
                  />
                )}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
