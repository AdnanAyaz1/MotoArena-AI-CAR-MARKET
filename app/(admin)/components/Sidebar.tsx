"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { routes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogOut = async () => {
    signOut();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 76 : 260 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex fixed inset-y-0 left-0 z-40 flex-col bg-white/[0.01] border-r border-white/[0.06] mt-[72px] overflow-hidden"
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />

        {/* Logo area */}
        <div className="relative px-4 pt-6 pb-4">
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                key="full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 px-2"
              >
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur-sm opacity-40" />
                  <div className="relative w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
                    <span className="font-[family-name:var(--font-sora)] text-sm font-extrabold text-black">
                      M
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-sora)] text-sm font-bold text-on-surface leading-tight">
                    Motoverse
                  </h2>
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] text-on-surface-variant/50 uppercase tracking-wider">
                    Admin
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur-sm opacity-40" />
                  <div className="relative w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
                    <span className="font-[family-name:var(--font-sora)] text-sm font-extrabold text-black">
                      M
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-white/[0.06]" />

        {/* Nav links */}
        <nav className="flex-1 py-4">
          <div className="flex flex-col gap-1 px-3">
            {routes.map((route, index) => {
              const isActive = pathname === route.href;
              return (
                <motion.div
                  key={route.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={route.href}
                    className={cn(
                      "relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-[family-name:var(--font-jakarta)] text-sm font-medium transition-all duration-300 group overflow-hidden",
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04]"
                    )}
                  >
                    {/* Active background glow */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-bg"
                        className="absolute inset-0 bg-primary/[0.08] rounded-xl"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Active left bar */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-bar"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    <route.icon
                      className={cn(
                        "relative z-10 w-5 h-5 flex-shrink-0 transition-colors duration-300",
                        isActive
                          ? "text-primary"
                          : "text-on-surface-variant group-hover:text-on-surface"
                      )}
                    />

                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="relative z-10 whitespace-nowrap overflow-hidden"
                        >
                          {route.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-surface border border-white/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        <span className="font-[family-name:var(--font-jakarta)] text-xs text-on-surface">
                          {route.label}
                        </span>
                      </div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Divider */}
        <div className="mx-4 h-px bg-white/[0.06]" />

        {/* Collapse toggle */}
        <div className="px-3 py-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] text-on-surface-variant/60 hover:text-on-surface transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: collapsed ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-[family-name:var(--font-jakarta)] text-xs whitespace-nowrap overflow-hidden"
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Logout */}
        <div className="px-3 pb-5">
          <button
            onClick={handleLogOut}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-[family-name:var(--font-jakarta)] text-sm font-medium transition-all duration-300 group relative overflow-hidden",
              "text-on-surface-variant hover:text-red-400 hover:bg-red-500/10"
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  Log out
                </motion.span>
              )}
            </AnimatePresence>

            {collapsed && (
              <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-surface border border-white/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                <span className="font-[family-name:var(--font-jakarta)] text-xs text-red-400">
                  Log out
                </span>
              </div>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Bottom Tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl border-t border-white/[0.06]">
        <div className="flex justify-around items-center h-16 px-2 safe-area-inset-bottom">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl transition-all duration-300 relative min-w-[60px]",
                  isActive
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-active"
                    className="absolute -top-0.5 w-8 h-1 rounded-full bg-primary"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}

                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-bg"
                    className="absolute inset-0 bg-primary/[0.08] rounded-xl"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}

                <route.icon className="relative z-10 w-5 h-5" />
                <span className="relative z-10 font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-wider">
                  {route.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
