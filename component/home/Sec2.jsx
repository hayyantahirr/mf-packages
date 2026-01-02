import React from "react";
import Image from "next/image";

const Sec2 = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-linear-to-b from-white via-slate-50/50 to-white">
      {/* ============================================
          BACKGROUND DECORATIVE ELEMENTS
          Subtle industrial-themed background patterns
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid pattern for industrial feel */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#1D2D44 1px, transparent 1px), linear-gradient(90deg, #1D2D44 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
        {/* Gradient orbs for depth */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-linear-to-br from-[#1D2D44]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-linear-to-tr from-green-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================
            SECTION HEADER
            Introduces the global manufacturing concept
            ============================================ */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          {/* Badge */}
          <div className="inline-flex items-center space-x-3 bg-linear-to-r from-slate-100 to-gray-100 px-6 py-3 rounded-full border border-slate-200 shadow-lg mb-8">
            <svg
              className="w-5 h-5 text-[#1D2D44]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="text-[#1D2D44] font-semibold">
              Our Manufacturing Process
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D2D44] mb-6 leading-tight">
            Global Production,{" "}
            <span className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Local Excellence
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Our biodegradable kraft pouches are manufactured in state-of-the-art
            Chinese facilities, then transported to Pakistan for custom
            printing, branding, and distribution to eco-conscious businesses.
          </p>
        </div>

        {/* ============================================
            PROCESS FLOW INDICATOR
            Visual connection showing China → Pakistan flow
            ============================================ */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex items-center space-x-4 md:space-x-8 bg-white rounded-2xl px-6 md:px-10 py-5 shadow-xl border border-gray-100">
            {/* China Flag */}
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-8 md:w-16 md:h-10 rounded-lg overflow-hidden shadow-md border border-gray-200">
                <Image
                  src="/CN-flag.jpg"
                  alt="China Flag"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[#1D2D44] font-bold text-sm md:text-base">
                Manufacturing
              </span>
            </div>

            {/* Arrow Flow */}
            <div className="flex items-center space-x-2">
              <div className="w-8 md:w-16 h-0.5 bg-linear-to-r from-[#D00000] to-green-500"></div>
              <svg
                className="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </div>

            {/* Pakistan Flag */}
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-8 md:w-16 md:h-10 rounded-lg overflow-hidden shadow-md border border-gray-200">
                <Image
                  src="/PK-flag.png"
                  alt="Pakistan Flag"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[#1D2D44] font-bold text-sm md:text-base">
                Printing & Distribution
              </span>
            </div>
          </div>
        </div>

        {/* ============================================
            STAGE 1: CHINA MANUFACTURING
            Factory imagery showcasing pouch production
            ============================================ */}
        <div className="mb-24">
          {/* Stage Header */}
          <div className="flex items-center space-x-4 mb-10">
            <div className="relative w-14 h-10 rounded-lg overflow-hidden shadow-lg border-2 border-white">
              <Image
                src="/CN-flag.jpg"
                alt="China"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-sm font-semibold text-[#D00000] uppercase tracking-wider">
                Stage 01
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-[#1D2D44]">
                Manufacturing in China
              </h3>
            </div>
          </div>

          {/* Factory Image Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Large Image - Factory Overview */}
            <div className="md:col-span-2 relative group">
              <div className="relative h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                <Image
                  src="/factory-display/pic-1.jpg"
                  alt="Chinese Manufacturing Facility - Pouch Production Line"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-[#1D2D44]/80 via-transparent to-transparent"></div>
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-semibold">
                      Active Production
                    </span>
                  </div>
                  <h4 className="text-white text-2xl md:text-3xl font-bold mb-2">
                    State-of-the-Art Facility
                  </h4>
                  <p className="text-white/80 text-sm md:text-base max-w-lg">
                    Advanced machinery producing biodegradable kraft pouches
                    with precision and efficiency
                  </p>
                </div>
              </div>
            </div>

            {/* Side Images - Production Details */}
            <div className="space-y-6">
              {/* Image 2 - Material Processing */}
              <div className="relative group h-52 md:h-[210px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <Image
                  src="/factory-display/pic-2.jpg"
                  alt="Raw Material Processing"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1D2D44]/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-semibold">
                    Material Processing
                  </span>
                </div>
              </div>

              {/* Image 3 - Quality Control */}
              <div className="relative group h-52 md:h-[210px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <Image
                  src="/factory-display/pic-3.png"
                  alt="Quality Control Station"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1D2D44]/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-semibold">
                    Quality Assurance
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Manufacturing Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Eco-Friendly Materials", icon: "🌱" },
              { label: "Advanced Machinery", icon: "⚙️" },
              { label: "Quality Certified", icon: "✓" },
              { label: "High Capacity", icon: "📦" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white rounded-xl px-4 py-3 shadow-md border border-gray-100"
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-[#1D2D44] font-medium text-sm">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================
            STAGE 2: PAKISTAN PRINTING & DISTRIBUTION
            Printing engineer and branding operations
            ============================================ */}
        <div className="mb-20">
          {/* Stage Header */}
          <div className="flex items-center space-x-4 mb-10">
            <div className="relative w-14 h-10 rounded-lg overflow-hidden shadow-lg border-2 border-white">
              <Image
                src="/PK-flag.png"
                alt="Pakistan"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">
                Stage 02
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-[#1D2D44]">
                Printing & Distribution in Pakistan
              </h3>
            </div>
          </div>

          {/* Pakistan Operations Grid - Reversed Layout */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Side Images - Operations Details */}
            <div className="space-y-6 order-2 md:order-1">
              {/* Image - Printing Setup */}
              <div className="relative group h-52 md:h-[210px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <Image
                  src="/factory-display/pic-4.jpg"
                  alt="Printing Setup"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1D2D44]/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-semibold">
                    Custom Branding
                  </span>
                </div>
              </div>

              {/* Image - Distribution */}
              <div className="relative group h-52 md:h-[210px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <Image
                  src="/factory-display/pic-5.jpg"
                  alt="Distribution Center"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1D2D44]/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-semibold">
                    Ready for Distribution
                  </span>
                </div>
              </div>
            </div>

            {/* Main Large Image - Printing Engineer */}
            <div className="md:col-span-2 relative group order-1 md:order-2">
              <div className="relative h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                <Image
                  src="/printing-engineer.png"
                  alt="Printing Engineer - Custom Pouch Printing in Pakistan"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-[#1D2D44]/80 via-transparent to-transparent"></div>
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-semibold">
                      Expert Team
                    </span>
                  </div>
                  <h4 className="text-white text-2xl md:text-3xl font-bold mb-2">
                    Precision Printing
                  </h4>
                  <p className="text-white/80 text-sm md:text-base max-w-lg">
                    Our skilled engineers deliver vibrant, high-quality custom
                    prints for your brand identity
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Printing & Distribution Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Custom Designs", icon: "🎨" },
              { label: "Vibrant Colors", icon: "🌈" },
              { label: "Fast Turnaround", icon: "⚡" },
              { label: "Nationwide Delivery", icon: "🚚" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white rounded-xl px-4 py-3 shadow-md border border-gray-100"
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-[#1D2D44] font-medium text-sm">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================
            CAPABILITIES FOOTER
            Key manufacturing strengths and value props
            ============================================ */}
        <div className="relative">
          <div className="bg-linear-to-r from-[#1D2D44] via-[#1D2D44]/98 to-[#1D2D44] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              ></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#D00000]/10 rounded-full blur-3xl"></div>

            <div className="relative">
              {/* Header */}
              <div className="text-center mb-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Why Choose Our Process?
                </h3>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                  Combining international manufacturing excellence with local
                  expertise for unmatched quality
                </p>
              </div>

              {/* Capabilities Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Sustainable",
                    desc: "100% biodegradable materials",
                    icon: "🌍",
                  },
                  {
                    title: "Efficient",
                    desc: "Streamlined production process",
                    icon: "⚡",
                  },
                  {
                    title: "Quality",
                    desc: "International standards certified",
                    icon: "✨",
                  },
                  {
                    title: "Reliable",
                    desc: "Consistent delivery timelines",
                    icon: "🤝",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <div className="text-white font-bold text-lg mb-2">
                      {item.title}
                    </div>
                    <div className="text-white/60 text-sm">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec2;
