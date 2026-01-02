import React from "react";
import Image from "next/image";
import { Phone, MessageCircle, Clock, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const Sec4 = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Tauqeer",
      image: "/team/tauqeer.png",
    },
    {
      name: "Uzair",
      image: "/team/uzair.png",
    },
    {
      name: "Lin",
      image: "/team/lin.png",
    },
    {
      name: "Phoebe",
      image: "/team/phoebe.png",
    },
    {
      name: "Rosa",
      image: "/team/rosa.png",
    },
  ];

  return (
    <section
      id="team"
      className="relative py-8 md:py-15 overflow-hidden bg-linear-to-b from-white via-green-50/20 to-white"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================
            SECTION HEADER WITH 24/7 HIGHLIGHT
            ============================================ */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* 24/7 Availability Badge */}
          <div className="inline-flex items-center space-x-3 bg-linear-to-r from-green-100 to-emerald-100 px-6 py-3 rounded-full border border-green-200 shadow-lg mb-8 animate-pulse">
            <Clock className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-bold">24/7 Available</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D2D44] mb-6 leading-tight">
            Meet Our{" "}
            <span className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Expert Team
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Our dedicated team is here to serve you around the clock. Reach out
            anytime via phone, email, or WhatsApp for instant support and expert
            guidance.
          </p>
        </div>
        {/* ============================================
            BOTTOM CTA - GENERAL CONTACT
            ============================================ */}
        <div className="">
          <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-200 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left side - Text */}
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-green-200 shadow-sm">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 font-semibold text-sm">
                    Pakistan
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#1D2D44]">
                  Need Help? We're Here 24/7
                </h3>
                <p className="text-gray-700 text-lg">
                  Our team is always ready to assist you with any questions
                  about our eco-friendly packaging solutions. Contact us
                  anytime, anywhere.
                </p>

                {/* Contact stats */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#D00000]">
                      24/7
                    </div>
                    <div className="text-sm text-gray-600">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      &lt;5min
                    </div>
                    <div className="text-sm text-gray-600">Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#1D2D44]">
                      100%
                    </div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
              </div>

              {/* Right side - Contact options */}
              <div className="space-y-4">
                {/* General WhatsApp */}
                <Link
                  href="https://wa.me/+923322464729"
                  className="w-full flex items-center justify-between bg-linear-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-whatsapp"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-bold">Chat on WhatsApp</div>
                      <div className="text-sm text-white/80">
                        Instant messaging support
                      </div>
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                {/* General Phone */}
                <button className="w-full flex items-center justify-between bg-linear-to-r from-[#1D2D44] to-[#1D2D44]/90 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">Call Us Now</div>
                      <div className="text-sm text-white/80">
                        Direct phone support
                      </div>
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Email */}
                <button className="w-full flex items-center justify-between bg-white text-[#1D2D44] px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-green-300 group">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Mail className="w-6 h-6 text-[#D00000]" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">Send Email</div>
                      <div className="text-sm text-gray-600">
                        info@mfpackages.com
                      </div>
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ============================================
            TEAM MEMBERS GRID
            ============================================ */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-[#1D2D44] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-2"
            >
              {/* Image container */}
              <div className="relative aspect-square bg-[#1D2D44] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Name */}
              <div className="p-4 text-center">
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {member.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sec4;
