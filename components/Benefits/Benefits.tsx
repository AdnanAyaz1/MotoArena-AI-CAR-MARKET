import React from "react";
import { Car, Calendar, Shield, ArrowRight, Zap, Search, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

const benefits = [
  {
    icon: Car,
    title: "Wide Selection",
    description: "Thousands of verified vehicles from trusted dealerships and private sellers.",
    gradient: "from-blue-500/20 to-blue-600/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Clock,
    title: "Easy Test Drive",
    description: "Book a test drive online in minutes, with flexible scheduling options.",
    gradient: "from-emerald-500/20 to-emerald-600/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Shield,
    title: "Secure Process",
    description: "Verified listings and secure booking process for peace of mind.",
    gradient: "from-purple-500/20 to-purple-600/20",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
];

const Benefits = () => {
  return (
    <section className="py-24 bg-[#0a0e18]">
      <div className="container mx-auto px-4">
        <AnimatedSection variant="fadeUp">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400 text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Everything you need to find and purchase your perfect vehicle
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {benefits.map((benefit) => (
            <StaggerItem key={benefit.title} variant="fadeUp">
              <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500">
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`} />

                <div className={`w-14 h-14 ${benefit.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className={`h-7 w-7 ${benefit.iconColor}`} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-6">{benefit.description}</p>

                <div className="flex items-center text-sm font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Benefits;
