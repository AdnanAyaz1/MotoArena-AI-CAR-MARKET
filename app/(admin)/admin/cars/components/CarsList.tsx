"use client";
import { deleteCar } from "@/actions/deleteCar";
import { getCars } from "@/actions/getCars";
import { handleServerActionResponse } from "@/lib/action-utils";
import { Car } from "@prisma/client/edge";
import {
  CarIcon,
  FilterIcon,
  Loader2,
  Plus,
  Search,
  Trash2,
  Eye,
  Star,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CarImage from "@/components/CardImages/CarImage";
import Link from "next/link";

const CarsList = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [carsData, setCarsData] = useState<Car[]>([]);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deletingCar, setDeletingCar] = useState<boolean>(false);
  const [priceFilterState, setPriceFilterState] = useState<boolean>(false);
  const [yearFilterState, setYearFilterState] = useState<boolean>(false);
  const [featuredState, setFeaturedState] = useState<boolean>(false);
  const [originalCarsData, setOriginalCarsData] = useState<Car[]>([]);
  const [statusFilter, setStatusFilter] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newData = originalCarsData.filter((car) => {
      return (
        car.company.toLowerCase().includes(search.toLowerCase()) ||
        car.model.toLowerCase().includes(search.toLowerCase())
      );
    });
    setCarsData(newData);
  };

  const fetchCars = async () => {
    setIsLoading(true);
    const cars = await getCars();
    setCarsData(cars);
    setOriginalCarsData(cars);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDeleteCar = async () => {
    if (!carToDelete) return;
    setDeletingCar(true);
    const response = await deleteCar(carToDelete.id);
    handleServerActionResponse(response);
    setCarsData(carsData.filter((car) => car.id !== carToDelete.id));
    setDeleteDialogOpen(false);
    setCarToDelete(null);
    setDeletingCar(false);
  };

  const handleFilter = async (type: string) => {
    if (type === "price") {
      const order = priceFilterState ? "dec" : "asc";
      setPriceFilterState((pre) => !pre);
      const newData = carsData.sort((a, b) => {
        return order === "dec"
          ? Number(b.price) - Number(a.price)
          : Number(a.price) - Number(b.price);
      });
      setCarsData(newData);
    } else if (type === "year") {
      const order = !yearFilterState ? "dec" : "asc";
      setYearFilterState((pre) => !pre);
      const newData = carsData.sort((a, b) => {
        return order === "dec"
          ? Number(b.year) - Number(a.year)
          : Number(a.year) - Number(b.year);
      });
      setCarsData(newData);
    } else if (type === "feature") {
      const state = !featuredState;
      let newData = originalCarsData.filter((car) => car.featured !== state);
      if (statusFilter) {
        newData = newData.filter(
          (car) => car.status.toLowerCase() === currentStatus
        );
      }
      setCarsData(newData);
      setFeaturedState(state);
    } else {
      setStatusFilter(true);
      const newData = originalCarsData.filter(
        (car) => car.status.toLowerCase() === type
      );
      setCurrentStatus(type);
      setCarsData(newData);
    }
  };

  const handleRestoreFilters = async () => {
    await fetchCars();
    setPriceFilterState(false);
    setYearFilterState(false);
    setFeaturedState(false);
    setStatusFilter(false);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-emerald-500/10 text-emerald-400";
      case "UNAVAILABLE":
        return "bg-amber-500/10 text-amber-400";
      case "SOLD":
        return "bg-red-500/10 text-red-400";
      default:
        return "bg-white/5 text-on-surface-variant";
    }
  };

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => router.push("/admin/cars/create")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl gradient-bg text-black font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            Add Car
          </button>
          <button
            onClick={handleRestoreFilters}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm transition-all duration-300"
          >
            Reset
          </button>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
            <input
              type="search"
              placeholder="Search cars..."
              className="w-full sm:w-72 pl-11 pr-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-on-surface font-[family-name:var(--font-jakarta)] text-sm placeholder:text-on-surface-variant/40 focus:border-primary/50 hover:bg-white/[0.04] focus:bg-white/[0.04] transition-all duration-300 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </motion.div>

      {/* Filter Chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap gap-2"
      >
        {[
          { label: "All", active: !statusFilter, onClick: handleRestoreFilters },
          {
            label: "Available",
            active: statusFilter && currentStatus === "available",
            onClick: () => handleFilter("available"),
          },
          {
            label: "Unavailable",
            active: statusFilter && currentStatus === "unavailable",
            onClick: () => handleFilter("unavailable"),
          },
          {
            label: "Sold",
            active: statusFilter && currentStatus === "sold",
            onClick: () => handleFilter("sold"),
          },
          {
            label: "Featured",
            active: featuredState,
            onClick: () => handleFilter("feature"),
          },
        ].map((chip) => (
          <button
            key={chip.label}
            onClick={chip.onClick}
            className={`px-4 py-2 rounded-xl font-[family-name:var(--font-jakarta)] text-xs font-medium transition-all duration-300 ${
              chip.active
                ? "gradient-bg text-black"
                : "border border-white/[0.06] bg-white/[0.02] text-on-surface-variant hover:bg-white/[0.05] hover:text-on-surface"
            }`}
          >
            {chip.label}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
          <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm">
            Loading cars...
          </p>
        </div>
      ) : carsData.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant/50 uppercase tracking-wider">
                    Car
                  </th>
                  <th
                    className="text-left px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant/50 uppercase tracking-wider cursor-pointer hover:text-on-surface transition-colors"
                    onClick={() => handleFilter("year")}
                  >
                    <div className="flex items-center gap-2">
                      Year
                      <FilterIcon
                        className={`w-3 h-3 ${yearFilterState ? "rotate-180" : ""}`}
                      />
                    </div>
                  </th>
                  <th
                    className="text-left px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant/50 uppercase tracking-wider cursor-pointer hover:text-on-surface transition-colors"
                    onClick={() => handleFilter("price")}
                  >
                    <div className="flex items-center gap-2">
                      Price
                      <FilterIcon
                        className={`w-3 h-3 ${priceFilterState ? "rotate-180" : ""}`}
                      />
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant/50 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant/50 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="text-right px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant/50 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {carsData.map((car, index) => (
                  <motion.tr
                    key={car.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-300"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-xl overflow-hidden bg-white/[0.02] flex-shrink-0">
                          {car.images && car.images.length > 0 ? (
                            <CarImage
                              src={car.images[0]}
                              alt={`${car.company} ${car.model}`}
                              className="w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <CarIcon className="w-5 h-5 text-on-surface-variant/30" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-on-surface font-[family-name:var(--font-sora)] text-sm font-semibold">
                            {car.company} {car.model}
                          </p>
                          <p className="text-on-surface-variant/50 font-[family-name:var(--font-jakarta)] text-xs">
                            {car.color}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-on-surface font-[family-name:var(--font-jakarta)] text-sm">
                        {car.year}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-on-surface font-[family-name:var(--font-jakarta)] text-sm">
                        ${Number(car.price).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-[family-name:var(--font-jetbrains-mono)] ${getStatusStyle(car.status)}`}
                      >
                        {car.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {car.featured ? (
                        <Star className="w-4 h-4 text-tertiary fill-tertiary" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-white/[0.1]" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/cars/${car.id}`}
                          target="_blank"
                          className="p-2 rounded-lg hover:bg-white/[0.05] text-on-surface-variant hover:text-on-surface transition-all duration-300"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setCarToDelete(car);
                            setDeleteDialogOpen(true);
                          }}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-on-surface-variant hover:text-red-400 transition-all duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent" />
          <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="p-4 rounded-2xl bg-primary/10 mb-6">
              <CarIcon className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface mb-2">
              No Cars Found
            </h3>
            <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm mb-6 max-w-md">
              {search
                ? "No cars match your search criteria. Try a different search."
                : "Your inventory is empty. Add your first car to get started."}
            </p>
            <button
              onClick={() => router.push("/admin/cars/create")}
              className="px-6 py-3 rounded-xl gradient-bg text-black font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-300"
            >
              Add First Car
            </button>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDeleteDialogOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="relative rounded-3xl border border-white/[0.06] bg-surface overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] via-transparent to-transparent" />
              <div className="relative z-10 p-6">
                <button
                  onClick={() => setDeleteDialogOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/[0.05] text-on-surface-variant hover:text-on-surface transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex justify-center mb-5">
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                    <Trash2 className="w-8 h-8 text-red-400" />
                  </div>
                </div>

                <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface text-center mb-2">
                  Delete Car
                </h3>
                <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm text-center mb-6">
                  Are you sure you want to delete the{" "}
                  <span className="text-on-surface font-medium">
                    {carToDelete?.year} {carToDelete?.company}{" "}
                    {carToDelete?.model}
                  </span>
                  ? This action cannot be undone.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteDialogOpen(false)}
                    disabled={deletingCar}
                    className="flex-1 px-5 py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] text-on-surface font-[family-name:var(--font-jakarta)] text-sm font-medium transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteCar}
                    disabled={deletingCar}
                    className="flex-1 px-5 py-3.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 font-[family-name:var(--font-jakarta)] text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {deletingCar ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete Car"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CarsList;
