import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, ShieldCheck, Globe } from "lucide-react";
import HeroSlideshow from "./HeroSlideshow";

/**
 * Hero — Server Component
 *
 * Renders the static shell of the Hero section on the server:
 *  - Section layout, left column text frame, CTA buttons, trust signals
 *
 * HeroSlideshow (client boundary, ./HeroSlideshow.jsx) renders:
 *  - The animated badge, dynamic title word, and subtext (left column)
 *  - The auto-rotating product image panel (right column, absolutely positioned)
 */
const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-brand-bg">
      {/* ── Left Column: Content ─────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end px-4 sm:px-8 lg:px-16 pt-32 lg:pt-36 pb-12 lg:pb-10">
        <div className="max-w-xl w-full space-y-8">
          {/*
           * HeroSlideshow owns the badge + animated title word + subtext + image panel.
           * It is the sole "use client" boundary — everything above this line is SSR'd.
           */}
          <HeroSlideshow />

          {/* CTA Buttons — static, rendered on the server */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/shop"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-dark text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-orange transition-all duration-500 shadow-xl shadow-brand-dark/20 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Shop
                <ShoppingBag
                  size={18}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
              </span>
              <div className="absolute inset-0 bg-brand-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/40 backdrop-blur-md text-brand-dark border border-white/60 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/60 transition-all duration-300 shadow-lg"
            >
              Our Process
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Trust Signals — static, rendered on the server */}
          <div className="flex items-center gap-8 pt-8 border-t border-brand-dark/5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-brand-success" size={24} />
              <div className="text-xs font-bold text-brand-dark/60 uppercase tracking-widest leading-tight">
                Certified <br /> Quality
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="text-brand-orange" size={24} />
              <div className="text-xs font-bold text-brand-dark/60 uppercase tracking-widest leading-tight">
                Global <br /> Shipping
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
       * ── Right Column placeholder ───────────────────────────────────────
       * The actual image panel is rendered by HeroSlideshow using
       * `position: absolute` on lg screens so it fills this 50% slot
       * without needing a wrapper div here.
       */}
    </section>
  );
};

export default Hero;
