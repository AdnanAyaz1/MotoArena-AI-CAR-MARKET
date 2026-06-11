import { getAdminTestDrives } from "@/actions/getTestDriveBookings";
import { SearchParams } from "@/app/(root)/cars/page";
import { TestDrivesList } from "@/components/TestDriveList";
import { ExtendedTestDriveBooking } from "@/types/types";
import React from "react";
import AdminPageHeader from "@/components/AdminPageHeader";

const TestDrivesPage = async ({ searchParams }: SearchParams) => {
  const { status, search } = await searchParams;
  const { data: testDrives, success } = await getAdminTestDrives({
    status,
    search,
  });

  return (
    <div className="px-6 md:px-10 max-w-[1400px]">
      <AdminPageHeader label="Bookings" title="Test Drive Management" />
      <TestDrivesList
        testDrives={testDrives as ExtendedTestDriveBooking[]}
        success={success}
      />
    </div>
  );
};

export default TestDrivesPage;
