import { Suspense } from "react";
import { getFeaturedCars } from "@/actions/getFeaturedCars";
import {
  HeroSection,
  FeaturedCarsSection,

  ExperienceSection,
  TestimonialsSlider,
  NewsletterCTA,
  FAQSection,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <Suspense fallback={<div />}>
        <FeaturedCars />
      </Suspense>
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