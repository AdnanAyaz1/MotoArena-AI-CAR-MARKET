import React from "react";
import { getCarById } from "@/actions/getCarById";
import { Car, ArrowLeft, CheckCircle2, MapPin, Phone, Mail } from "lucide-react";
import { getDealerInfo } from "@/actions/getDealerInfo";
import TestDriveForm from "@/components/Forms/TestDriveForm";
import { TestDriveBooking } from "@prisma/client/edge";
import { ExtendedDelaersInfo } from "@/types/types";
import { getTestDriveBookings } from "@/actions/getTestDriveBookings";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import AnimatedTestDrivePage from "@/components/AnimatedTestDrivePage";

const TestDrivePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: car } = await getCarById(id);
  const { data: dealer } = await getDealerInfo();
  const { data: testDriveBookings } = await getTestDriveBookings(id);

  return (
    <AnimatedTestDrivePage
      car={car}
      dealer={dealer as ExtendedDelaersInfo}
      carId={id}
      testDriveBookings={testDriveBookings as TestDriveBooking[]}
    />
  );
};

export default TestDrivePage;
