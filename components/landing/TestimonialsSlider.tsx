"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

import { GradientText } from "@/components/design-system";
import { SectionContainer } from "@/components/layout";
import { CountingNumber } from "@/components/CountingNumber";

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

export const TestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 80 : -80,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  const t = testimonials[current];

  return (
    <SectionContainer>
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Left - Testimonial Content + Controls */}
        <div className="lg:w-1/2 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 gradient-bg" />
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-primary">
                Testimonials
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-sora)] text-[32px] md:text-[40px] text-on-surface mb-8 font-bold"
          >
            Voice of the{" "}
            <span className="gradient-text">Collection</span>
          </motion.h2>

          {/* Card area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden min-h-[320px]"
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
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
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mt-6"
          >
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all duration-300 hover:border-white/20"
            >
              <ArrowLeft className="w-5 h-5 text-on-surface" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all duration-300 hover:border-white/20"
            >
              <ArrowRight className="w-5 h-5 text-on-surface" />
            </button>
            <div className="flex gap-2 ml-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-400 ${
                    i === current
                      ? "bg-primary w-8 shadow-lg shadow-primary/30"
                      : "bg-white/20 w-2 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right - Image with Rating */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="lg:w-1/2 relative"
        >
          <div className="relative rounded-3xl border border-white/[0.06] overflow-hidden bg-white/[0.02] p-4">
            {/* Card glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-secondary/[0.03]" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/[0.04] rounded-full blur-[80px]" />

            <div className="relative aspect-square bg-gradient-to-br from-surface-container to-surface flex items-center justify-center rounded-2xl overflow-hidden">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/10"
                >
                  <Star className="w-10 h-10 text-primary" />
                </motion.div>
                <p className="text-on-surface font-[family-name:var(--font-sora)] text-xl font-bold">
                  Trusted by
                </p>
                <p className="text-on-surface font-[family-name:var(--font-sora)] text-3xl font-extrabold gradient-text">
                  <CountingNumber target={2000} suffix="+" duration={2.5} delay={0.8} /> Collectors
                </p>
              </div>
            </div>
          </div>

          {/* Rating Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-8 -right-8 w-48 h-48 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl flex flex-col items-center justify-center text-center p-4 z-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent" />
            <div className="relative z-10">
              <GradientText className="font-[family-name:var(--font-sora)] text-3xl font-bold">
                <CountingNumber target={4.9} suffix="/5" decimals={1} duration={2} delay={1} />
              </GradientText>
              <div className="flex text-secondary my-2 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-outline font-bold font-[family-name:var(--font-jetbrains-mono)]">
                TRUSTED BY 2,000+ COLLECTORS
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};
