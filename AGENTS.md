# AGENTS.md — Motoverse Code Style & Conventions

## Project Overview

**Motoverse** is a luxury automotive marketplace built with:
- **Next.js 15** (App Router, Turbopack)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4** (via `@tailwindcss/postcss`)
- **Framer Motion 12** for animations
- **Prisma 6** (PostgreSQL)
- **NextAuth 5** (beta)
- **Zod** for validation
- **shadcn/ui** (Radix primitives)

---

## File Structure

```
app/                    # Next.js App Router pages
  (root)/               # Public-facing routes
  (admin)/admin/        # Admin dashboard routes
  api/                  # API route handlers
components/
  landing/              # Landing page sections (HeroSection, FAQSection, etc.)
  Hero/                 # Hero-specific components
  Cards/                # Reusable card components (CarCard, TestDriveCard)
  CardImages/           # Image components for car cards
  ui/                   # shadcn/ui primitives (button, accordion, etc.)
  design-system/        # Custom design tokens (GlassCard, GlowOrb, etc.)
  layout/               # Layout wrappers (SectionContainer, Navbar)
  Forms/                # Form components
  Filters/              # Filter components for car listings
  Buttons/              # Action buttons
  DashBoard/            # Dashboard widgets
  Dialoges/             # Modal dialogs
  Tables/               # Table components
  FeaturedCars/         # Featured cars section
  Benefits/             # Benefits section
  CarTypes/             # Car type cards
  Companies/            # Company logos
  AnimatedSection/      # Generic animated wrapper
  StaggerContainer/     # Stagger animation wrapper
hooks/                  # Custom React hooks
lib/                    # Utilities, constants, validation schemas
actions/                # Server actions
prisma/                 # Prisma schema
types/                  # TypeScript type definitions
```

---

## Styling Conventions

### Tailwind Usage
- Use Tailwind utility classes. Inline styles only for dynamic values (e.g., `style={{ width: "100%" }}` for grid animations).
- Use `cn()` from `@/lib/utils` for conditional class merging.
- Use `class-variance-authority` (cva) for component variants.

### Color System (Material Design 3 inspired)
```css
--primary: #00d2ff          /* Cyan — main accent */
--secondary: #1fe19e        /* Green — secondary accent */
--tertiary: #ffd79f         /* Amber — tertiary/highlight */
--surface: #0e1417          /* Dark background */
--on-surface: #dee3e7       /* Light text on dark */
--on-surface-variant: #bbc9cf /* Muted text */
--outline: #859399          /* Borders, icons */
```

### Typography
Always use the project's custom font variables:
- **Headings**: `font-[family-name:var(--font-sora)]` — bold, tight tracking
- **Body**: `font-[family-name:var(--font-jakarta)]` — clean, readable
- **Mono/Labels**: `font-[family-name:var(--font-jetbrains-mono)]` — uppercase, tracking-widest

### Gradient Utilities
```css
.gradient-text   /* Cyan→Green gradient text fill */
.gradient-bg     /* Cyan→Green solid gradient background */
.gradient-title  /* Gradient text with font-weight 800 */
```

### Glass Card Pattern
Use `glass-card` class for glassmorphism panels:
```html
<div className="glass-card rounded-xl p-6">
```

---

## Animation Conventions

### Framer Motion
All animations use Framer Motion. Follow this pattern:

```tsx
import { motion } from "framer-motion";

// Entrance animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
>
```

### Easing Curve
Use this consistent easing for all entrance animations:
```ts
ease: [0.22, 1, 0.36, 1]
```

### Stagger Pattern
```ts
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};
```

### Viewport Margins
- `margin: "-100px"` — for sections (trigger before fully in view)
- `margin: "-50px"` — for cards within sections
- `margin: "-30px"` — for small items in rapid succession

