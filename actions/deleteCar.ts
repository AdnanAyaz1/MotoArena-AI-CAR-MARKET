"use server";

import { serverActionResponse, handleActionError } from "@/lib/action-utils";
import { db } from "@/lib/prismadb";
import { clearCarFilterCache } from "@/actions/getFilteredCars";

export const deleteCar = async (carId: string) => {
  try {
    await db.car.delete({ where: { id: carId } });
    clearCarFilterCache();
    return serverActionResponse("Car deleted successfully", true, 200);
  } catch (error) {
    return handleActionError(error);
  }
};
