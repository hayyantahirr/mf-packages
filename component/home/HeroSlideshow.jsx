"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";

const slides = [
  {
    image: "/hero-ai-images/trans_kraft_paper_mockup.svg",
    titlePart: "Biodegradable Kraft paper",
    subtext:
      "Elevate your coffee brand with our high-barrier aroma-locking coffee pouches, built to preserve freshness and lock in aroma.",
    badge: "Premium Kraft Pouches",
  },
  {
    image: "/hero-ai-images/coffee_pouch_mockup.png",
    titlePart: "Coffee",
    subtext:
      "Elevate your coffee brand with our high-barrier aroma-locking coffee pouches, built to preserve freshness and lock in aroma.",
    badge: "Premium Coffee Pouches",
  },
  {
    image: "/hero-ai-images/trans_backery_mockup.svg",
    titlePart: "Bakery",
    subtext:
      "Keep your breads, cookies, and pastries oven-fresh and appetizing with our customized grease-resistant bakery packaging.",
    badge: "Fresh Bakery Packaging",
  },
  {
    image: "/hero-ai-images/trans_aseptic_pouch.svg",
    titlePart: "Aseptic",
    subtext:
      "Ensure sterile and long shelf-life conditions for liquid and fresh food products with our advanced transparent aseptic packaging solutions.",
    badge: "Sterile Aseptic Packaging",
  },
  {
    image: "/hero-ai-images/pet-food-pouches-hero.png",
    titlePart: "Pet Food",
    subtext:
      "Durable and 100% food-safe stand-up pouches designed to keep pet foods and treats fresh, secure, and nutrient-rich.",
    badge: "Food-Safe Pet Pouches",
  },
  {
    image: "/hero-ai-images/trans.png",
    titlePart: "Plastic Standup",
    subtext:
      "Showcase your product quality and build customer trust with our premium transparent and window-cut packaging solutions.",
    badge: "High-Visibility Window",
  },
];

/**
 * HeroSlideshow — Client Component
 *
 * Handles all interactive/animated parts of the Hero section:
 *  - Auto-rotating slideshow state
 *  - Framer Motion transitions for the image panel
 *  - Animated badge, dynamic title word, and dynamic subtext
 *
 * Accepts no props — slide data is self-contained here.
 * Renders two logical sections that the parent (server) Hero lays out:
 *  1. `dynamicText`  — badge + animated title word + subtext
 *  2. `imagePanel`   — the right-side visual slideshow
 *
 * Because Next.js doesn't support returning an object of JSX from a single
 * component cleanly, we expose two named sub-components so the server Hero
 * can place each piece independently while still sharing one state source.
 */
export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ── Dynamic Text Block ─────────────────────────────────────── */}
      {/* Badge */}
      <div className="h-[36px] overflow-hidden relative flex items-center order-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={`badge-${currentSlide}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 border border-white/60 backdrop-blur-md shadow-sm"
          >
            <Leaf size={16} className="text-brand-success" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark">
              {slides[currentSlide].badge}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Title: "Premium [WORD] Packaging" — only the middle word animates */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-dark tracking-tight leading-[1.1] uppercase flex flex-col justify-start order-2">
        <span>Premium</span>
        <span className="block text-brand-orange my-1">
          <AnimatePresence mode="wait">
            <motion.span
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="inline-block"
            >
              {slides[currentSlide].titlePart}
            </motion.span>
          </AnimatePresence>
        </span>
        <span>Packaging</span>
      </h1>

      {/* Subtext */}
      <div className="relative order-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={`subtext-${currentSlide}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="text-brand-dark/70 text-lg md:text-xl font-medium leading-relaxed"
          >
            {slides[currentSlide].subtext}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Image Panel ────────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 relative lg:absolute lg:inset-y-0 lg:right-0 flex items-center justify-center overflow-hidden bg-brand-section order-6 lg:order-0 h-[320px] sm:h-[450px] lg:h-auto rounded-3xl lg:rounded-none shadow-inner lg:shadow-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={`img-${currentSlide}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex items-center justify-center w-full h-full px-4 py-8 sm:px-10 sm:py-20 lg:py-28"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[1200px] aspect-4/3">
              <Image
                src={slides[currentSlide].image}
                alt={`${slides[currentSlide].titlePart} Packaging`}
                fill
                className="object-contain drop-shadow-[0_24px_48px_rgba(40,30,42,0.15)]"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
