"use client";

import Image from "next/image";
import React from "react";

import { StatsBar } from "@/components/StatsBar";

import { HeroTitle, HeroSubtitle, HeroSearch } from "./HeroReveal";
import { HomeSearch } from "./HomeSearch";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Hero Image Backdrop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1417]/60 via-[#0e1417]/20 to-[#0e1417] z-10" />
        <Image
          alt="Hero Supercar"
          src="/screen.png"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Ambient Orbs */}
      <div className="glow-orb w-[600px] h-[600px] bg-primary top-[-200px] left-[-200px] rounded-full" />
      <div className="glow-orb w-[800px] h-[800px] bg-secondary bottom-[20%] right-[-200px] rounded-full" />

      {/* Dot Grid Layer */}
      <div className="fixed inset-0 dot-grid pointer-events-none z-10 opacity-50" />

      {/* Hero Content Container */}
      <div className="relative z-20 flex flex-col items-center px-5 md:px-20 max-w-5xl text-center pt-20">
        {/* Badge */}
        <HeroSearch>
          <div className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-primary tracking-[0.2em] uppercase">
              Precision Engineered
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          </div>
        </HeroSearch>

        {/* Title */}
        <HeroTitle className="font-[family-name:var(--font-sora)] text-4xl md:text-8xl font-extrabold gradient-text mb-8 leading-[1.1] tracking-tight">
          Find Your Dream Car
        </HeroTitle>

        {/* Subtitle */}
        <HeroSubtitle className="font-[family-name:var(--font-inter)] text-lg text-on-surface-variant max-w-2xl mb-12 opacity-80 leading-relaxed">
          The world&apos;s most exclusive marketplace for performance vehicles and
          rare collectors&apos; items. Engineered for those who demand more than
          just transportation.
        </HeroSubtitle>

        {/* Search Bar */}
        <HeroSearch>
          <div className="w-full max-w-3xl">
            <HomeSearch />
          </div>
        </HeroSearch>

        {/* Stats Row */}
        <StatsBar />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-60">
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-outline mb-2 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
