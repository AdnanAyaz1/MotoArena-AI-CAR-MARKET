"use client";
import { testDriveSchema } from "@/lib/zod-validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2, Calendar, Clock, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { SelectItem } from "../ui/select";
import { SelectContent } from "../ui/select";
import { SelectValue } from "../ui/select";
import { SelectTrigger } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Select } from "../ui/select";
import { ExtendedDelaersInfo } from "@/types/types";
import { bookTestDrive } from "@/actions/createTestDrive";
import { toast } from "react-toastify";
import { TestDriveBooking } from "@prisma/client";
import { redirect } from "next/navigation";

interface AvailableSlotsType {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
}

const TestDriveForm = ({
  dealersInfo,
  carId,
  testDriveBookings,
}: {
  dealersInfo: ExtendedDelaersInfo;
  carId: string;
  testDriveBookings: TestDriveBooking[];
}) => {
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<
    AvailableSlotsType[]
  >([]);

  const form = useForm<z.infer<typeof testDriveSchema>>({
    resolver: zodResolver(testDriveSchema),
    defaultValues: {
      date: new Date(),
      timeSlot: "",
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof testDriveSchema>) => {
    setBookingInProgress(true);
    const [startTime, endTime] = values?.timeSlot?.split("-");
    const response = await bookTestDrive({
      carId: carId,
      bookingDate: format(values.date, "yyyy-MM-dd"),
      startTime,
      endTime,
      notes: values.notes || "",
    });
    if (response?.success) {
      toast.success(response?.message);
      redirect("/reservations");
    } else {
      toast.error(response?.message);
    }
    setBookingInProgress(false);
  };

  const errors = form.formState.errors;

  const selectedDate = form.watch("date");

  const isDayDisabled = (date: Date) => {
    const today = new Date();
    if (date < today) {
      return true;
    }
    const dayOfWeek = format(date, "EEEE").toUpperCase();
    const daySchedule = dealersInfo?.workingHours?.find(
      (schedule) => schedule.dayOfWeek === dayOfWeek
    );
    return !daySchedule || daySchedule.isClosed;
  };

  useEffect(() => {
    if (!selectedDate || !dealersInfo?.workingHours) return;

    const selectedDayOfWeek = format(selectedDate, "EEEE").toUpperCase();

    const daySchedule = dealersInfo.workingHours.find(
      (day) => day.dayOfWeek === selectedDayOfWeek
    );

    if (!daySchedule || daySchedule.isClosed) {
      setAvailableTimeSlots([]);
      return;
    }

    const openHour = parseInt(daySchedule.openTime.split(":")[0]);
    const closeHour = parseInt(daySchedule.closeTime.split(":")[0]);

    const slots = [];
    for (let hour = openHour; hour < closeHour; hour++) {
      const startTime = `${hour.toString().padStart(2, "0")}:00`;
      const endTime = `${(hour + 1).toString().padStart(2, "0")}:00`;

      const isBooked = testDriveBookings.some((booking) => {
        return (
          format(new Date(booking.bookingDate), "yyyy-MM-dd") ===
            format(selectedDate, "yyyy-MM-dd") &&
          (booking.startTime === startTime || booking.endTime === endTime)
        );
      });

      if (!isBooked) {
        slots.push({
          id: `${startTime}-${endTime}`,
          label: `${startTime} - ${endTime}`,
          startTime,
          endTime,
        });
      }
    }

    setAvailableTimeSlots(slots);
    form.setValue("timeSlot", "");
  }, [selectedDate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Date Field */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-on-surface font-[family-name:var(--font-sora)] text-sm font-semibold">
                <Calendar className="w-4 h-4 text-primary" />
                Select Date
              </FormLabel>
              <FormControl>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.10] transition-all duration-300 font-[family-name:var(--font-jakarta)] text-sm",
                          !field.value && "text-on-surface-variant"
                        )}
                      >
                        <span className={field.value ? "text-on-surface" : ""}>
                          {field.value
                            ? format(field.value, "EEEE, MMM d, yyyy")
                            : "Pick a date"}
                        </span>
                        <CalendarIcon className="h-4 w-4 text-on-surface-variant" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#1a2024] border border-white/[0.08]">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={isDayDisabled}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && (
                    <p className="text-sm font-medium text-red-500 mt-2 font-[family-name:var(--font-jakarta)]">
                      {errors.date.message}
                    </p>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Time Slot Field */}
        <FormField
          control={form.control}
          name="timeSlot"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-on-surface font-[family-name:var(--font-sora)] text-sm font-semibold">
                <Clock className="w-4 h-4 text-primary" />
                Select Time Slot
              </FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={availableTimeSlots.length === 0}
                >
                  <SelectTrigger className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.10] transition-all duration-300 font-[family-name:var(--font-jakarta)] text-sm">
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a2024] border border-white/[0.08]">
                    {availableTimeSlots.map((slot) => (
                      <SelectItem
                        key={slot.id}
                        value={slot.id}
                        className="font-[family-name:var(--font-jakarta)] text-sm focus:bg-primary/10 focus:text-primary"
                      >
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {availableTimeSlots.length === 0 && (
                <p className="text-on-surface-variant text-xs font-[family-name:var(--font-jakarta)] mt-2">
                  No available slots for this date. Please select another date.
                </p>
              )}
              {errors.timeSlot && (
                <p className="text-sm font-medium text-red-500 mt-2 font-[family-name:var(--font-jakarta)]">
                  {errors.timeSlot.message}
                </p>
              )}
            </FormItem>
          )}
        />

        {/* Notes Field */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-on-surface font-[family-name:var(--font-sora)] text-sm font-semibold">
                <MessageSquare className="w-4 h-4 text-primary" />
                Additional Notes
                <span className="text-on-surface-variant font-normal">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Any specific questions or requests for your test drive?"
                  className="min-h-28 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.10] focus:border-primary/40 focus:bg-white/[0.04] transition-all duration-300 font-[family-name:var(--font-jakarta)] text-sm placeholder:text-on-surface-variant/50 resize-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={bookingInProgress}
          className="w-full py-4 rounded-xl gradient-bg text-black font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold uppercase tracking-widest hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {bookingInProgress ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Booking Your Test Drive...
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              Book Test Drive
            </>
          )}
        </button>
      </form>
    </Form>
  );
};

export default TestDriveForm;
