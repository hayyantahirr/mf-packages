import React from "react";
import Image from "next/image";

const Sec2 = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-brand-bg">
      {/* BACKGROUND DECORATIVE ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--color-brand-orange) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-orange) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-success/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-brand-orange/10 shadow-sm mb-6">
            <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></div>
            <span className="text-brand-dark text-xs font-bold uppercase tracking-wider">
              Our Manufacturing Process
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-4 leading-tight">
            Global Production,{" "}
            <span className="text-brand-orange">
              Local Excellence
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Our biodegradable kraft pouches are manufactured in state-of-the-art
            Chinese facilities, then transported to Pakistan for custom
            printing, branding, and distribution.
          </p>
        </div>

        {/* PROCESS FLOW INDICATOR */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-3 md:space-x-6 bg-white/50 backdrop-blur-md rounded-2xl px-5 md:px-8 py-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-6 md:w-12 md:h-8 rounded overflow-hidden shadow-sm border border-gray-100">
                <Image src="/CN-flag.jpg" alt="China" fill className="object-cover" />
              </div>
              <span className="text-brand-dark font-bold text-xs md:text-sm">China</span>
            </div>

            <div className="flex items-center space-x-1">
              <div className="w-6 md:w-12 h-0.5 bg-brand-orange/20"></div>
              <svg className="w-4 h-4 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
              <div className="w-6 md:w-12 h-0.5 bg-brand-success/20"></div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-6 md:w-12 md:h-8 rounded overflow-hidden shadow-sm border border-gray-100">
                <Image src="/PK-flag.png" alt="Pakistan" fill className="object-cover" />
              </div>
              <span className="text-brand-dark font-bold text-xs md:text-sm">Pakistan</span>
            </div>
          </div>
        </div>

        {/* STAGE 1: CHINA MANUFACTURING */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Imagery Column */}
            <div className="w-full lg:w-3/5 space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="px-3 py-1 bg-brand-orange/10 border border-brand-orange/20 rounded-md">
                  <span className="text-xs font-bold text-brand-orange uppercase">Stage 01</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-text">Manufacturing in China</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group col-span-2">
                  <Image src="/factory-display/pic-1.jpg" alt="Production Line" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-bold">State-of-the-Art Production</p>
                  </div>
                </div>
                <div className="relative h-40 md:h-48 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                  <Image src="/factory-display/pic-2.jpg" alt="Material" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="relative h-40 md:h-48 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                  <Image src="/factory-display/pic-3.png" alt="QC" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Features Column */}
            <div className="w-full lg:w-2/5 lg:pt-16">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-lg font-bold text-brand-dark mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Manufacturing Strengths
                </h4>
                <div className="space-y-4">
                  {[
                    { label: "Eco-Friendly Materials", desc: "Sustainably sourced kraft paper and bioplastics.", icon: "🌱" },
                    { label: "Precision Machinery", desc: "High-accuracy pouch forming for leak-proof sealing.", icon: "⚙️" },
                    { label: "Certified Quality Control", desc: "Rigorous testing at every production stage.", icon: "✓" },
                    { label: "Scalable Capacity", desc: "Meeting bulk demands with consistent quality.", icon: "📦" },
                  ].map((item, i) => (
                    <div key={i} className="flex space-x-4 p-3 rounded-xl hover:bg-brand-section transition-colors">
                      <span className="text-xl shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-brand-dark">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>            {/* STAGE 2: PAKISTAN PRINTING & DISTRIBUTION */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row-reverse gap-10 items-start">
            {/* Imagery Column */}
            <div className="w-full lg:w-3/5 space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="px-3 py-1 bg-brand-success/10 border border-brand-success/20 rounded-md">
                  <span className="text-xs font-bold text-brand-success uppercase">Stage 02</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-text">Printing & Distribution</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group col-span-2">
                  <Image src="/printing-engineer.png" alt="Printing Engineer" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-bold">Expert Custom Branding</p>
                  </div>
                </div>
                <div className="relative h-40 md:h-48 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                  <Image src="/factory-display/pic-4.jpg" alt="Printing" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="relative h-40 md:h-48 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                  <Image src="/factory-display/pic-5.jpg" alt="Distribution" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Features Column */}
            <div className="w-full lg:w-2/5 lg:pt-16">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-lg font-bold text-brand-dark mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-brand-success/10 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-brand-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  Local Operations
                </h4>
                <div className="space-y-4">
                  {[
                    { label: "Custom Designs", desc: "Bespoke branding tailored to your product.", icon: "🎨" },
                    { label: "Vibrant Printing", desc: "High-quality inks for stand-out shelf appeal.", icon: "🌈" },
                    { label: "Fast Turnaround", desc: "Local processing for quicker delivery times.", icon: "⚡" },
                    { label: "Nationwide Delivery", desc: "Safe shipping across all major cities in Pakistan.", icon: "🚚" },
                  ].map((item, i) => (
                    <div key={i} className="flex space-x-4 p-3 rounded-xl hover:bg-brand-section transition-colors">
                      <span className="text-xl shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-brand-dark">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec2;
