"use client";
import React from "react";
import { Calendar, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TestDriveBooking, User } from "@prisma/client";
import { format } from "date-fns";

const TestDriveButton = ({
  carId,
  user,
  testDriveBookings,
}: {
  carId: string;
  user: User;
  testDriveBookings: TestDriveBooking[];
}) => {
  const router = useRouter();

  const handleBookTestDrive = async () => {
    if (!user) {
      router.push(`/sign-in?callbackUrl=/test-drive/${carId}`);
      return;
    }
    router.push(`/test-drive/${carId}`);
  };

  const isBooked = testDriveBookings.some(
    (booking) => booking.userId === user?.id
  );

  return (
    <button
      onClick={handleBookTestDrive}
      disabled={isBooked}
      className={`w-full py-4 rounded-xl font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
        isBooked
          ? "bg-secondary/10 border border-secondary/20 text-secondary cursor-default"
          : "gradient-bg text-black hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
      }`}
    >
      {isBooked ? (
        <>
          <Check className="w-4 h-4" />
          Booked for {format(new Date(testDriveBookings[0].bookingDate), "MMM d, yyyy")}
        </>
      ) : (
        <>
          <Calendar className="w-4 h-4" />
          Book Test Drive
        </>
      )}
    </button>
  );
};

export default TestDriveButton;
