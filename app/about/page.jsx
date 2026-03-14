import React from "react";
import Image from "next/image";
import { 
  Building2, 
  Users2, 
  Cpu, 
  ShieldCheck, 
  Globe2, 
  Truck, 
  Award, 
  Leaf 
} from "lucide-react";
import Link from "next/link";
import FAQs from "@/component/FAQs";
/**
 * AboutPage Component
 * A premium, server-side rendered "About Us" page for MF Packages.
 * Highlighting global presence, technical excellence, and sustainability.
 */
export default async function AboutPage() {
  return (
    <main className="min-h-screen text-white bg-[#1D2D44] selection:bg-[#D00000]/30">
      {/* 1. Hero Section: Company Identity & Global Presence */}
      <section className="relative py-16 px-5 overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 animate-fade-in text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D00000]/10 border border-[#D00000]/20 text-[#D00000] text-xs font-medium uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Est. 2018 | USA · China · Pakistan</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Crafting Excellence, <br />
              <span className="bg-gradient-to-r from-[#D00000] to-red-600 bg-clip-text text-transparent">
                Defining the Future.
              </span>
            </h1>
            <p className="text-base text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
              MF-Packages LLC, registered in the USA, is a premier printing and packaging specialist with a global manufacturing footprint in China and Pakistan. Since 2018, we have been dedicated to merging technical innovation with sustainable practices.
            </p>
          </div>
          
          <div className="relative group overflow-hidden rounded-2xl border border-white/10 shadow-xl max-w-md mx-auto lg:ml-auto lg:mr-0">
            <Image 
              src={"/about/factory.png"} 
              alt="MF Packages Printing Facility" 
              width={600} 
              height={450}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D2D44] via-transparent to-transparent opacity-40" />
          </div>
        </div>
      </section>

      {/* 2. Stats & Impact Section: Redesigned for visual depth */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute inset-0 bg-slate-900/20 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Expert Workers", val: "50+", desc: "Skilled professionals in our precision units.", icon: Users2 },
              { label: "Global Presence", val: "USA/CN/PK", desc: "Cross-continental manufacturing & sales.", icon: Building2 },
              { label: "Digital Fleet", val: "HP Indigo", desc: "Plateless, high-speed digital versatility.", icon: Cpu },
              { label: "Certifications", val: "ISO/FDA", desc: "Committed to global quality standards.", icon: ShieldCheck },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#D00000]/40 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Accent line on hover */}
                
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-2xl bg-[#D00000]/5 text-[#D00000] group-hover:bg-[#D00000] group-hover:text-white transition-all duration-500">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white">{stat.val}</h3>
                    <p className="text-xs font-bold text-[#D00000] uppercase tracking-tighter mt-1">{stat.label}</p>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Tech & Equipment Section */}
      <section className="py-18 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Advanced Manufacturing Fleet</h2>
            <p className="text-slate-400">
              Our facilities are equipped with industry-leading machinery to ensure precision across offset, digital, and post-press processes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-800/50 border border-white/10 hover:border-[#D00000]/30 transition-all group">
              <Cpu className="w-10 h-10 text-red-500 mb-6 group-hover:animate-pulse" />
              <h3 className="text-xl font-semibold mb-4 text-white">Digital Precision</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Featuring the <strong>HP Indigo 25k, 20000s, and 6900s</strong> fleet, we deliver high-quality flexible packaging, shrink labels, and stickers without the need for traditional plates—ideal for modern speed and versatility.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-800/50 border border-white/10 hover:border-emerald-500/30 transition-all group">
              <Building2 className="w-10 h-10 text-blue-400 mb-6 group-hover:animate-pulse" />
              <h3 className="text-xl font-semibold mb-4 text-white">Offset Excellence</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Utilizing <strong>Heidelberg 7 color + 1 UV offset</strong> and Roland systems, backed by CTP pre-press, we guarantee impeccable color accuracy and texture for large-scale production.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-800/50 border border-white/10 hover:border-emerald-500/30 transition-all group">
              <ShieldCheck className="w-10 h-10 text-teal-400 mb-6 group-hover:animate-pulse" />
              <h3 className="text-xl font-semibold mb-4 text-white">Post-Press Power</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A full suite of automated finishing: saddle stitching, perfect binding, case binding, box gluing, UV coating, and lamination for a professional end-to-end result.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Products & Sustainability Section */}
      <section className="py-18 px-6 ">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group rounded-3xl overflow-hidden border border-white/10">
            <Image 
              src={"/about/eco_packaging.png"} 
              alt="Eco-friendly food packaging" 
              width={800} 
              height={800}
              className="object-cover"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-[#1D2D44]/20 to-transparent" /> */}
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">Solutions for Every Scale</h2>
              <p className="text-slate-300">
                We specialize in <strong>Kraft Paper Pouches, Aluminum Pouches, Retort Pouches, and Shrink Pouches</strong>. Our goal is to empower small businesses and startups with decent, eco-friendly packaging.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D00000]/20 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Eco-First</h4>
                  <p className="text-xs text-slate-400 mt-1">FDA & FSC certified food-safe Kraft materials.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Low MOQ</h4>
                  <p className="text-xs text-slate-400 mt-1">Starting from just 50 pieces for in-stock items.</p>
                </div>
              </div>
            </div>

            <blockquote className="border-l-4 border-red-600 pl-6 italic text-lg text-slate-100">
              "Our targets are high-quality products, reasonable prices, and professional service—providing the most natural and cost-efficient packaging globally."
            </blockquote>
          </div>
        </div>
      </section>

      {/* 5. Global Shipping & Logistics */}
      <section className="py-18 px-6 relative overflow-hidden">
        {/* Background Decorative Blur */}
        {/* <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D00000]/10 rounded-full blur-[120px] pointer-events-none" /> */}
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content Area */}
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium">
                  <Globe2 className="w-4 h-4 text-[#D00000]" />
                  <span>Ships Worldwide via Express</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  Global Reach, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D00000] to-red-500">
                    Local Support.
                  </span>
                </h2>
                
                <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                  With a passionate sales team and strategic manufacturing, we ship globally using premium partners like <strong>DHL, UPS, and FedEx</strong>. 
                  <br className="hidden md:block" />
                  <br className="hidden md:block" />
                  Whether you need 1,000 custom-printed pouches or a starter pack of 50, we deliver excellence directly to your doorstep.
                </p>
              </div>

              {/* Feature Cards Grid */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D00000]/30 hover:bg-[#D00000]/5 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-[#D00000] transition-colors">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-1 tracking-wide">Fast Delivery</h4>
                  <p className="text-sm text-slate-400">Lightning-fast express shipping across boundaries.</p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-1 tracking-wide">FDA & FSC Safe</h4>
                  <p className="text-sm text-slate-400">Strictly complying with ISO 9001 and ISO 14001 standards.</p>
                </div>
              </div>
            </div>

            {/* Right Image Container */}
            <div className="relative group lg:justify-self-end mt-5 lg:mt-0 w-full max-w-lg">
              {/* <div className="absolute -inset-4 bg-gradient-to-br from-[#D00000] to-blue-600 rounded-[2.5rem] opacity-20 group-hover:opacity-30 blur-2xl transition-opacity duration-700" /> */}
              
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-3xl bg-slate-900 transform group-hover:-translate-y-2 transition-transform duration-700">
                {/* Decorative UI overlay for "tech logistics" look */}
               
                <Image 
                  src={"/about/global_shipping.png"} 
                  alt="Global Shipping Logistics" 
                  width={600} 
                  height={800} 
                  className="w-full h-auto object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-1000 origin-bottom" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D2D44] via-transparent to-transparent opacity-50 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer-like CTA */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold">Ready to Elevate Your Packaging?</h2>
          <p className="text-slate-400">Join small startups and large corporations worldwide in choosing sustainable, high-quality solutions.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact"><button className="px-8 py-3 bg-[#D00000] hover:bg-red-700 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-red-500/20">
              Reach us Now !
            </button></Link>
            
            
          </div>
        </div>
      </section>
      <FAQs/>
    </main>
  );
}
