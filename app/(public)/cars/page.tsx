import { getCarFilters } from "@/actions/getCarFilters";
import { getFilteredCars } from "@/actions/getFilteredCars";
import CarFiltersWithClear from "@/components/Filters/CarFiltersWithClear";
import { CarFiltersProps } from "@/components/Filters/CarFilters";
import CarsPageHeader from "@/components/CarsPageHeader";
import { PaginationComponent } from "@/components/Pagination";
import { ExtendedCar } from "@/types/types";
import { FilterProvider } from "@/components/Filters/FilterContext";
import FilterProgressBar from "@/components/Filters/FilterProgressBar";
import CarsListingsSection from "@/components/CarsListingsSection";

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
    <FilterProvider>
      <div className="min-h-screen">
        <FilterProgressBar />

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
              <CarsListingsSection
                cars={cars as ExtendedCar[] | undefined}
                search={search}
              />
            </div>
          </div>

          {/* Pagination */}
          {noOfPages && noOfPages > 1 ? (
            <PaginationComponent noOfPages={noOfPages} />
          ) : null}
        </div>
      </div>
    </FilterProvider>
  );
};

export default Cars;
