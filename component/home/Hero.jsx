"use client";
import React from "react";
import Carousel from "./Carousel";
import { Leaf, Recycle, Shield, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-linear-to-br from-white via-green-50/30 to-blue-50/30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#D00000]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Decorative Leaf Patterns */}
        <div className="absolute top-40 right-1/4 opacity-5">
          <Leaf
            className="w-32 h-32 text-green-600 animate-spin"
            style={{ animationDuration: "20s" }}
          />
        </div>
        <div className="absolute bottom-40 left-1/4 opacity-5">
          <Recycle
            className="w-24 h-24 text-[#1D2D44] animate-spin"
            style={{ animationDuration: "15s", animationDirection: "reverse" }}
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Eco Badge */}
            <div className="inline-flex items-center space-x-2 bg-linear-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full border border-green-200 shadow-lg">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-semibold text-sm">
                100% Eco-Friendly Solutions
              </span>
              <Leaf className="w-4 h-4 text-green-600 animate-pulse" />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-[#1D2D44] block">MF Packages</span>
                <span className="bg-linear-to-r from-[#D00000] via-[#D00000]/80 to-[#D00000] bg-clip-text text-transparent block mt-2">
                  Redefining
                </span>
                <span className="text-[#1D2D44] block">the Future of</span>
                <span className="relative inline-block">
                  <span className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Food Packaging
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="12"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C50 5 100 2 150 5C200 8 250 10 298 7"
                      stroke="#D00000"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="animate-draw-line"
                    />
                  </svg>
                </span>
                <span className="text-[#1D2D44] block">in Pakistan.</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl">
              Transforming Pakistan's packaging industry with{" "}
              <span className="font-semibold text-green-600">
                biodegradable
              </span>{" "}
              and{" "}
              <span className="font-semibold text-[#1D2D44]">
                sustainable solutions
              </span>{" "}
              that protect both your food and our planet.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg border border-[#1D2D44]/10 hover:scale-105 transition-transform duration-300">
                <Shield className="w-5 h-5 text-[#D00000]" />
                <span className="text-[#1D2D44] font-medium">Food Safe</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg border border-green-200 hover:scale-105 transition-transform duration-300">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="text-[#1D2D44] font-medium">
                  Biodegradable
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg border border-blue-200 hover:scale-105 transition-transform duration-300">
                <Recycle className="w-5 h-5 text-blue-600" />
                <span className="text-[#1D2D44] font-medium">Sustainable</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-linear-to-r from-[#D00000] to-[#D00000]/90 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <span className="relative z-10">Explore Products</span>
                <div className="absolute inset-0 bg-linear-to-r from-[#D00000]/90 to-[#D00000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group relative px-8 py-4 bg-white/80 backdrop-blur-sm text-[#1D2D44] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-[#1D2D44]/20 hover:border-[#1D2D44]/40">
                <span className="relative z-10">Learn More</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#D00000]">
                  100%
                </div>
                <div className="text-sm text-gray-600 mt-1">Eco-Friendly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  Safe
                </div>
                <div className="text-sm text-gray-600 mt-1">Food Grade</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1D2D44]">
                  Made
                </div>
                <div className="text-sm text-gray-600 mt-1">in Pakistan</div>
              </div>
            </div>
          </div>

          {/* Right Side - Carousel */}
          <div className="relative h-[600px] lg:h-[700px]">
            <Carousel />
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="url(#wave-gradient)"
            fillOpacity="0.1"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#1D2D44" />
              <stop offset="50%" stopColor="#D00000" />
              <stop offset="100%" stopColor="#1D2D44" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
