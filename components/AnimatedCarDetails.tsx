"use client";

import { motion } from "framer-motion";
import { formatCurrency, formatTimeToAMPM } from "@/lib/utils";
import {
  Gauge,
  Fuel,
  Car,
  MapPin,
  Clock,
  Mail,
  Phone,
  ArrowLeft,
  Users,
  Palette,
} from "lucide-react";
import React from "react";
import CarImageGallery from "@/components/CarImageGallery";
import TestDriveButton from "@/components/Buttons/TestDriveButton";
import { TestDriveBooking, User, DealershipInfo, WorkingHour } from "@prisma/client";
import Link from "next/link";
import { ExtendedCar } from "@/types/types";

interface AnimatedCarDetailsProps {
  car: ExtendedCar;
  dealerInfo: (DealershipInfo & { workingHours: WorkingHour[] }) | null;
  testDriveBookings: TestDriveBooking[];
  user: User | null;
}

const AnimatedCarDetails = ({
  car,
  dealerInfo,
  testDriveBookings,
  user,
}: AnimatedCarDetailsProps) => {
  const specs = [
    { icon: Gauge, label: "Mileage", value: `${car.mileage.toLocaleString()} mi` },
    { icon: Fuel, label: "Fuel", value: car.fuelType },
    { icon: Car, label: "Transmission", value: car.transmission },
    { icon: Palette, label: "Color", value: car.color },
    { icon: Users, label: "Seats", value: car.seats?.toString() || "N/A" },
  ];

  const details = [
    { label: "Company", value: car.company },
    { label: "Model", value: car.model },
    { label: "Year", value: car.year.toString() },
    { label: "Body Type", value: car.bodyType },
    { label: "Fuel Type", value: car.fuelType },
    { label: "Transmission", value: car.transmission },
    { label: "Mileage", value: `${car.mileage.toLocaleString()} miles` },
    { label: "Color", value: car.color },
    ...(car.seats ? [{ label: "Seats", value: car.seats.toString() }] : []),
  ];

  return (
    <div className="min-h-screen">
      {/* Header with gradient mesh */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden border-b border-white/[0.06]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.02]" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/[0.05] rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-secondary/[0.05] rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-16 py-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest">
                Back to Cars
              </span>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-primary uppercase tracking-[0.2em] mb-2">
                {car.bodyType}
              </p>
              <h1 className="font-[family-name:var(--font-sora)] text-4xl md:text-5xl font-bold text-on-surface leading-tight">
                {car.year}{" "}
                <span className="bg-gradient-to-r from-[#00d2ff] to-[#1fe19e] bg-clip-text text-transparent">
                  {car.company}
                </span>{" "}
                {car.model}
              </h1>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="font-[family-name:var(--font-sora)] text-3xl font-bold bg-gradient-to-r from-[#00d2ff] to-[#1fe19e] bg-clip-text text-transparent">
                {formatCurrency(Number(car.price))}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image Gallery & Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent" />
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/[0.03] rounded-full blur-[80px]" />
              <div className="relative z-10 p-4">
                <CarImageGallery car={car} />
              </div>
            </motion.div>

            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.02] via-transparent to-transparent" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/[0.03] rounded-full blur-[80px]" />
              <div className="relative z-10 p-8">
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface mb-4">
                  Description
                </h3>
                <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] leading-relaxed whitespace-pre-line">
                  {car.description}
                </p>
              </div>
            </motion.div>

            {/* Features Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-tertiary/[0.02] via-transparent to-transparent" />
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-tertiary/[0.03] rounded-full blur-[80px]" />
              <div className="relative z-10 p-8">
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface mb-6">
                  Features
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { text: `${car.transmission} Transmission`, delay: 0 },
                    { text: `${car.fuelType} Engine`, delay: 0.05 },
                    { text: `${car.bodyType} Body Style`, delay: 0.1 },
                    car.seats ? { text: `${car.seats} Seats`, delay: 0.15 } : null,
                    { text: `${car.color} Exterior`, delay: 0.2 },
                    { text: `${car.year} Model Year`, delay: 0.25 },
                  ].filter(Boolean).map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: feature!.delay, duration: 0.4 }}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.04)" }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-on-surface-variant text-sm font-[family-name:var(--font-jakarta)]">
                        {feature!.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Specifications Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent" />
              <div className="relative z-10 p-8">
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface mb-6">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {details.map((detail, index) => (
                    <motion.div
                      key={detail.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                      className="flex justify-between items-center py-3 px-4 rounded-xl bg-white/[0.02] border border-white/[0.04] transition-colors"
                    >
                      <span className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm">
                        {detail.label}
                      </span>
                      <span className="text-on-surface font-[family-name:var(--font-sora)] font-semibold text-sm">
                        {detail.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Quick Stats, Actions, Dealer */}
          <div className="space-y-6">
            {/* Quick Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent" />
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/[0.04] rounded-full blur-[60px]" />
              <div className="relative z-10 p-6">
                <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-on-surface mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  {specs.map((spec, index) => (
                    <motion.div
                      key={spec.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.04)" }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <spec.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-on-surface-variant uppercase tracking-widest">
                          {spec.label}
                        </p>
                        <p className="font-[family-name:var(--font-sora)] text-sm font-semibold text-on-surface">
                          {spec.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Actions Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.03] via-transparent to-transparent" />
              <div className="relative z-10 p-6 space-y-4">
                <TestDriveButton
                  carId={car.id}
                  user={user as User}
                  testDriveBookings={testDriveBookings as TestDriveBooking[]}
                />

                {/* Contact Card */}
                <motion.div
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-[family-name:var(--font-sora)] text-sm font-bold text-on-surface">
                      Have Questions?
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-xs font-[family-name:var(--font-jakarta)] mb-3">
                    Our team is available to answer all your queries about this vehicle.
                  </p>
                  <a href="mailto:help@motoverse.in">
                    <button className="w-full py-2.5 rounded-xl border border-white/[0.08] text-on-surface font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold uppercase tracking-widest hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-300">
                      Request Info
                    </button>
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Dealer Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-tertiary/[0.03] via-transparent to-transparent" />
              <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-tertiary/[0.04] rounded-full blur-[60px]" />
              <div className="relative z-10 p-6">
                <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-on-surface mb-4">
                  Dealer Location
                </h3>

                {/* Dealership Info */}
                <div className="space-y-3 mb-6">
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-sora)] text-sm font-bold text-on-surface">
                        {dealerInfo?.name}
                      </p>
                      <p className="text-on-surface-variant text-xs font-[family-name:var(--font-jakarta)]">
                        {dealerInfo?.address || "Address not available"}
                      </p>
                    </div>
                  </motion.div>

                  {dealerInfo?.phone && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-on-surface-variant text-xs font-[family-name:var(--font-jakarta)]">
                        {dealerInfo.phone}
                      </p>
                    </motion.div>
                  )}

                  {dealerInfo?.email && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-on-surface-variant text-xs font-[family-name:var(--font-jakarta)]">
                        {dealerInfo.email}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Working Hours */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-[family-name:var(--font-sora)] text-sm font-bold text-on-surface">
                      Working Hours
                    </span>
                  </div>
                  <div className="space-y-2">
                    {dealerInfo?.workingHours.map((workingHour, index) => (
                      <motion.div
                        key={workingHour.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.03 }}
                        className="flex items-center justify-between"
                      >
                        <span className="text-on-surface-variant text-xs font-[family-name:var(--font-jakarta)]">
                          {workingHour.dayOfWeek}
                        </span>
                        {workingHour.isClosed ? (
                          <span className="text-on-surface-variant text-xs font-[family-name:var(--font-jetbrains-mono)]">
                            Closed
                          </span>
                        ) : (
                          <span className="text-on-surface text-xs font-[family-name:var(--font-jetbrains-mono)]">
                            {formatTimeToAMPM(workingHour.openTime)} -{" "}
                            {formatTimeToAMPM(workingHour.closeTime)}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCarDetails;
