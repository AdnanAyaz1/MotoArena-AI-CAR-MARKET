import { db } from "@/lib/prismadb";

export async function getFeaturedCars() {
  try {
    let cars = await db.car.findMany({
      where: {
        featured: true,
      },
      include: {
        savedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });

    cars.sort((a, b) => {
      const aImg = a.images[0]?.toLowerCase() || "";
      const bImg = b.images[0]?.toLowerCase() || "";
      const aIsFeature = aImg.includes("feature");
      const bIsFeature = bImg.includes("feature");

      if (aIsFeature && bIsFeature) {
        return aImg.localeCompare(bImg);
      }
      if (aIsFeature) return -1;
      if (bIsFeature) return 1;
      return 0;
    });

    if (cars.length === 0) {
      cars = await db.car.findMany({
        take: 3,
        include: {
          savedBy: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return cars;
  } catch (error) {
    console.error("Failed to fetch featured cars:", error);
    return [];
  }
}
