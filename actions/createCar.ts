"use server";
import { handleActionError, serverActionResponse } from "@/lib/action-utils";
import { db } from "@/lib/prismadb";
import { extractErrorMessages, stripNumericUnits } from "@/lib/utils";

import { clearCarFilterCache } from "@/actions/getFilteredCars";
import { carFormSchema } from "@/lib/zod-validation-schemas";
import { z } from "zod";

export default async function createCar(values: z.infer<typeof carFormSchema>) {
  const {
    company,
    model,
    year,
    price,
    mileage,
    color,
    fuelType,
    transmission,
    bodyType,
    seats,
    description,
    featured,
    images,
  } = values;
  // validate the form
  const validatedFields = carFormSchema.safeParse(values);
  if (!validatedFields.success) {
    const message = extractErrorMessages(
      validatedFields.error.flatten().fieldErrors
    );
    return serverActionResponse(message, false, 400);
  }

  try {
    const cleanYear = parseInt(stripNumericUnits(year, { integerOnly: true }));
    const cleanPrice = parseFloat(stripNumericUnits(price));
    const cleanMileage = parseInt(stripNumericUnits(mileage, { integerOnly: true }));
    const cleanSeats = seats ? parseInt(stripNumericUnits(seats, { integerOnly: true })) : null;

    // create the car
    const car = await db.car.create({
      data: {
        company,
        model,
        year: cleanYear,
        price: cleanPrice,
        mileage: cleanMileage,
        color,
        fuelType,
        transmission,
        bodyType,
        seats: cleanSeats,
        description,
        featured,
        images,
      },
    });
    clearCarFilterCache();
    return serverActionResponse("Car created successfully", true, 201, car);
  } catch (error) {
    return handleActionError(error);
  }
}
