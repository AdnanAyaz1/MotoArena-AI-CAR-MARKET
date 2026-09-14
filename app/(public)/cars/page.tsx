import { getCarFilters } from "@/actions/getCarFilters";
import { getFilteredCars } from "@/actions/getFilteredCars";
import CarCard from "@/components/Cards/CarCard";
import CarFiltersWithClear from "@/components/Filters/CarFiltersWithClear";
import { CarFiltersProps } from "@/components/Filters/CarFilters";
import ClearSearchButtons from "@/components/Filters/ClearSearchButtons";
import CarsPageHeader from "@/components/CarsPageHeader";
import EmptyState from "@/components/EmptyState";
import { PaginationComponent } from "@/components/Pagination";
import { CarGridSkeleton } from "@/components/Skeletons";
import { ExtendedCar } from "@/types/types";
import React, { Suspense } from "react";

export interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Cars = async ({ searchParams }: SearchParams) => {
  const {
    company,
    bodyType,
    fuelType,
    transmission,
    minPrice,
    maxPrice,
    sort,
    search,
    page = "1",
  } = await searchParams;

  const { data } = await getCarFilters();
  const {
    data: cars,
    noOfPages,
    success,
  } = await getFilteredCars({
    company,
    bodyType,
    fuelType,
    transmission,
    minPrice: Number(minPrice),
    maxPrice: Number(maxPrice),
    sort: sort || "oldest",
    page: Number(page),
    search: search,
  });

  const totalCars = cars?.length || 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <CarsPageHeader search={search} totalCars={totalCars} />

      {/* Main content */}
      <div className="px-5 md:px-16 max-w-[1440px] mx-auto pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-28">
              <CarFiltersWithClear
                filters={data as CarFiltersProps}
                search={search || ""}
              />
            </div>
          </div>

          {/* Car Listings */}
          <div className="flex-1">
            {search && cars && cars.length === 0 ? (
              <div className="text-center py-16">
                <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-12 overflow-hidden">
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/[0.04] rounded-full blur-[80px]" />

                  <div className="relative z-10">
                    <h3 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-on-surface mb-3">
                      No matching cars found
                    </h3>
                    <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] mb-6 max-w-md mx-auto">
                      No cars match your search for &ldquo;{search}&rdquo; with
                      the current filters. Try adjusting your search or filters.
                    </p>
                    <ClearSearchButtons search={search} />
                  </div>
                </div>
              </div>
            ) : cars && cars.length > 0 ? (
              <Suspense fallback={<CarGridSkeleton count={6} />}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cars.map((car, index) => (
                    <CarCard
                      key={car.id}
                      car={car as ExtendedCar}
                      index={index}
                    />
                  ))}
                </div>
              </Suspense>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>

        {/* Pagination */}
        {noOfPages && noOfPages > 1 ? (
          <PaginationComponent noOfPages={noOfPages} />
        ) : null}
      </div>
    </div>
  );
};

export default Cars;
