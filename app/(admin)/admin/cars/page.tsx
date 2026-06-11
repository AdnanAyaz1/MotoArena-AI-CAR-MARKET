import React from "react";
import CarsList from "./components/CarsList";
import AdminPageHeader from "@/components/AdminPageHeader";

export const metadata = {
  title: "Cars | Motoverse Admin",
  description: "Manage cars in your marketplace",
};

const CarsPage = () => {
  return (
    <div className="px-6 md:px-10 max-w-[1400px]">
      <AdminPageHeader label="Inventory" title="Cars Management" />
      <CarsList />
    </div>
  );
};

export default CarsPage;
