import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Sec5 = () => {
  return (
    <section className="relative py-0  bg-brand-bg">
      <div className="container mx-auto px-0 sm:px-7 lg:px-8 max-w-8xl">
        <div className="relative rounded-none sm:rounded-[2.5rem] overflow-hidden min-h-[660px] sm:min-h-[580px] lg:min-h-[640px] flex items-start pt-8 justify-start p-6 sm:p-12 lg:p-20 shadow-2xl border-y sm:border border-white/10 group">
          {/* Background Banner Image */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            {/* Desktop Banner */}
            <div className="hidden sm:block absolute inset-0">
              <Image
                src="/print-banner.svg"
                alt="Premium Printing Banner"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            {/* Mobile Banner */}
            <div className="block sm:hidden absolute inset-0">
              <Image
                src="/printing-mobile-view.svg"
                alt="Premium Printing Banner Mobile"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            {/* Multi-layered Premium Gradient Overlay for extreme text readability (hidden on mobile, visible on desktop) */}
            <div className="hidden sm:block absolute inset-0 bg-linear-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/30 lg:from-brand-dark/95 lg:via-brand-dark/70 lg:to-transparent" />
          </div>

          {/* MF Packages Branding Corner Badge */}
          <div className="hidden sm:flex absolute top-10 right-12 z-20 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl select-none">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <Image
                src="/logo.png"
                alt="MF Packages Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-white text-xs sm:text-sm font-black uppercase tracking-wider leading-none">
                MF Packages
              </span>
              <span className="text-[8px] sm:text-[9px] text-white/60 font-bold uppercase tracking-widest mt-0.5">
                Premium
              </span>
            </div>
          </div>

          {/* Section Content */}
          <div className="relative z-10 max-w-xl lg:max-w-2xl flex flex-col items-start text-left bg-brand-dark/40 sm:bg-transparent p-5 sm:p-5 rounded-3xl backdrop-blur-xs sm:backdrop-blur-none border border-white/5 sm:border-none shadow-xl sm:shadow-none">
            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight uppercase mb-4">
              Elevate Your Brand <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-red-400">
                With High-End Printing
              </span>
            </h2>

            {/* Paragraph */}
            <p className="text-white/80 text-xs sm:text-base font-medium leading-relaxed mb-6 max-w-xl">
              We transform sustainable packaging into powerful branding assets
              with our state-of-the-art printing capabilities. Achieve flawless
              colors, eco-friendly finishes, and rapid turnaround times tailored
              for the global market.
            </p>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 bg-brand-orange text-white rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:bg-opacity-95 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-brand-orange/30 group/btn"
              >
                Shop Products
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-md"
              >
                Get A Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec5;
