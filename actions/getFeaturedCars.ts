import { db } from "@/lib/prismadb";
import { unstable_cache } from "next/cache";

export const getFeaturedCars = unstable_cache(
  async () => {
    try {
      return await db.car.findMany({
        where: {
          featured: true,
        },
        include: {
          savedBy: true,
        },
      });
    } catch (error) {
      console.error("Failed to fetch featured cars:", error);
      return [];
    }
  },
  ["featured-cars"],
  {
    tags: ["featured-cars"],
  }
);
