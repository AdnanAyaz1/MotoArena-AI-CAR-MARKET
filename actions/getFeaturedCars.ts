import { db } from "@/lib/prismadb";
import { unstable_cache } from "next/cache";

export const getFeaturedCars = unstable_cache(
  async () => {
    const cars = await db.car.findMany({
      where: {
        featured: true,
      },
      include: {
        savedBy: true,
      },
    });
    return cars;
  },
  ["featured-cars"],
  { tags: ["featured-cars"] }
);