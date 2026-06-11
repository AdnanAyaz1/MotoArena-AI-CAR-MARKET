import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import CarTypeCard from "./CarTypeCard";
import { getBodyTypes } from "@/actions/getBodyTypes";
import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

const CarTypes = async () => {
  const { data: bodyTypes } = await getBodyTypes();
  return (
    <section className="py-24 bg-[#080c14]">
      <div className="container mx-auto px-4">
        <AnimatedSection variant="fadeLeft">
          <div className="flex justify-between items-center mb-10">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400 text-sm font-medium mb-4">
                Body Types
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Browse by Body Type
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          staggerDelay={0.08}
        >
          {bodyTypes &&
            bodyTypes.map((type: { bodyType: string; images: string[] }) => (
              <StaggerItem key={type.bodyType} variant="fadeUp">
                <CarTypeCard type={type} />
              </StaggerItem>
            ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default CarTypes;
