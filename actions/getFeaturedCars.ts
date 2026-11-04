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
