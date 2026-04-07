"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Section 3: Certifications & Quality Assurance
 *
 * Features:
 * - High-performance infinite loop via Swiper.js
 * - Responsive breakpoints: Desktop (4), Tablet (2), Mobile (1)
 * - Custom navigation buttons in Brand Orange
 * - Custom pagination dots (Active: Orange, Inactive: Cool Gray)
 * - Premium hover effects (Zoom/Lift)
 */
const Sec3 = () => {
  // Certificate data array
  const certificates = [
    { id: 1, image: "/certificates/1.jpg", title: "Global ISO Standard" },
    { id: 2, image: "/certificates/2.jpg", title: "Eco-Friendly Certified" },
    { id: 3, image: "/certificates/3.jpg", title: "Industrial Grade Quality" },
    {
      id: 4,
      image: "/certificates/4.jpg",
      title: "Material Safety Compliance",
    },
    { id: 5, image: "/certificates/5.jpg", title: "Sustainability Award" },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section
      id="certifications"
      className="relative py-24 overflow-hidden bg-white"
    >
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-3 bg-brand-section px-5 py-2.5 rounded-full border border-brand-dark/5 shadow-sm mb-6">
            <ShieldCheck className="w-5 h-5 text-brand-success" />
            <span className="text-brand-dark font-bold text-sm tracking-wide">
              Industry Certified
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-6">
            Excellence You Can <span className="text-brand-success">Trust</span>
          </h2>

          <p className="text-lg text-brand-dark/60 leading-relaxed font-medium">
            Our food-grade kraft pouches undergo rigorous international testing
            to ensure they exceed global standards for safety and
            sustainability.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative p-4 group">
          {/* Custom Navigation - Left Button */}
          <button
            ref={prevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white text-brand-dark rounded-full shadow-lg active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Custom Navigation - Right Button */}
          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white text-brand-dark rounded-full shadow-lg  active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            speed={800}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            pagination={{
              clickable: true,
              horizontalClass: "custom-pagination-container",
              bulletClass: "custom-bullet",
              bulletActiveClass: "custom-bullet-active",
            }}
            className="pl-5 pr-5"
          >
            {certificates.map((cert) => (
              <SwiperSlide key={cert.id}>
                <div className="group relative transition-all duration-500 p-5">
                  <div className="relative aspect-3/4 overflow-hidden">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-contain transition-transform duration-700"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .custom-pagination-container {
          display: flex !important;
          justify-content: center !important;
          gap: 12px !important;
          bottom: 5px !important;
        }
        .custom-bullet {
          width: 10px !important;
          height: 10px !important;
          border-radius: 50% !important;
          background: gray !important;
          opacity: 1 !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          border: 2px solid transparent !important;
        }
        .custom-bullet-active {
          background: #10b981 !important;
          transform: scale(1.3) !important;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.3) !important;
        }
      `}</style>
    </section>
  );
};

export default Sec3;
