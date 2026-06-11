import { getFeaturedCars } from "@/actions/getFeaturedCars";
import {
  HeroSection,
  FeaturedCarsSection,
  ExperienceSection,
  TestimonialsSlider,
  NewsletterCTA,
  FAQSection,
} from "@/components/landing";

export default async function Home() {
  const featuredCars = await getFeaturedCars();

  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedCarsSection cars={featuredCars} />
      <ExperienceSection />
      <TestimonialsSlider />
      <FAQSection />
      <NewsletterCTA />
    </div>
  );
}
