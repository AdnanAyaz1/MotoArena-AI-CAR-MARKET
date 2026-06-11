"use client";

import { motion } from "framer-motion";
import { Car, ArrowLeft, CheckCircle2, MapPin, Phone, Mail } from "lucide-react";
import TestDriveForm from "@/components/Forms/TestDriveForm";
import { TestDriveBooking } from "@prisma/client/edge";
import { ExtendedDelaersInfo } from "@/types/types";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import CarImage from "./CardImages/CarImage";

interface AnimatedTestDrivePageProps {
  car: any;
  dealer: ExtendedDelaersInfo;
  carId: string;
  testDriveBookings: TestDriveBooking[];
}

const AnimatedTestDrivePage = ({
  car,
  dealer,
  carId,
  testDriveBookings,
}: AnimatedTestDrivePageProps) => {
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
              href={`/cars/${carId}`}
              className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest">
                Back to Car Details
              </span>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-primary uppercase tracking-[0.2em] mb-2">
              Schedule Your Experience
            </p>
            <h1 className="font-[family-name:var(--font-sora)] text-4xl md:text-5xl font-bold text-on-surface leading-tight">
              Book a{" "}
              <span className="bg-gradient-to-r from-[#00d2ff] to-[#1fe19e] bg-clip-text text-transparent">
                Test Drive
              </span>
            </h1>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Car Details & Dealer Info */}
          <div className="space-y-6">
            {/* Car Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent" />
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/[0.04] rounded-full blur-[80px]" />
              <div className="relative z-10 p-6">
                <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-on-surface mb-4">
                  Car Details
                </h3>

                {/* Car Image */}
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video">
                  {car && car.images && car.images.length > 0 ? (
                    <CarImage
                      src={car.images[0]}
                      alt={`${car.year} ${car.company} ${car.model}`}
                      className="w-full h-full"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/[0.02] flex items-center justify-center border border-white/[0.06]">
                      <Car className="h-12 w-12 text-on-surface-variant" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Car Info */}
                <div className="mb-4">
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">
                    {car?.company}
                  </p>
                  <h4 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface">
                    {car?.year} {car?.model}
                  </h4>
                </div>

                <div className="font-[family-name:var(--font-sora)] text-2xl font-bold bg-gradient-to-r from-[#00d2ff] to-[#1fe19e] bg-clip-text text-transparent mb-4">
                  {formatCurrency(Number(car?.price))}
                </div>

                {/* Specs */}
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm">
                      Mileage
                    </span>
                    <span className="text-on-surface font-[family-name:var(--font-sora)] font-semibold text-sm">
                      {car?.mileage.toLocaleString()} miles
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm">
                      Fuel Type
                    </span>
                    <span className="text-on-surface font-[family-name:var(--font-sora)] font-semibold text-sm">
                      {car?.fuelType}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm">
                      Transmission
                    </span>
                    <span className="text-on-surface font-[family-name:var(--font-sora)] font-semibold text-sm">
                      {car?.transmission}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm">
                      Body Type
                    </span>
                    <span className="text-on-surface font-[family-name:var(--font-sora)] font-semibold text-sm">
                      {car?.bodyType}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm">
                      Color
                    </span>
                    <span className="text-on-surface font-[family-name:var(--font-sora)] font-semibold text-sm">
                      {car?.color}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dealer Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.03] via-transparent to-transparent" />
              <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-secondary/[0.04] rounded-full blur-[60px]" />
              <div className="relative z-10 p-6">
                <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-on-surface mb-4">
                  Dealer Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-sora)] text-sm font-bold text-on-surface">
                        {dealer?.name || "Motoverse Motors"}
                      </p>
                      <p className="text-on-surface-variant text-xs font-[family-name:var(--font-jakarta)]">
                        {dealer?.address || "Address not available"}
                      </p>
                    </div>
                  </div>

                  {dealer?.phone && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-on-surface-variant text-xs font-[family-name:var(--font-jakarta)]">
                        {dealer.phone}
                      </p>
                    </div>
                  )}

                  {dealer?.email && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-on-surface-variant text-xs font-[family-name:var(--font-jakarta)]">
                        {dealer.email}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form & What to Expect */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Form Card */}
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
                  Schedule Your Test Drive
                </h3>
                <TestDriveForm
                  dealersInfo={dealer as ExtendedDelaersInfo}
                  carId={carId}
                  testDriveBookings={testDriveBookings as TestDriveBooking[]}
                />
              </div>
            </motion.div>

            {/* What to Expect Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent" />
              <div className="relative z-10 p-8">
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface mb-6">
                  What to Expect
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.04)" }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-on-surface font-[family-name:var(--font-sora)] text-sm font-semibold mb-1">
                      Valid License
                    </p>
                    <p className="text-on-surface-variant text-xs font-[family-name:var(--font-jakarta)]">
                      Bring your driver's license for verification
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.04)" }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                    </div>
                    <p className="text-on-surface font-[family-name:var(--font-sora)] text-sm font-semibold mb-1">
                      30-60 Minutes
                    </p>
                    <p className="text-on-surface-variant text-xs font-[family-name:var(--font-jakarta)]">
                      Test drives typically last 30-60 minutes
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.04)" }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center border border-tertiary/20 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-tertiary" />
                    </div>
                    <p className="text-on-surface font-[family-name:var(--font-sora)] text-sm font-semibold mb-1">
                      Expert Guidance
                    </p>
                    <p className="text-on-surface-variant text-xs font-[family-name:var(--font-jakarta)]">
                      A dealership representative will accompany you
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestDrivePage;
