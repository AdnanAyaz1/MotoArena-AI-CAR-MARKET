"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";


import { GlowOrb, DotGrid, TechnicalChip } from "@/components/design-system";
import { HeroTitle, HeroSubtitle, HeroSearch } from "@/components/Hero/HeroReveal";
import { HomeSearch } from "@/components/Hero/HomeSearch";
import { StatsBar } from "@/components/StatsBar";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden animated-gradient-bg">
      {/* Hero Image Backdrop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#0e1417]/40 via-[#0e1417]/10 to-[#0e1417]/70 z-10" />
        <Image
          alt="Hero Supercar"
          src="/screen.png"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Ambient Orbs - floating animated */}
      <GlowOrb color="primary" size="md" position={{ top: "-200px", left: "-200px" }} className="moving-orb" />
      <GlowOrb color="secondary" size="lg" position={{ bottom: "20%", right: "-200px" }} className="pulse-orb" />
      <div className="glow-orb w-[500px] h-[500px] bg-primary-container/10 top-[30%] left-[50%] -translate-x-1/2 rounded-full pulse-orb" style={{ animationDelay: "2s" }} />

      {/* Dot Grid Layer */}
      <DotGrid />

      {/* Readability Overlay behind content */}
      <div className="absolute inset-0 z-[15] bg-[radial-gradient(ellipse_at_center,rgba(10,14,24,0.85)_0%,rgba(10,14,24,0.5)_50%,transparent_80%)]" />

      {/* Hero Content Container */}
      <div className="relative z-20 flex flex-col items-center px-5 md:px-20 max-w-5xl text-center pt-20">
        {/* Badge */}
        <HeroSearch>
          <TechnicalChip variant="default" className="mb-8">
            <span>Precision Engineered</span>
            <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          </TechnicalChip>
        </HeroSearch>

        {/* Title */}
        <HeroTitle className="font-[family-name:var(--font-sora)] text-4xl md:text-8xl font-extrabold text-white mb-8 leading-[0.95] tracking-tighter uppercase">
          Find Your <span className="gradient-text">Dream</span> Machine
        </HeroTitle>

        {/* Subtitle */}
        <HeroSubtitle className="font-[family-name:var(--font-jakarta)] text-lg text-white/80 max-w-2xl mb-12 leading-relaxed">
          The world&apos;s most exclusive marketplace for performance vehicles and
          rare collectors&apos; items. Engineered for those who demand more than
          just transportation.
        </HeroSubtitle>

        {/* Search Bar */}
        <HeroSearch>
          <div className="w-full max-w-5xl">
            <HomeSearch />
          </div>
        </HeroSearch>

        {/* Stats Row */}
        <StatsBar />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-outline mb-2 tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-primary animate-bounce" />
      </motion.div>
    </section>
  );
};
