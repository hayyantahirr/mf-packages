"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const pouchesCategories = [
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
    name: "Coffee pouches",
    label: "Coffee Pouches",
    image: "/categories/coffee_pouch.svg",
  },
  {
    name: "Spout pouches",
    label: "Spout Pouches",
    image: "/categories/spout_pouch.svg",
  },
  {
    name: "Vacuum pouches",
    label: "Vacuum Pouches",
    image: "/categories/vaccum_pouch.png",
  },
];

const specialtyCategories = [
  {
    name: "Coffee filters",
    label: "Coffee Filters",
    image: "/categories/coffee_filter.svg",
  },
  {
    name: "PVC shrink capsules",
    label: "PVC Shrink Capsules",
    image: "/categories/shrink_capsule.png",
  },
  {
    name: "Bakery packaging",
    label: "Bakery Bags",
    image: "/categories/bakery_category.svg",
  },
  {
    name: "Aseptic packaging",
    label: "Aseptic Packaging",
    image: "/categories/aseptic_category.svg",
  },
  {
    name: "Chocolate sheets",
    label: "Chocolate Sheets",
    image: "/categories/chocolate_paper.svg",
  },
];

const SCROLL_CARDS = 2;

const Sec0 = () => {
  const pouchesTrackRef = useRef(null);
  const specialtyTrackRef = useRef(null);

  const [scrollStatePouches, setScrollStatePouches] = useState({
    left: false,
    right: true,
  });
  const [scrollStateSpecialty, setScrollStateSpecialty] = useState({
    left: false,
    right: true,
  });

  const updateScrollState = useCallback((ref, setState) => {
    const el = ref.current;
    if (!el) return;
    setState({
      left: el.scrollLeft > 4,
      right: el.scrollLeft < el.scrollWidth - el.clientWidth - 4,
    });
  }, []);

  useEffect(() => {
    const elPouches = pouchesTrackRef.current;
    const elSpecialty = specialtyTrackRef.current;

    const handleScrollPouches = () =>
      updateScrollState(pouchesTrackRef, setScrollStatePouches);
    const handleScrollSpecialty = () =>
      updateScrollState(specialtyTrackRef, setScrollStateSpecialty);

    if (elPouches) {
      elPouches.addEventListener("scroll", handleScrollPouches, {
        passive: true,
      });
    }
    if (elSpecialty) {
      elSpecialty.addEventListener("scroll", handleScrollSpecialty, {
        passive: true,
      });
    }

    window.addEventListener("resize", handleScrollPouches);
    window.addEventListener("resize", handleScrollSpecialty);

    // Initial check
    setTimeout(() => {
      handleScrollPouches();
      handleScrollSpecialty();
    }, 100);

    return () => {
      if (elPouches)
        elPouches.removeEventListener("scroll", handleScrollPouches);
      if (elSpecialty)
        elSpecialty.removeEventListener("scroll", handleScrollSpecialty);
      window.removeEventListener("resize", handleScrollPouches);
      window.removeEventListener("resize", handleScrollSpecialty);
    };
  }, [updateScrollState]);

  const scroll = (ref, direction) => {
    const el = ref.current;
    if (!el) return;

    const firstCard = el.firstElementChild;
    if (!firstCard) return;
    const gap = 24;
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
      <div className="max-w-7xl mx-auto space-y-24">
        {/* ── Section Header ─────────────────────────────── */}
        <div className="text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand-dark/5 shadow-sm mb-5">
            <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark">
              Our Collections
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight">
            Off-the-shelf and{" "}
            <span className="text-brand-orange">ready to go.</span>
          </h2>
          <p className="mt-3 text-brand-dark/50 text-base md:text-lg font-medium leading-relaxed">
            Choose your packaging format. Local inventory, custom branding
            options, and rapid global dispatch.
          </p>
        </div>

        {/* ── Carousel 1: Pouches only ───────────────────────────────────── */}
        <div className="space-y-6">
          <div className="flex items-end justify-between gap-6 border-b border-brand-dark/5 pb-4">
            <div className="text-left">
              <span className="inline-flex text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-brand-orange/10 px-3.5 py-1.5 rounded-full mb-3">
                Pouches Line
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
                Flexible Standup Pouches
              </h3>
              <p className="text-brand-dark/50 text-xs md:text-sm font-medium mt-1">
                Zipper seals, aroma-locking valves, and transparent windows.
              </p>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll(pouchesTrackRef, "left")}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-xl border border-brand-dark/10 bg-white flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300 cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!scrollStatePouches.left}
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => scroll(pouchesTrackRef, "right")}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-xl border border-brand-dark/10 bg-brand-dark flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-300 cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!scrollStatePouches.right}
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              ref={pouchesTrackRef}
              className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-2"
            >
              {pouchesCategories.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="group relative shrink-0 w-[260px] sm:w-[280px] lg:w-[320px] h-[300px] rounded-4xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-brand-dark/5"
                >
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 320px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/95 via-brand-dark/30 to-transparent transition-opacity duration-500" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-left">
                      <div className="w-8 h-1 bg-brand-orange rounded-full mb-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                      <h4 className="text-lg font-black text-white tracking-tight leading-tight mb-2">
                        {cat.label}
                      </h4>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-brand-orange">
                          Explore Collection
                        </span>
                        <ArrowRight
                          size={12}
                          className="text-brand-orange group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Carousel 2: Specialty packaging only ─────────────────────────────────── */}
        <div className="space-y-6">
          <div className="flex items-end justify-between gap-6 border-b border-brand-dark/5 pb-4">
            <div className="text-left">
              <span className="inline-flex text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-600/10 px-3.5 py-1.5 rounded-full mb-3">
                Specialty Line
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
                Packaging Accessories
              </h3>
              <p className="text-brand-dark/50 text-xs md:text-sm font-medium mt-1">
                Sterile aseptic, greaseproof sheets, drip filters, and
                heat-shrink capsules.
              </p>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll(specialtyTrackRef, "left")}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-xl border border-brand-dark/10 bg-white flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300 cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!scrollStateSpecialty.left}
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => scroll(specialtyTrackRef, "right")}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-xl border border-brand-dark/10 bg-brand-dark flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!scrollStateSpecialty.right}
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              ref={specialtyTrackRef}
              className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-2"
            >
              {specialtyCategories.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="group relative shrink-0 w-[260px] sm:w-[280px] lg:w-[320px] h-[300px] rounded-4xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-brand-dark/5"
                >
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 320px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/95 via-brand-dark/30 to-transparent transition-opacity duration-500" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-left">
                      <div className="w-8 h-1 bg-blue-600 rounded-full mb-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                      <h4 className="text-lg font-black text-white tracking-tight leading-tight mb-2">
                        {cat.label}
                      </h4>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-blue-600">
                          Explore Collection
                        </span>
                        <ArrowRight
                          size={12}
                          className="text-blue-600 group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec0;
