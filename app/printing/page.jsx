import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import PrintingMethodsSection from "@/component/printing/PrintingMethodsSection";

export const metadata = {
  title: "Printing Services | MF Packages",
  description:
    "Explore MF Packages' premium printing services — Gravure and Screen Printing with minimum order quantities, turnaround times, and vibrant custom branding for your packaging.",
  alternates: {
    canonical: "/printing",
  },
};

export default function PrintingPage() {
  return (
    <main className="min-h-screen bg-brand-bg overflow-x-hidden">
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/print-banner.svg"
            alt="Printing Hero Background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-brand-dark/85" />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-brand-orange">Printing</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
            <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
            <span className="text-white/80 text-xs font-black uppercase tracking-[0.2em]">
              Premium Printing Services
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] uppercase mb-6 max-w-4xl">
            Elevate Your Brand With{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-red-400">
              High-End Printing
            </span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg font-medium leading-relaxed max-w-2xl mb-10">
            We transform sustainable packaging into powerful branding assets
            with state-of-the-art printing capabilities. Flawless colors,
            eco-friendly finishes, and rapid turnaround — tailored for the
            global market.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-orange text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-opacity-90 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-brand-orange/30"
            >
              Get A Free Quote
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-md"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRINTING METHODS ────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand-dark/5 shadow-sm mb-6">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark">
                Our Printing Methods
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-4">
              Four Methods,{" "}
              <span className="text-brand-orange">Infinite Possibilities</span>
            </h2>
            <p className="text-brand-dark/50 text-base md:text-lg font-medium max-w-xl mx-auto">
              From short-run digital proofs to million-piece gravure campaigns —
              choose the technology that fits your volume, design, and timeline.
            </p>
          </div>

          {/* Method Cards — interactive client component with "See Samples" modal */}
          <PrintingMethodsSection />
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-brand-dark" />
            <div className="absolute inset-0 bg-linear-to-br from-brand-orange/20 via-transparent to-brand-success/10" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                backgroundSize: "25px 25px",
              }}
            />
            <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-3">
                  Ready to Print?
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Get a Free Printing Quote
                  <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-red-400">
                    Today.
                  </span>
                </h3>
                <p className="text-white/50 text-sm font-medium mt-3 max-w-md">
                  Share your artwork and requirements — our team will come back
                  with a tailored quote within 24 hours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-orange text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-opacity-90 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-brand-orange/30"
                >
                  Get Quote
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-md"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
