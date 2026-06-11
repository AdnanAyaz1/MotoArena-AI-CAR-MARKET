"use client";

import { Heart, Share2, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { toast } from "react-toastify";
import { saveCar } from "@/actions/saveCar";
import { ExtendedCar } from "@/types/types";
import { useSession } from "next-auth/react";
import { UserSavedCar } from "@prisma/client/edge";
import CarImage from "./CardImages/CarImage";
import { motion, AnimatePresence } from "framer-motion";

interface CarImageGalleryProps {
  car: ExtendedCar;
}

const CarImageGallery = ({ car }: CarImageGalleryProps) => {
  const session = useSession();
  const isWishlistedInitialState = (car.savedBy as UserSavedCar[]).some(
    (car) => car.userId === session.data?.user?.id
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(
    isWishlistedInitialState
  );
  const [savingCar, setSavingCar] = useState(false);

  const handleSaveCar = async () => {
    setSavingCar(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        return toast.error("Please Sign in to save cars");
      }
      const response = await saveCar(car.id, user.data?.id as string);
      if (response.success) {
        setIsWishlisted(!isWishlisted);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error saving car:", error);
    } finally {
      setSavingCar(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${car.year} ${car.company} ${car.model}`,
          text: `Check out this ${car.year} ${car.company} ${car.model} on Motoverse!`,
          url: window.location.href,
        })
        .catch((error) => {
          console.log("Error sharing", error);
          copyToClipboard();
        });
    } else {
      copyToClipboard();
    }
  };

  const goToPrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? car.images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === car.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative rounded-2xl overflow-hidden mb-4 group">
        {car.images && car.images.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full h-[400px] md:h-[500px]"
            >
              <CarImage
                src={car.images[currentImageIndex]}
                alt={`${car.year} ${car.company} ${car.model}`}
                className="w-full h-full"
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="w-full h-[400px] md:h-[500px] bg-white/[0.02] flex items-center justify-center rounded-2xl border border-white/[0.06]">
            <span className="text-on-surface-variant text-sm font-[family-name:var(--font-jakarta)]">
              No Image Available
            </span>
          </div>
        )}

        {/* Navigation Arrows */}
        {car.images && car.images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-surface hover:border-white/[0.2]"
            >
              <ChevronLeft className="w-5 h-5 text-on-surface" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-surface hover:border-white/[0.2]"
            >
              <ChevronRight className="w-5 h-5 text-on-surface" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {car.images && car.images.length > 1 && (
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-surface/80 backdrop-blur-sm border border-white/[0.1]">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant">
              {currentImageIndex + 1} / {car.images.length}
            </span>
          </div>
        )}

        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails */}
      {car.images && car.images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto py-1 -mx-1 px-1 scrollbar-hide">
          {car.images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${
                index === currentImageIndex
                  ? "ring-2 ring-primary shadow-lg shadow-primary/20"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={image}
                alt={`${car.year} ${car.company} ${car.model} - view ${index + 1}`}
                height={80}
                width={100}
                className="object-cover h-20 w-24"
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSaveCar}
          disabled={savingCar}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all duration-300 font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest ${
            isWishlisted
              ? "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
              : "border-white/[0.08] bg-white/[0.02] text-on-surface-variant hover:bg-white/[0.04] hover:border-white/[0.15] hover:text-on-surface"
          }`}
        >
          {savingCar ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`} />
          )}
          {isWishlisted ? "Saved" : "Save"}
        </button>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest hover:bg-white/[0.04] hover:border-white/[0.15] hover:text-on-surface transition-all duration-300"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
};

export default CarImageGallery;
