import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import CompanyCard from "./CompanyCard";
import { getCompaniesWithLogos } from "@/actions/getCompanies";
import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

interface Company {
  name: string;
  image: string;
}

const CarCompanies = async () => {
  const { data: companies } = await getCompaniesWithLogos();
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection variant="fadeRight">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Browse by Companies</h2>
            <Button variant="default" className="flex items-center" asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" staggerDelay={0.06}>
          {companies &&
            companies.length > 0 &&
            companies
              .slice(0, 6)
              .map((company: Company) => (
                <StaggerItem key={company.name} variant="scaleUp">
                  <CompanyCard company={company} />
                </StaggerItem>
              ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default CarCompanies;
