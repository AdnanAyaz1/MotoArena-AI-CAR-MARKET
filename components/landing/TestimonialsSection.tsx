"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import Image from "next/image";

import { GlassCard, GradientText, TechnicalChip } from "@/components/design-system";
import { SectionContainer } from "@/components/layout";

const testimonials = [
  {
    quote:
      "Motoverse isn't just a marketplace; it's the gold standard for automotive curation. The acquisition of my Aero-S was seamless, professional, and ultimately, an experience as refined as the car itself.",
    author: "Julian Vance",
    role: "Global Tech Founder",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <SectionContainer>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        {/* Left - Testimonial Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:w-1/2"
        >
          <TechnicalChip variant="secondary" className="mb-4">
            TESTIMONIALS
          </TechnicalChip>

          <h2 className="font-[family-name:var(--font-sora)] text-[32px] md:text-[40px] text-on-surface mb-8 font-bold">
            Voice of the Collection
          </h2>

          <GlassCard className="p-12 relative">
            <div className="absolute -top-3 left-8 text-6xl text-primary/20 font-serif">&ldquo;</div>
            <p className="italic text-2xl text-on-surface-variant leading-relaxed mb-8 font-[family-name:var(--font-inter)]">
              &ldquo;{testimonials[0].quote}&rdquo;
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-highest" />
              <div>
                <p className="text-on-surface font-bold text-lg">
                  {testimonials[0].author}
                </p>
                <p className="text-outline text-sm uppercase tracking-widest font-[family-name:var(--font-jetbrains-mono)]">
                  {testimonials[0].role}
                </p>
              </div>
            </div>
          </GlassCard>

          <div className="flex gap-4 mt-8">
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-5 h-5 text-on-surface" />
            </button>
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
              <ArrowRight className="w-5 h-5 text-on-surface" />
            </button>
          </div>
        </motion.div>

        {/* Right - Image with Rating */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:w-1/2 relative"
        >
          <div className="aspect-square glass-card rounded-xl overflow-hidden p-4">
            <Image
              alt="Curated interior"
              src="https://lh3.googleusercontent.com/aida/AP1WRLu3AidSDX4cbDz45NKs9GXXv34mv7WNhTIJTot9Pq9wVBnWW0mlqwVUbrcjMEIyTmmM3MgjO9m5VfV3quFNBgCu2S5JYiXDmLACegUvPQ5oMWpT6XIgVJETytifO99bupFdK3862o6EknPbWaCJfytmHnBbIWKpvNBKOEXSr0AwSkb2p0gu0OZA5yoEwKB5v7pXsPAxFw4-8DBmXBf0tBBT1MnXnYVAwKl47pWF54g236D4mGT2E8itsQ"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Rating Card */}
          <div className="absolute -bottom-8 -right-8 w-48 h-48 glass-card rounded-xl flex flex-col items-center justify-center text-center p-4">
            <GradientText className="font-[family-name:var(--font-sora)] text-3xl font-bold">
              4.9/5
            </GradientText>
            <div className="flex text-secondary my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-[10px] text-outline font-bold font-[family-name:var(--font-jetbrains-mono)]">
              TRUSTED BY 2,000+ COLLECTORS
            </span>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};
