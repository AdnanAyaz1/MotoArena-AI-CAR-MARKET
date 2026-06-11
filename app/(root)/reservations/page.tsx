import { getUserReservations } from "@/actions/getUserReservations";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import { ExtendedTestDriveBooking } from "@/types/types";
import AnimatedReservations from "@/components/AnimatedReservations";

const Reservations = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/reservations");
  }
  const { data: userTestDrives } = await getUserReservations(
    session?.user?.id as string
  );

  return (
    <AnimatedReservations
      initialData={userTestDrives as ExtendedTestDriveBooking[]}
    />
  );
};

export default Reservations;
