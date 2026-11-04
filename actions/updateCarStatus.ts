"use server";

import {
  handleActionError,
  serverActionResponse,
} from "@/lib/action-utils";

import { db } from "@/lib/prismadb";
import { CarStatus } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateCarStatus = async (
  carId: string,
  status: {
    featured?: boolean;
    status?: string;
  }
) => {
  try {
    const car = await db.car.update({
      where: {
        id: carId,
      },
      data: {
        featured: status.featured,
        status: status.status as CarStatus,
      },
    });

    // Revalidate the admin cars page.
    revalidatePath("/admin/cars");

    // Revalidate the homepage.
    revalidatePath("/");

    // Invalidate the featured cars cache.
    revalidateTag("featured-cars");

    return serverActionResponse(
      "Car status updated successfully",
      true,
      200,
      car
    );
  } catch (error) {
    return handleActionError(error);
  }
};