import { Car } from "@prisma/client/edge";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractErrorMessages = (
  error: Record<string, string[]>
): string => {
  const messageArray: string[][] = Object.keys(error).map(
    (message) => error[message]
  );
  const message = messageArray.join(",");
  return message;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatTimeToAMPM = (time: string): string => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

export const serializeCarData = (car: Car, wishlisted = false) => {
  return {
    ...car,
    price: car.price ? parseFloat(car.price.toString()) : 0,
    createdAt: car.createdAt?.toISOString(),
    updatedAt: car.updatedAt?.toISOString(),
  };
};

export const inputClass = (error?: boolean) => {
  return `w-full px-4 py-3 rounded-xl border bg-white/[0.02] text-on-surface font-[family-name:var(--font-jakarta)] text-sm placeholder:text-on-surface-variant/30 focus:border-primary/50 hover:bg-white/[0.04] focus:bg-white/[0.04] transition-all duration-300 outline-none ${
    error ? "border-red-500/50" : "border-white/[0.06]"
  }`;
};
