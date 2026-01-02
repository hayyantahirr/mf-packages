import React from "react";
import {
  Leaf,
  Globe,
  TrendingUp,
  Recycle,
  Shield,
  Heart,
  Sprout,
  Factory,
} from "lucide-react";

const Sec1 = () => {
  const features = [
    {
      icon: Globe,
      title: "Protecting Our Planet",
      description:
        "Reducing plastic waste by providing 100% biodegradable packaging solutions that naturally decompose without harming the environment.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Leaf,
      title: "Sustainable Materials",
      description:
        "Using eco-friendly, renewable resources that minimize carbon footprint and preserve natural ecosystems for future generations.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      icon: TrendingUp,
      title: "Economic Growth",
      description:
        "Driving Pakistan's green economy forward by creating jobs and establishing a sustainable packaging industry that benefits everyone.",
      color: "from-[#D00000] to-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Recycle,
      title: "Circular Economy",
      description:
        "Promoting a waste-free future where packaging materials return to nature, completing the cycle of sustainability.",
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50",
    },
  ];

  const stats = [
    {
      icon: Sprout,
      value: "100%",
      label: "Biodegradable",
      description: "Fully decomposable materials",
    },
    {
      icon: Factory,
      value: "Zero",
      label: "Plastic Waste",
      description: "No harmful residues",
    },
    {
      icon: Heart,
      value: "Safe",
      label: "Food Grade",
      description: "Certified quality",
    },
    {
      icon: Globe,
      value: "Green",
      label: "Future",
      description: "Sustainable tomorrow",
    },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-linear-to-b from-[#00416b] via-green-50/30 to-[#00416b]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 bg-linear-to-r from-green-100 to-emerald-100 px-5 py-2 rounded-full border border-green-200 shadow-lg mb-6">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-semibold">Our Mission</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f1ead6] mb-6 leading-tight">
            Building a{" "}
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Greener Future
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                fill="none"
              >
                <path
                  d="M2 6C40 3 80 2 120 4C160 6 180 7 198 5"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
           
          </h2>

          <p className="text-lg md:text-xl text-[#ffffff] opacity-35 ">
            At MF Packages, we're committed to revolutionizing Pakistan's
            packaging industry through sustainable innovation. Our goal is to
            protect the environment while empowering businesses with
            eco-friendly solutions that drive economic growth.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="cursor-pointer group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Decorative Corner */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 ${feature.bgColor} opacity-20 rounded-bl-full rounded-tr-2xl transition-all duration-500 group-hover:w-32 group-hover:h-32`}
              ></div>

              {/* Icon */}
              <div className="relative mb-6">
                <div
                  className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${feature.color} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-[#1D2D44] mb-4 group-hover:text-green-700 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Line */}
              <div
                className={`absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r ${feature.color} group-hover:w-full transition-all duration-500 rounded-b-2xl `}
              ></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="relative">
          <div className="bg-linear-to-r from-[#1D2D44] via-[#1D2D44]/95 to-[#1D2D44] rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 overflow-hidden cursor-pointer">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              ></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#D00000]/10 rounded-full blur-3xl"></div>

            <div className="relative">
              {/* Stats Header */}
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Our Commitment to Excellence
                </h3>
                <p className="text-white/80 text-lg max-w-2xl mx-auto">
                  Every package we create is a step towards a sustainable future
                  for the planet
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid  md:grid-cols-4 gap-6 md:gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300 hover:scale-105"
                  >
                    <div className="inline-flex p-3 rounded-xl bg-linear-to-br from-green-400 to-emerald-500 mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-green-400 font-semibold mb-1">
                      {stat.label}
                    </div>
                    <div className="text-white/60 text-sm">
                      {stat.description}
                    </div>
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

export default Sec1;
