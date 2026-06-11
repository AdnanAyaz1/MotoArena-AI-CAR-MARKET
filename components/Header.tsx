"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserAvatar from "./Avatar/UserAvatar";
import { navLinks } from "@/lib/constants";

interface HeaderProps {
  isAdminPage?: boolean;
  user?: {
    role?: string;
    imageUrl?: string | null;
  } | null;
}

const Header = ({ isAdminPage = false, user }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "nav-scrolled" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-5 md:px-20 py-6 max-w-[1440px] mx-auto">
        {/* Brand Logo */}
        <Link
          href={isAdminPage ? "/admin" : "/"}
          className="flex items-center gap-2"
        >
          {isAdminPage ? (
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-sora)] text-2xl md:text-3xl tracking-tighter text-on-surface font-extrabold gradient-text">
                Motoverse
              </span>
              <span className="text-xs font-extralight text-gray-500">
                admin
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src="/logo-white.png"
                alt="Motoverse"
                width={100}
                height={40}
                className="h-auto w-auto object-contain"
              />
            </div>
          )}
        </Link>

        {/* Navigation Links - Desktop */}
        {!isAdminPage && (
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-on-surface-variant hover:text-on-surface transition-colors font-[family-name:var(--font-jakarta)] text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {isAdminPage ? (
            <Link href="/">
              <Button className="bg-white/5 px-8 py-2.5 rounded-full font-semibold text-base text-on-surface hover:bg-white/10 transition-all duration-200 border border-white/10 backdrop-blur-md">
                Back to App
              </Button>
            </Link>
          ) : (
            <>
              {isAdmin && (
                <Link href="/admin">
                  <Button className="bg-white/5 px-8 py-2.5 rounded-full font-semibold text-base text-on-surface hover:bg-white/10 transition-all duration-200 border border-white/10 backdrop-blur-md hidden md:flex">
                    Admin Portal
                  </Button>
                </Link>
              )}

              {!user ? (
                <Link href="/sign-in">
                  <Button className="bg-white/5 px-8 py-2.5 rounded-full font-semibold text-base text-on-surface hover:bg-white/10 transition-all duration-200 border border-white/10 backdrop-blur-md">
                    Sign In
                  </Button>
                </Link>
              ) : (
                <UserAvatar user={user as any} />
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          {!isAdminPage && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-on-surface" />
              ) : (
                <Menu className="w-5 h-5 text-on-surface" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && !isAdminPage && (
        <div className="lg:hidden bg-surface/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-5 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-on-surface-variant hover:text-on-surface transition-colors font-[family-name:var(--font-jakarta)] text-base py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/[0.06]">
              {!user ? (
                <Link
                  href="/sign-in"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center px-6 py-3 rounded-xl gradient-bg text-black font-[family-name:var(--font-jakarta)] text-sm font-semibold"
                >
                  Sign In
                </Link>
              ) : (
                <div className="flex justify-center">
                  <UserAvatar user={user as any} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
