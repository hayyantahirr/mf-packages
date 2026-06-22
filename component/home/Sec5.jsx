import React from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const Sec5 = () => {
  return (
    <section className="relative py-12 bg-brand-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-8xl">
        <div className="relative rounded-[2.5rem] overflow-hidden min-h-[500px] lg:min-h-[580px] flex items-center justify-start p-8 sm:p-12 lg:p-20 shadow-2xl border border-white/10 group">
          {/* Background Banner Image */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src="/print-banner.svg"
              alt="Premium Printing Banner"
              fill
              priority
              className="object-cover object-center "
            />
            {/* Multi-layered Premium Gradient Overlay for extreme text readability */}
            <div className="absolute inset-0 bg-linear-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/30 lg:from-brand-dark/95 lg:via-brand-dark/70 lg:to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-brand-dark/60 via-transparent to-brand-dark/40" />
          </div>

          {/* MF Packages Branding Corner Badge */}
          <div className="absolute top-6 right-6 sm:top-10 sm:right-12 z-20 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl select-none">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <Image
                src="/logo.png"
                alt="MF Packages Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xs sm:text-sm font-black uppercase tracking-wider leading-none">
                MF Packages
              </span>
              <span className="text-[8px] sm:text-[9px] text-white/60 font-bold uppercase tracking-widest mt-0.5">
                Premium
              </span>
            </div>
          </div>

          {/* Section Content */}
          <div className="relative z-10 max-w-xl lg:max-w-2xl flex flex-col items-start text-left">
            {/* Animated Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/20 border border-brand-orange/30 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                Premium Custom Printing
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight uppercase mb-6">
              Elevate Your Brand <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-400">
                With High-End Printing
              </span>
            </h2>

            {/* Paragraph */}
            <p className="text-white/80 text-base sm:text-lg font-medium leading-relaxed mb-8 max-w-xl">
              We transform sustainable packaging into powerful branding assets
              with our state-of-the-art printing capabilities. Achieve flawless
              colors, eco-friendly finishes, and rapid turnaround times tailored
              for the global market.
            </p>

            {/* Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-8">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CheckCircle2
                  className="text-brand-orange shrink-0"
                  size={16}
                />
                <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider">
                  High-Fidelity Colors
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CheckCircle2
                  className="text-brand-orange shrink-0"
                  size={16}
                />
                <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider">
                  Eco-Friendly Inks
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CheckCircle2
                  className="text-brand-orange shrink-0"
                  size={16}
                />
                <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider">
                  Rapid Turnaround
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-orange text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-opacity-95 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-brand-orange/30 group/btn"
              >
                Shop Products
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-md"
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
