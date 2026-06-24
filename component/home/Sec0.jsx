"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Kraft paper standup pouch",
    label: "Kraft Paper Standup Pouch",
    image: "/categories/kraft_paper_pouches.svg",
  },
  {
    name: "Aluminum pouches",
    label: "Aluminum Pouches",
    image: "/categories/aluminium_pouch.png",
  },
  {
    name: "Flat bottom pouches",
    label: "Flat Bottom Pouches",
    image: "/categories/flat_bottom_pouches.svg",
  },
  {
    name: "Plastic pouches",
    label: "Plastic Pouches",
    image: "/categories/plastic_pouch.svg",
  },
  {
    name: "Retort pouches",
    label: "Retort Pouches",
    image: "/categories/retort_pouch.svg",
  },
  {
    name: "Chocolate sheets",
    label: "Chocolate Sheets",
    image: "/categories/chocolate_paper.svg",
  },
  {
    name: "Coffee pouches",
    label: "Coffee Pouches",
    image: "/categories/coffee_pouch.svg",
  },
  {
    name: "PVC shrink capsules",
    label: "PVC Shrink Capsules",
    image: "/categories/shrink_capsule.png",
  },
  {
    name: "Spout pouches",
    label: "Spout Pouches",
    image: "/categories/spout_pouch.svg",
  },
  {
    name: "Aseptic packaging",
    label: "Aseptic Packaging",
    image: "/categories/aseptic_category.svg",
  },
  {
    name: "Bakery packaging",
    label: "Bakery Packaging",
    image: "/categories/bakery_category.svg",
  },
  {
    name: "Vacuum pouches",
    label: "Vacuum Pouches",
    image: "/categories/vaccum_pouch.png",
  },
  {
    name: "Coffee filters",
    label: "Coffee Filters",
    image: "/categories/coffee_filter.svg",
  },
];

const SCROLL_CARDS = 2;

const Sec0 = () => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction) => {
    const el = trackRef.current;
    if (!el) return;

    // Calculate card width dynamically from the first child
    const firstCard = el.firstElementChild;
    if (!firstCard) return;
    const gap = 24; // gap-6 = 1.5rem = 24px
    const cardWidth = firstCard.offsetWidth + gap;
    const amount = cardWidth * SCROLL_CARDS;

    if (direction === "right") {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: amount, behavior: "smooth" });
      }
    } else {
      if (el.scrollLeft <= 10) {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      } else {
        el.scrollBy({ left: -amount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ─────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand-dark/5 shadow-sm mb-5">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark">
                Browse Categories
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight">
              Off-the-shelf and{" "}
              <span className="text-brand-orange">ready to go.</span>
            </h2>
            <p className="mt-3 text-brand-dark/50 text-base md:text-lg font-medium max-w-xl leading-relaxed">
              Pick your format and size in minutes. Zips, valves and windows
              available. Local stock, quick dispatch, zero fuss.
            </p>
          </div>

          {/* Desktop nav arrows */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-12 h-12 rounded-2xl border border-brand-dark/10 bg-white flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all duration-300 cursor-pointer shadow-sm"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-12 h-12 rounded-2xl border border-brand-dark/10 bg-brand-dark flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-300 cursor-pointer shadow-sm"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* ── Carousel ───────────────────────────────────── */}
        <div className="relative">
          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-2"
          >
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group relative shrink-0 w-[300px] sm:w-[280px] lg:w-[350px] h-[320px] rounded-4xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-brand-dark/5"
              >
                {/* Product image — fills the card like the shop page */}
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 300px"
                />

                {/* Dark gradient overlay — matches shop page category cards */}
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark/90 via-brand-dark/30 to-transparent transition-opacity duration-500" />

                {/* Content at the bottom */}
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {/* Orange accent bar */}
                    <div className="w-8 h-1 bg-brand-orange rounded-full mb-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                    <h3 className="text-xl font-black text-white tracking-tight leading-tight mb-2">
                      {cat.label}
                    </h3>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-brand-orange">
                        Shop Now
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-brand-orange group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile nav arrows — centered below the track */}
          <div className="flex md:hidden items-center justify-center gap-3 mt-6">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-xl border border-brand-dark/10 bg-white flex items-center justify-center text-brand-dark active:bg-brand-dark active:text-white transition-all duration-200 cursor-pointer shadow-sm"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-xl bg-brand-dark flex items-center justify-center text-white active:bg-brand-orange transition-all duration-200 cursor-pointer shadow-sm"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec0;
