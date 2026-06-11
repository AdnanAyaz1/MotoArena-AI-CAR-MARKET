import { getCarById } from "@/actions/getCarById";
import { notFound } from "next/navigation";
import { getDealerInfo } from "@/actions/getDealerInfo";
import { getTestDriveBookings } from "@/actions/getTestDriveBookings";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { TestDriveBooking, User } from "@prisma/client";
import AnimatedCarDetails from "@/components/AnimatedCarDetails";

interface CarPageProps {
  params: Promise<{ id: string }>;
}

const CarPage = async ({ params }: CarPageProps) => {
  const { id } = await params;
  const { data: car } = await getCarById(id);
  const dealerInfoResult = await getDealerInfo();
  const dealerInfo = dealerInfoResult.data ?? null;
  const { data: testDriveBookings } = await getTestDriveBookings(id);
  const { data: user } = await getCurrentUser();

  if (!car) {
    notFound();
  }

  return (
    <AnimatedCarDetails
      car={car}
      dealerInfo={dealerInfo}
      testDriveBookings={testDriveBookings as TestDriveBooking[]}
      user={user as User}
    />
  );
};

export default CarPage;
