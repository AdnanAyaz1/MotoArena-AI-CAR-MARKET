import { db } from "@/lib/prismadb";
import { unstable_cache } from "next/cache";

export const getFeaturedCars = unstable_cache(
  async () => {
    return db.car.findMany({
      where: {
        featured: true,
      },
      include: {
        savedBy: true,
      },
    });
  },
  ["featured-cars"],
  {
    tags: ["featured-cars"],
  }
);