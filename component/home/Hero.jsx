"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  ArrowRight,
  Leaf,
  ShieldCheck,
  Globe,
} from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-brand-bg">
      {/* Left Column: Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end px-4 sm:px-8 lg:px-16 pt-32 lg:pt-36 pb-12 lg:pb-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl space-y-8"
        >
          <div className="space-y-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 border border-white/60 backdrop-blur-md shadow-sm"
            >
              <Leaf size={16} className="text-brand-success" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark">
                Eco-Friendly Solutions
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-dark tracking-tight leading-[1.1] uppercase">
              Premium <br />
              <span className="text-brand-orange">Sustainable</span> <br />
              Packaging
            </h1>

            {/* Subtext */}
            <p className="text-brand-dark/70 text-lg md:text-xl font-medium leading-relaxed">
              We provide high-fidelity, eco-friendly packaging solutions
              tailored for global brands. Elevate your product presentation with
              our state-of-the-art printing and sustainable materials.
            </p>
          </div>

          {/* CTA Buttons */}
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

          {/* Trust Signals */}
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
        </motion.div>
      </div>

      {/* Right Column: Visual Component (Covering 50% of the screen) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-screen"
      >
        <Image
          src="/home_banner.png"
          alt="MF Packages Premium Solutions"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle Gradient Overlay on Image for better text transition on small screens */}
        <div className="absolute inset-0 bg-linear-to-r from-brand-bg/20 to-transparent lg:hidden" />
      </motion.div>
    </section>
  );
};

export default Hero;
