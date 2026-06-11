"use client";
import getDealershipInfo from "@/actions/createDealerShip";
import { saveWorkingHours } from "@/actions/handleWorkingHours";
import { WorkingHour } from "@prisma/client/edge";
import { Loader2, Clock, Save } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ManageWorkingHours = () => {
  const [dealershipWorkingHours, setDealershipWorkingHours] = useState<
    WorkingHour[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const getDealershipInfoMethod = async () => {
    setIsLoading(true);
    const res = await getDealershipInfo();
    if (res?.success) {
      setDealershipWorkingHours(res?.data?.workingHours as WorkingHour[]);
    } else {
      toast.error(`${res.message}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDealershipInfoMethod();
  }, []);

  const handleTimeChange = (
    dayOfWeek: string,
    openTime?: string,
    closeTime?: string,
    isClosed?: boolean
  ) => {
    if (isClosed === true || isClosed === false) {
      const newData = dealershipWorkingHours.map((val) =>
        val.dayOfWeek === dayOfWeek ? { ...val, isClosed } : val
      );
      setDealershipWorkingHours(newData);
    }
    if (openTime) {
      const newData = dealershipWorkingHours.map((val) =>
        val.dayOfWeek === dayOfWeek ? { ...val, openTime } : val
      );
      setDealershipWorkingHours(newData);
    }
    if (closeTime) {
      const newData = dealershipWorkingHours.map((val) =>
        val.dayOfWeek === dayOfWeek ? { ...val, closeTime } : val
      );
      setDealershipWorkingHours(newData);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const response = await saveWorkingHours(
      dealershipWorkingHours as WorkingHour[]
    );
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Description */}
      <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm">
        Set the working hours for your business for each day of the week.
      </p>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
          <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm">
            Loading working hours...
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {dealershipWorkingHours?.map((val, index) => (
            <motion.div
              key={val.dayOfWeek}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5">
                {/* Day */}
                <div className="flex items-center gap-3 sm:w-40">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-[family-name:var(--font-sora)] text-sm font-bold text-on-surface">
                    {val.dayOfWeek}
                  </span>
                </div>

                {/* Toggle */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      handleTimeChange(val.dayOfWeek, "", "", !val.isClosed)
                    }
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                      val.isClosed
                        ? "bg-red-500/20 border border-red-500/30"
                        : "bg-emerald-500/20 border border-emerald-500/30"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 ${
                        val.isClosed
                          ? "left-0.5 bg-red-400"
                          : "left-[26px] bg-emerald-400"
                      }`}
                    />
                  </button>
                  <span
                    className={`font-[family-name:var(--font-jetbrains-mono)] text-xs ${
                      val.isClosed ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {val.isClosed ? "Closed" : "Open"}
                  </span>
                </div>

                {/* Times */}
                {val.isClosed ? (
                  <span className="text-on-surface-variant/50 font-[family-name:var(--font-jakarta)] text-sm sm:ml-4">
                    Closed all day
                  </span>
                ) : (
                  <div className="flex items-center gap-3 sm:ml-4">
                    <input
                      type="time"
                      value={val.openTime}
                      onChange={(e) =>
                        handleTimeChange(val.dayOfWeek, e.target.value, "")
                      }
                      className="px-3 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-on-surface font-[family-name:var(--font-jakarta)] text-sm focus:border-primary/50 hover:bg-white/[0.04] transition-all duration-300 outline-none"
                    />
                    <span className="text-on-surface-variant/50 font-[family-name:var(--font-jakarta)] text-sm">
                      to
                    </span>
                    <input
                      type="time"
                      value={val.closeTime}
                      onChange={(e) =>
                        handleTimeChange(val.dayOfWeek, "", e.target.value)
                      }
                      className="px-3 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-on-surface font-[family-name:var(--font-jakarta)] text-sm focus:border-primary/50 hover:bg-white/[0.04] transition-all duration-300 outline-none"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={isLoading || isSaving}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-bg text-black font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold uppercase tracking-wider hover:opacity-90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? "Saving..." : "Save Working Hours"}
        </button>
      </div>
    </div>
  );
};

export default ManageWorkingHours;
