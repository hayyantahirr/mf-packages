/**
 * Section 3: Certifications & Quality Assurance
 *
 * This client-side component displays MF Packages' quality certifications
 * in a custom carousel with responsive slide counts, infinite scrolling,
 * and side navigation buttons.
 *
 * Responsive Behavior:
 * - Mobile (< 640px): 1 slide visible
 * - Tablet (640px - 768px): 2 slides visible
 * - Medium (768px - 1024px): 3 slides visible
 * - Large (1024px - 1280px): 4 slides visible
 * - XL (>= 1280px): 5 slides visible
 *
 * Images Used:
 * - /certificates/1.jpg through 5.jpg - Quality certification documents
 *
 * Background: Dark blue (#1D2D44) matching the navbar theme
 */

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Sec3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Certificate data array
  const certificates = [
    { id: 1, image: "/certificates/1.jpg", title: "Quality Certification 1" },
    { id: 2, image: "/certificates/2.jpg", title: "Quality Certification 2" },
    { id: 3, image: "/certificates/3.jpg", title: "Quality Certification 3" },
    { id: 4, image: "/certificates/4.jpg", title: "Quality Certification 4" },
    { id: 5, image: "/certificates/5.jpg", title: "Quality Certification 5" },
  ];

  // Create infinite loop by duplicating certificates
  const infiniteCertificates = [
    ...certificates,
    ...certificates,
    ...certificates,
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handle next slide
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => {
      setIsAnimating(false);
      // Reset to beginning when reaching the end of first set
      if (currentIndex >= certificates.length) {
        setCurrentIndex(0);
      }
    }, 500);
  };

  // Handle previous slide
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (currentIndex === 0) {
      // Jump to the end of first set without animation
      setCurrentIndex(certificates.length);
      setTimeout(() => {
        setCurrentIndex(certificates.length - 1);
        setIsAnimating(false);
      }, 50);
    } else {
      setCurrentIndex((prev) => prev - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <section id="certifications" className="relative py-7 md:py-15 overflow-hidden bg-[#1D2D44]">
      <div className="relative max-w-7xl mx-auto px-4  md:px-8">
        {/* ============================================
            SECTION HEADER
            Introduces certifications and quality commitment
            ============================================ */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          {/* Badge */}
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg mb-8">
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-white font-semibold">Certified Quality</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 ">
            Trusted{" "}
            <span className="bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>

          {/* Description */}
          <p className="text-md md:text-lg text-white/70 ">
            Our commitment to quality is backed by international certifications
            and rigorous standards, ensuring every product meets the highest
            safety and environmental requirements.
          </p>
        </div>

        {/* ============================================
            CUSTOM CAROUSEL WITH SIDE NAVIGATION
            Responsive: 1 slide (mobile) to 5 slides (desktop)
            ============================================ */}
        <div className="mb-5">
          {/* Carousel Layout with Side Navigation */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Previous Button - Left Side */}
            <button
              onClick={handlePrev}
              className="shrink-0 p-3 md:p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 hover:scale-110 shadow-xl group"
              aria-label="Previous Certificates"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-green-400 transition-colors" />
            </button>

            {/* Carousel Container */}
            <div className="flex-1 overflow-hidden">
              <div
                className="flex gap-3 md:gap-4 lg:gap-6 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {infiniteCertificates.map((cert, index) => (
                  <div
                    key={`${cert.id}-${index}`}
                    className="shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                  >
                    <div className="group relative ">
                      {/* Certificate Image Container */}
                      <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-white shadow-2xl">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          className="transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-[#1D2D44]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center space-x-2 text-white">
                              <svg
                                className="w-4 h-4 text-green-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-xs font-semibold">
                                Verified
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button - Right Side */}
            <button
              onClick={handleNext}
              className="shrink-0 p-3 md:p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 hover:scale-110 shadow-xl group"
              aria-label="Next Certificates"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-green-400 transition-colors" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex % certificates.length === index
                    ? "w-8 h-2 bg-green-400"
                    : "w-2 h-2 bg-white/30 hover:bg-white/50 cursor-pointer"
                }`}
                aria-label={`Go to certificate ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec3;
