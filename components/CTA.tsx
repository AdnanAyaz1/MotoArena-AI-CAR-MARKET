import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = async () => {
  const user = await auth();
  const id = user?.user?.id;
  return (
    <section className="relative py-28 overflow-hidden bg-[#080c14]">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <AnimatedSection variant="scaleUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Start your journey today</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Dream Car?
            </span>
          </h2>

          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who found their perfect vehicle
            through our platform.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 px-8 py-6 rounded-full font-medium"
            >
              <Link href="/cars" className="flex items-center gap-2">
                Browse All Cars
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {id ? null : (
              <Button
                size="lg"
                asChild
                className="group bg-white/[0.04] backdrop-blur-sm text-white border border-white/[0.1] hover:bg-white/[0.08] px-8 py-6 rounded-full font-medium"
              >
                <Link href="/sign-up" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTA;
