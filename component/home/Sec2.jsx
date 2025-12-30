import React from "react";
import Image from "next/image";
import {
  Factory,
  Printer,
  Globe2,
  MapPin,
  Zap,
  CheckCircle2,
  ArrowRight,
  Settings,
} from "lucide-react";

const Sec2 = () => {
  const productionSteps = [
    {
      id: 0,
      country: "China",
      icon: Factory,
      title: "Premium Production",
      description:
        "State-of-the-art manufacturing facilities in China produce high-quality biodegradable pouches using advanced technology and sustainable materials.",
      features: [
        "Advanced Machinery",
        "Quality Materials",
        "Eco-Friendly Process",
      ],
      color: "from-blue-500 to-cyan-500",
      flag: "🇨🇳",
    },
    {
      id: 1,
      country: "Pakistan",
      icon: Printer,
      title: "Custom Printing",
      description:
        "Our expert printing engineers in Pakistan bring your brand to life with precision printing, custom designs, and vibrant colors on every pouch.",
      features: ["Custom Designs", "Vibrant Colors", "Expert Engineers"],
      color: "from-green-500 to-emerald-500",
      flag: "🇵🇰",
    },
  ];

  return (
    <section className="relative py-10 md:py-20 overflow-hidden bg-linear-to-b from-white via-blue-50/20 to-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-linear-to-r from-blue-100 to-cyan-100 px-5 py-2 rounded-full border border-blue-200 shadow-lg mb-6">
            <Factory className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-semibold">Our Process</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#00416b] mb-6 leading-tight">
            Global Production,{" "}
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Local Excellence
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                fill="none"
              >
                <path
                  d="M2 6C40 3 80 2 120 4C160 6 180 7 198 5"
                  stroke="#D00000"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[#f1ead6] leading-relaxed">
            Combining international manufacturing excellence with Pakistani
            craftsmanship to deliver world-class packaging solutions
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Side - Image Section */}
          <div className="relative order-2 lg:order-1 ">
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <div className="absolute inset-0 bg-linear-to-br from-[#1D2D44]/20 to-transparent z-10"></div>
                <Image
                  src="/printing-engineer.png"
                  alt="Printing Engineer at Work"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-linear-to-br from-[#D00000] to-[#D00000]/80 text-white px-6 py-3 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm">Projects Done</div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-linear-to-br from-[#1D2D44] to-[#1D2D44]/80 text-white px-6 py-3 rounded-2xl shadow-2xl transform -rotate-3 hover:-rotate-6 transition-transform duration-300">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Production</div>
              </div>
            </div>
          </div>

          {/* Right Side - Process Steps */}
          <div className="space-y-8 order-1 lg:order-2">
            {productionSteps.map((step, index) => (
              <div
                key={step.id}
                className="relative transition-all duration-500"
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:border-green-200 transition-all duration-500">
                  {/* Step Number & Flag */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-4 rounded-2xl bg-linear-to-br ${step.color} shadow-lg`}
                      >
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-3xl">{step.flag}</span>
                          <MapPin className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="text-sm font-semibold text-gray-500">
                          Step {index + 1}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-600">
                      {step.country}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-[#1D2D44] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {step.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-1 bg-linear-to-r from-green-50 to-emerald-50 px-2 py-2 rounded-lg border border-green-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec2;
