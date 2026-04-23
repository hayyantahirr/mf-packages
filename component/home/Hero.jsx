"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Leaf, ShieldCheck, Globe } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-bg pt-32 lg:pt-48 pb-20 lg:pb-32">
      {/* Background Decorative Elements */}
      
      {/* Mesh Gradient Overlay */}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
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
              <p className="text-brand-dark/70 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                We provide high-fidelity, eco-friendly packaging solutions tailored for global brands. Elevate your product presentation with our state-of-the-art printing and sustainable materials.
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
                  <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform duration-300" />
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

          {/* Right Column: Visual Component */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Main Product Image Container */}
            <div className="relative aspect-square w-full max-w-[500px] mx-auto">
              {/* Background Shapes */}
              <div className="absolute inset-0 bg-linear-to-br from-brand-orange/20 to-brand-success/20 rounded-3xl rotate-6 -z-10 blur-2xl" />
              <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white/60 shadow-2xl" />
              
              {/* Product Mockup */}
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 flex items-center justify-center p-12"
              >
                <Image
                  src="/carousel/coffee-flat-bottom.png"
                  alt="Premium Coffee Packaging"
                  width={400}
                  height={400}
                  className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white p-4 flex items-center justify-center"
              >
                <Image
                  src="/carousel/almunium-retort-pouch.png"
                  alt="Aluminum Pouch"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </motion.div>

              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-10 -left-10 w-28 h-28 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white p-4 flex items-center justify-center"
              >
                <Image
                  src="/carousel/brown-kraft-flat-bottom.png"
                  alt="Kraft Paper Pouch"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/40">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-brand-dark/40 to-transparent" />
      </motion.div> */}
    </section>
  );
};

export default Hero;