import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import React from "react";
import CarCard from "../Cards/CarCard";
import Link from "next/link";
import { getFeaturedCars } from "@/actions/getFeaturedCars";
import { ExtendedCar } from "@/types/types";
import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

const FeaturedCars = async () => {
  let featuredCars: ExtendedCar[] = await getFeaturedCars();
  return (
    <section className="py-24 bg-[#080c14]">
      <div className="container mx-auto px-4">
        <AnimatedSection variant="fadeLeft">
          <div className="flex justify-between items-center mb-10">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400 text-sm font-medium mb-4">
                Featured
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Featured Cars
              </h2>
            </div>
            <Link href="/cars">
              <Button
                variant="secondary"
                className="group bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:bg-white/[0.08] hover:text-white rounded-full"
              >
                View All
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          staggerDelay={0.08}
        >
          {featuredCars.slice(0, 4).map((car: ExtendedCar) => (
            <StaggerItem key={car.id} variant="scaleUp">
              <CarCard car={car as ExtendedCar} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default FeaturedCars;
