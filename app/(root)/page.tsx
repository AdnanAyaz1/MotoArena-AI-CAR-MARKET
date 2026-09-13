import { getFeaturedCars } from "@/actions/getFeaturedCars";
import {
  HeroSection,
  FeaturedCarsSection,
  ExperienceSection,
  TestimonialsSlider,
  NewsletterCTA,
  FAQSection,
} from "@/components/landing";

import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedCars />
      <ExperienceSection />
      <TestimonialsSlider />
      <FAQSection />
      <NewsletterCTA />
    </div>
  );
}

async function FeaturedCars() {
  const cars = await getFeaturedCars();
  return <FeaturedCarsSection cars={cars} />;
}