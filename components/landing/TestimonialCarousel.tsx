"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    quote:
      "Motoverse isn't just a marketplace; it's the gold standard for automotive curation. The acquisition of my Aero-S was seamless, professional, and ultimately, an experience as refined as the car itself.",
    author: "Julian Vance",
    role: "Global Tech Founder",
    rating: 5,
  },
  {
    quote:
      "From the moment I inquired about the GT3 RS to the enclosed delivery to my garage, every detail was handled with precision. This is how luxury should work.",
    author: "Marcus Chen",
    role: "Venture Capitalist",
    rating: 5,
  },
  {
    quote:
      "I've bought from traditional dealerships and private sellers. Motoverse's verification process and concierge service puts them all to shame. Worth every penny.",
    author: "Sarah Mitchell",
    role: "Formula 1 Enthusiast",
    rating: 5,
  },
  {
    quote:
      "The AI-powered search found me a rare classic I'd been hunting for years. Within 48 hours, I had the full provenance report and a delivery quote. Extraordinary.",
    author: "James Okafor",
    role: "Car Collector",
    rating: 5,
  },
];

export const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <div className="lg:w-1/2 w-full">
      {/* Card area */}
      <div className="relative overflow-hidden min-h-[320px]">
        <div key={current}>
          <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 overflow-hidden">
            {/* Card glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/[0.04] rounded-full blur-[50px]" />

            <Quote className="absolute top-6 left-8 w-12 h-12 text-primary/20" />
            <p className="italic text-xl text-on-surface-variant leading-relaxed mb-8 font-[family-name:var(--font-jakarta)] relative z-10">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                <span className="font-[family-name:var(--font-sora)] text-sm font-bold text-primary">
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="text-on-surface font-bold text-lg font-[family-name:var(--font-jakarta)]">
                  {t.author}
                </p>
                <p className="text-outline text-sm uppercase tracking-widest font-[family-name:var(--font-jetbrains-mono)]">
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all duration-300 hover:border-white/20"
        >
          <ArrowLeft className="w-5 h-5 text-on-surface" />
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all duration-300 hover:border-white/20"
        >
          <ArrowRight className="w-5 h-5 text-on-surface" />
        </button>
        <div className="flex gap-2 ml-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-400 ${
                i === current
                  ? "bg-primary w-8 shadow-lg shadow-primary/30"
                  : "bg-white/20 w-2 hover:bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
