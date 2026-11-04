"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Heart } from "lucide-react";
import { saveCar } from "@/actions/saveCar";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { ExtendedCar } from "@/types/types";
import { UserSavedCar } from "@prisma/client";

const ToggleCar = ({ car }: { car: ExtendedCar }) => {
  const session = useSession();
  const savedCars = car?.savedBy;
  const isSavedInitialState = (savedCars as UserSavedCar[])?.some(
    (saveCar) => saveCar?.userId === session.data?.user?.id
  );
  const [isSaved, setIsSaved] = useState(isSavedInitialState);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    const saved = (savedCars as UserSavedCar[])?.some(
      (saveCar) => saveCar?.userId === session.data?.user?.id
    );
    setIsSaved(saved);
  }, [session.data?.user?.id, savedCars]);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsToggling(true);
    try {
      const user = session.data?.user;
      if (!user) {
        return toast.error("Please Sign in to save cars");
      }
      const response = await saveCar(car.id, session.data?.user?.id as string);
      if (response.success) {
        setIsSaved(!isSaved);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error saving car:", error);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleSave}
      disabled={isToggling}
      aria-label={isSaved ? "Remove from saved cars" : "Save car"}
      className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 shadow-md ${
        isSaved
          ? "bg-red-500/15 border-red-500/30 text-red-500 hover:bg-red-500/25 hover:border-red-500/50 hover:scale-105"
          : "bg-black/50 border-white/10 text-white/70 hover:text-white hover:bg-black/70 hover:border-white/25 hover:scale-105"
      } disabled:opacity-60`}
    >
      {isToggling ? (
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
      ) : (
        <Heart
          className={`h-4 w-4 transition-transform active:scale-75 ${
            isSaved ? "fill-red-500 text-red-500" : ""
          }`}
        />
      )}
    </button>
  );
};

export default ToggleCar;
