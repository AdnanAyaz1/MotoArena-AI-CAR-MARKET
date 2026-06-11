import Link from "next/link";

import { GradientText } from "@/components/design-system";

const footerLinks = {
  marketplace: [
    { label: "Inventory", href: "/cars" },
    { label: "Live Auctions", href: "/cars?search=auction" },
    { label: "Private Treaty", href: "/cars?status=sell" },
    { label: "Sell Your Car", href: "/cars?status=sell" },
  ],
  experience: [
    { label: "Concierge Service", href: "/test-drive" },
    { label: "Certification", href: "#" },
    { label: "Financing", href: "#" },
    { label: "Showrooms", href: "/cars?featured=true" },
  ],
  company: [
    { label: "Our Story", href: "#" },
    { label: "Newsroom", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Careers", href: "#" },
  ],
};

const socialLinks = [
  { icon: "globe", href: "#", label: "Website" },
  { icon: "speed", href: "#", label: "Speed" },
  { icon: "smart_display", href: "#", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="w-full mt-[120px] bg-surface-container-lowest border-t border-white/10 relative overflow-hidden">
      <div className="px-5 md:px-16 max-w-[1440px] mx-auto relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 max-w-sm">
            <GradientText className="text-3xl font-extrabold font-[family-name:var(--font-sora)] mb-6 block">
              Motoverse
            </GradientText>
            <p className="text-on-surface-variant leading-relaxed mb-8 font-[family-name:var(--font-jakarta)]">
              The premier global marketplace for performance engineering and
              automotive heritage.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-all text-sm text-on-surface-variant hover:text-primary"
                >
                  <span className="material-symbols-outlined text-base">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest font-[family-name:var(--font-jetbrains-mono)]">
              Marketplace
            </h5>
            <ul className="flex flex-col gap-4">
              {footerLinks.marketplace.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-on-surface-variant hover:text-white transition-colors font-[family-name:var(--font-jakarta)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience Links */}
          <div>
            <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest font-[family-name:var(--font-jetbrains-mono)]">
              Experience
            </h5>
            <ul className="flex flex-col gap-4">
              {footerLinks.experience.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-on-surface-variant hover:text-white transition-colors font-[family-name:var(--font-jakarta)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest font-[family-name:var(--font-jetbrains-mono)]">
              Company
            </h5>
            <ul className="flex flex-col gap-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-on-surface-variant hover:text-white transition-colors font-[family-name:var(--font-jakarta)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Motoverse. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-on-surface-variant font-[family-name:var(--font-jakarta)]">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
