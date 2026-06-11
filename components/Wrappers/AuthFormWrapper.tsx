"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { ReactNode } from "react";
import AuthButtons from "../Buttons/AuthButtons";

const AuthFormWrapper = ({
  children,
  type,
}: {
  children: ReactNode;
  type: string;
}) => {
  const title =
    type === "Sign In" ? "Welcome Back" : "Create Account";
  const subtitle =
    type === "Sign In"
      ? "Sign in to your account to continue"
      : "Create a new account to get started";
  const switchingRouteLink = type === "Sign In" ? "Sign Up" : "Sign In";
  const switchingRouteLinkPath = type === "Sign In" ? "/sign-up" : "/sign-in";
  const switchingRouteText =
    type === "Sign In" ? "Don't have an account?" : "Already have an account?";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/[0.04] via-transparent to-secondary/[0.03]" />

      {/* Floating orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/[0.06] rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/[0.06] rounded-full blur-[120px]" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-tertiary/[0.04] rounded-full blur-[100px]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                <span className="font-[family-name:var(--font-sora)] text-xl font-extrabold text-black">
                  M
                </span>
              </div>
            </div>
            <span className="font-[family-name:var(--font-sora)] text-2xl font-extrabold tracking-tight">
              <span className="gradient-text">Moto</span>
              <span className="text-on-surface">verse</span>
            </span>
          </Link>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="font-[family-name:var(--font-sora)] text-4xl font-bold text-on-surface mb-3">
            {title}
          </h1>
          <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-base">
            {subtitle}
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
        >
          {/* Card glow effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/[0.06] rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/[0.04] rounded-full blur-[80px]" />

          <div className="relative z-10 p-8">
            {children}

            {/* Switch auth page */}
            <p className="text-center mt-6 text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm">
              {switchingRouteText}{" "}
              <Link
                href={switchingRouteLinkPath}
                className="text-primary hover:text-primary/80 font-semibold transition-colors duration-300"
              >
                {switchingRouteLink}
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Social Auth */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6"
        >
          <AuthButtons />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthFormWrapper;
