import {
  handleActionError,
  ServerActionResponse,
  serverActionResponse,
} from "@/lib/action-utils";
import { db } from "@/lib/prismadb";
import { ExtendedCar } from "@/types/types";
import { Prisma } from "@prisma/client";

function scoreCar(car: ExtendedCar, query: string, terms: string[]) {
  const fullText = `${car.company} ${car.model}`.toLowerCase();
  const q = query.toLowerCase();
  let score = 0;

  if (fullText === q) score += 100;
  else if (fullText.includes(q)) score += 60;
  else if (car.model.toLowerCase().includes(q)) score += 40;
  else if (car.company.toLowerCase().includes(q)) score += 30;

  for (const term of terms) {
    const t = term.toLowerCase();
    if (car.model.toLowerCase().includes(t)) score += 25;
    if (car.company.toLowerCase().includes(t)) score += 20;
    if (car.bodyType.toLowerCase().includes(t)) score += 15;
    if (car.fuelType.toLowerCase().includes(t)) score += 15;
    if (car.color.toLowerCase().includes(t)) score += 10;
    if (String(car.year).includes(t)) score += 10;
    if (car.description.toLowerCase().includes(t)) score += 2;
  }
  return score;
}

export async function getFilteredCars(params: {
  company?: string;
  bodyType?: string;
  fuelType?: string;
  transmission?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  search?: string;
}): Promise<ServerActionResponse<ExtendedCar[]>> {
  try {
    const {
      company,
      bodyType,
      fuelType,
      transmission,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      search,
    } = params;

    const pageSize = 6;
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    const filterQuery: Prisma.CarWhereInput = {};
    filterQuery.status = "AVAILABLE";

    const searchTerms = search
      ? search.trim().split(/\s+/).filter(Boolean)
      : [];

    if (searchTerms.length > 0) {
      filterQuery.AND = searchTerms.map((term) => {
        const isNum = /^\d+$/.test(term);
        const termNum = isNum ? parseInt(term, 10) : null;
        const orConditions: Prisma.CarWhereInput[] = [
          { company: { contains: term, mode: "insensitive" } },
          { model: { contains: term, mode: "insensitive" } },
          { bodyType: { contains: term, mode: "insensitive" } },
          { fuelType: { contains: term, mode: "insensitive" } },
          { transmission: { contains: term, mode: "insensitive" } },
          { color: { contains: term, mode: "insensitive" } },
          { description: { contains: term, mode: "insensitive" } },
        ];
        if (termNum !== null && termNum > 1900 && termNum < 2100) {
          orConditions.push({ year: { equals: termNum } });
        }
        return { OR: orConditions };
      });
    }

    if (company) {
      filterQuery.company = { equals: company, mode: "insensitive" };
    }

    if (bodyType)
      filterQuery.bodyType = { equals: bodyType, mode: "insensitive" };
    if (fuelType)
      filterQuery.fuelType = { equals: fuelType, mode: "insensitive" };
    if (transmission)
      filterQuery.transmission = { equals: transmission, mode: "insensitive" };

    if (minPrice || maxPrice) {
      filterQuery.price = {};
      if (minPrice) {
        filterQuery.price.gte = minPrice;
      }
      if (maxPrice) {
        filterQuery.price.lte = maxPrice;
      }
    }

    let sortCriteria: Prisma.CarOrderByWithRelationInput = {};
    switch (sort) {
      case "priceAsc":
        sortCriteria = { price: "asc" };
        break;
      case "priceDesc":
        sortCriteria = { price: "desc" };
        break;
      case "newest":
        sortCriteria = { createdAt: "desc" };
        break;
      case "oldest":
      default:
        sortCriteria = { createdAt: "asc" };
        break;
    }

    if (searchTerms.length > 0) {
      let matchingCars = (await db.car.findMany({
        where: filterQuery,
        include: {
          savedBy: true,
        },
      })) as ExtendedCar[];

      if (matchingCars.length === 0 && searchTerms.length > 1) {
        const fallbackQuery = { ...filterQuery };
        const andList = Array.isArray(fallbackQuery.AND)
          ? fallbackQuery.AND
          : [];
        const orConditions = andList.flatMap(
          (c) => (c as Prisma.CarWhereInput).OR || []
        );
        delete fallbackQuery.AND;
        fallbackQuery.OR = orConditions;

        matchingCars = (await db.car.findMany({
          where: fallbackQuery,
          include: {
            savedBy: true,
          },
        })) as ExtendedCar[];
      }

      if (!sort || sort === "oldest") {
        matchingCars.sort(
          (a, b) =>
            scoreCar(b, search!.trim(), searchTerms) -
            scoreCar(a, search!.trim(), searchTerms)
        );
      } else {
        if (sort === "priceAsc") {
          matchingCars.sort((a, b) => a.price - b.price);
        } else if (sort === "priceDesc") {
          matchingCars.sort((a, b) => b.price - a.price);
        } else if (sort === "newest") {
          matchingCars.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
      }

      const totalCars = matchingCars.length;
      const noOfPages = Math.ceil(totalCars / limit);
      const paginatedCars = matchingCars.slice(skip, skip + limit);

      return serverActionResponse(
        "Cars fetched successfully",
        true,
        200,
        paginatedCars,
        noOfPages
      );
    }

    const totalCars = await db.car.count({ where: filterQuery });
    const noOfPages = Math.ceil(totalCars / limit);

    const cars = (await db.car.findMany({
      where: filterQuery,
      take: limit,
      skip,
      orderBy: sortCriteria,
      include: {
        savedBy: true,
      },
    })) as ExtendedCar[];

    return serverActionResponse(
      "Cars fetched successfully",
      true,
      200,
      cars,
      noOfPages
    );
  } catch (error) {
    return handleActionError(error);
  }
}