### Blur Entrance
For premium feel, add `filter: "blur(4px)"` → `blur(0px)` on card entrances:
```ts
hidden: { opacity: 0, y: 30, filter: "blur(4px)" }
visible: { opacity: 1, y: 0, filter: "blur(0px)" }
```

---

## Card Design Pattern (Fancy Cards)

Used in ExperienceSection, FeaturedCarsSection, FAQSection, NewsletterCTA:

```tsx
<div className="relative rounded-3xl border border-white/[0.06] overflow-hidden bg-white/[0.02] hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-500 group">
  {/* Gradient glow on hover */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  {/* Corner accent blur orb */}
  <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/[0.04] rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

  <div className="relative z-10 p-8">
    {/* Content */}
  </div>
</div>
```

### Key Properties
- `rounded-3xl` for cards, `rounded-2xl` for inner items
- `border-white/[0.06]` default, `hover:border-white/[0.12]` on hover
- `bg-white/[0.02]` default, `bg-white/[0.03]` on hover
- Gradient glow uses `from-primary/[0.04]` (or secondary/tertiary)
- Corner blur orbs: `-top-20 -right-20`, `blur-[80px]`, color at 4% opacity
- All transitions use `duration-500` to `duration-700`

---

## Section Layout Pattern

```tsx
import { SectionContainer } from "@/components/layout";

export const MySection = () => {
  return (
    <SectionContainer>
      <div className="max-w-[1440px] mx-auto">
        {/* Section content */}
      </div>
    </SectionContainer>
  );
};
```

### Section Header Pattern
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  className="mb-16"
>
  <div className="flex items-center gap-3 mb-6">
    <div className="h-px w-12 gradient-bg" />
    <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-primary">
      Label
    </span>
  </div>
  <h2 className="font-[family-name:var(--font-sora)] text-[36px] md:text-[56px] font-bold text-on-surface leading-[1.05] tracking-tight">
    Heading with <span className="gradient-text">gradient word</span>
  </h2>
</motion.div>
```

---

## Component Patterns

### "use client" Directive
Only add `"use client"` when the component uses:
- React hooks (useState, useEffect, etc.)
- Framer Motion (whileInView, whileHover, etc.)
- Browser APIs (event handlers, refs, etc.)

Server components are preferred when possible.

### Import Order
```ts
// 1. React / Next
import { useState } from "react";
import { useRouter } from "next/navigation";

// 2. External libs
import { motion } from "framer-motion";
import { SomeIcon } from "lucide-react";

// 3. Internal components
import { SectionContainer } from "@/components/layout";
import { Button } from "@/components/ui/button";

// 4. Internal utils
import { cn } from "@/lib/utils";
import { faqItems } from "@/lib/constants";
```

### Lucide Icons
Always use `lucide-react`. Import as named exports:
```tsx
import { ArrowUpRight, Star, ChevronDown } from "lucide-react";
```

---

## Landing Page Sections (in order)

1. **HeroSection** — Full-screen hero with search bar, animated orbs, stats
2. **FeaturedCarsSection** — Bento-style car cards (1 large + 2 side)
3. **ExperienceSection** — Bento feature grid with stats strip
4. **TestimonialsSlider** — Two-column testimonial with controls
5. **FAQSection** — Animated accordion items
6. **NewsletterCTA** — Newsletter signup card

---

## Data Constants

All static data lives in `lib/constants.ts`:
```ts
export const faqItems = [...];
export const routes = [...];
export const fuelType = [...];
// etc.
```

---

## Key Utility Functions

```ts
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Don'ts

- **Don't** use `Select-Object`, `Get-Content`, or PowerShell for file ops — use the Read/Edit/Write tools.
- **Don't** add comments unless explicitly asked.
- **Don't** use `Math.random()` for keys — use stable IDs.
- **Don't** mix Tailwind classes with inline styles for static values.
- **Don't** use `px-4` on SectionContainer — it handles padding internally.
- **Don't** forget `"use client"` on components using hooks or Framer Motion.
