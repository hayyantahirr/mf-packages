import React from "react";
import Carousel from "./Carousel";
import { Leaf, Recycle, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-linear-to-br ">
      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Eco Badge */}
            <div className="inline-flex items-center space-x-1 bg-linear-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full border border-green-200 shadow-lg">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-semibold text-sm">
                100% Eco-Friendly Solutions
              </span>
              <Leaf className="w-4 h-4 text-green-600 animate-pulse" />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-[4rem]  font-bold">
                <span className="text-[#cdeaf9] block">MF Packages</span>
                <span className="text-[#D00000] font-extrabold mt-2">
                  Redefining
                </span>
                <span className="text-[#cdeaf9] block">the Future of</span>
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

                <span className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent block">
                  <span className="text-[#cdeaf9]">in</span> Pakistan.
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#f1ead6] leading-relaxed max-w-xl">
              Transforming Pakistan's packaging industry with{" "}
              <span className="font-semibold text-green-600">
                biodegradable
              </span>{" "}
              and{" "}
              <span className="font-semibold text-[#cdeaf9]">
                sustainable solutions
              </span>{" "}
              that protect both your food and our planet.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={"/shop"}
                className="group relative px-8 py-4 bg-linear-to-r from-[#D00000] to-[#D00000]/90 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Explore Products</span>
                <div className="absolute inset-0 bg-linear-to-r from-[#D00000]/90 to-[#D00000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                href={"/about"}
                className="group relative px-8 py-4 bg-white/80 backdrop-blur-sm text-[#1D2D44] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-[#1D2D44]/20 hover:border-[#1D2D44]/40"
              >
                <span className="relative z-10">Learn More</span>
              </Link>
            </div>
          </div>

          {/* Right Side - Carousel */}
          <div className="relative h-[600px] lg:h-[700px] ">
            <Carousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
