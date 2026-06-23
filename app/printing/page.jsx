import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Package,
  Layers,
  Zap,
  Shield,
  Star,
  ChevronRight,
  Printer,
  Award,
} from "lucide-react";

export const metadata = {
  title: "Printing Services | MF Packages",
  description:
    "Explore MF Packages' premium printing services — Gravure and Screen Printing with minimum order quantities, turnaround times, and vibrant custom branding for your packaging.",
};

/* ─── Data ───────────────────────────────────────────────── */

const printingMethods = [
  {
    id: "gravure",
    title: "Gravure Printing",
    subtitle: "High-Volume Precision",
    badge: "Most Popular",
    badgeColor: "bg-brand-orange",
    icon: "🖨️",
    minQty: "10,000 pcs",
    minQtyNum: 10000,
    timeline: "15–25 business days",
    description:
      "Gravure (rotogravure) printing is our flagship large-volume solution. Using engraved cylinders, each rotation deposits ink directly onto the packaging film, producing exceptionally sharp images and vivid, consistent color across massive print runs — ideal for brands that need flawless shelf appeal at scale.",
    highlights: [
      "Ultra-sharp image reproduction",
      "Consistent color across entire run",
      "Up to 10-color printing capability",
      "Ideal for photographic & gradient designs",
      "Cost-effective at high volumes",
      "Food-safe, solvent-free inks available",
    ],
    color: "from-brand-orange/20 to-brand-orange/5",
    borderColor: "border-brand-orange/30",
    accentColor: "text-brand-orange",
    bgAccent: "bg-brand-orange/10",
  },
  {
    id: "screen",
    title: "Screen Printing",
    subtitle: "Bold & Versatile",
    badge: "Low MOQ",
    badgeColor: "bg-brand-success",
    icon: "🎨",
    minQty: "1,000 pcs",
    minQtyNum: 1000,
    timeline: "15–20 business days",
    description:
      "Screen printing pushes ink through a fine mesh stencil onto the packaging surface, creating bold, vibrant spot colors with excellent opacity. Perfect for brands with striking single-color or limited-color artwork who need accessible minimum quantities without compromising on impact.",
    highlights: [
      "Vibrant, opaque spot colors",
      "Lower minimum order quantity",
      "Excellent for bold logo & text designs",
      "Thick ink laydown for tactile feel",
      "Great for specialty inks (metallic, glow)",
      "Suitable for paper & flexible substrates",
    ],
    color: "from-brand-success/20 to-brand-success/5",
    borderColor: "border-brand-success/30",
    accentColor: "text-brand-success",
    bgAccent: "bg-brand-success/10",
  },
];

const completedJobs = [
  {
    title: "Gravure — 50,000 Kraft Pouches",
    client: "Premium Tea Brand",
    method: "Gravure",
    qty: "50,000 pcs",
    colors: "8-color full bleed",
    timeline: "18 days",
    icon: "🍵",
  },
  {
    title: "Screen — 3,000 Coffee Bags",
    client: "Specialty Coffee Roasters",
    method: "Screen",
    qty: "3,000 pcs",
    colors: "3-color bold logo",
    timeline: "14 days",
    icon: "☕",
  },
  {
    title: "Gravure — 25,000 Snack Pouches",
    client: "FMCG Snacks Brand",
    method: "Gravure",
    qty: "25,000 pcs",
    colors: "Full color + metallic",
    timeline: "22 days",
    icon: "🍿",
  },
  {
    title: "Screen — 1,500 Spice Sachets",
    client: "Organic Spice Company",
    method: "Screen",
    qty: "1,500 pcs",
    colors: "2-color heritage design",
    timeline: "16 days",
    icon: "🌶️",
  },
  {
    title: "Gravure — 100,000 Flat Bags",
    client: "Industrial Packaging Client",
    method: "Gravure",
    qty: "100,000 pcs",
    colors: "6-color photographic",
    timeline: "25 days",
    icon: "📦",
  },
  {
    title: "Screen — 2,000 Retort Pouches",
    client: "Ready-Meal Brand",
    method: "Screen",
    qty: "2,000 pcs",
    colors: "4-color spot design",
    timeline: "18 days",
    icon: "🥘",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Artwork Submission",
    desc: "Share your design files (AI, PDF, or high-res PNG). Our team reviews artwork for print-readiness and color accuracy.",
    icon: "📐",
  },
  {
    step: "02",
    title: "Pre-Press & Proofing",
    desc: "We prepare printing plates or screens and send you a digital proof for approval before production begins.",
    icon: "🔍",
  },
  {
    step: "03",
    title: "Production Run",
    desc: "Your order enters our printing line. Quality is checked at multiple stages to ensure color consistency throughout the run.",
    icon: "⚙️",
  },
  {
    step: "04",
    title: "Quality Control",
    desc: "Every batch is inspected for color accuracy, print sharpness, and substrate adhesion before packing.",
    icon: "✅",
  },
  {
    step: "05",
    title: "Packaging & Dispatch",
    desc: "Finished pouches are counted, packed, and dispatched with full documentation and tracking details.",
    icon: "🚚",
  },
];

const stats = [
  { label: "Gravure Min. Order", value: "10,000", unit: "pcs", icon: "🖨️" },
  { label: "Screen Print Min.", value: "1,000", unit: "pcs", icon: "🎨" },
  { label: "Min. Lead Time", value: "15", unit: "days", icon: "⏱️" },
  { label: "Max Colors (Gravure)", value: "10", unit: "colors", icon: "🌈" },
  { label: "Jobs Completed", value: "500+", unit: "orders", icon: "✅" },
  { label: "Happy Clients", value: "200+", unit: "brands", icon: "⭐" },
];

/* ─── Component ──────────────────────────────────────────── */

export default function PrintingPage() {
  return (
    <main className="min-h-screen bg-brand-bg overflow-x-hidden">
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/print-banner.svg"
            alt="Printing Hero Background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-brand-dark/85" />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-brand-orange">Printing</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
            <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
            <span className="text-white/80 text-xs font-black uppercase tracking-[0.2em]">
              Premium Printing Services
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] uppercase mb-6 max-w-4xl">
            Elevate Your Brand With{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-red-400">
              High-End Printing
            </span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg font-medium leading-relaxed max-w-2xl mb-10">
            We transform sustainable packaging into powerful branding assets
            with state-of-the-art printing capabilities. Flawless colors,
            eco-friendly finishes, and rapid turnaround — tailored for the
            global market.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-orange text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-opacity-90 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-brand-orange/30"
            >
              Get A Free Quote
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-md"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────── */}
      <section className="relative py-0 -mt-1">
        <div className="bg-brand-dark border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center group"
                >
                  <span className="text-2xl mb-1">{stat.icon}</span>
                  <div className="text-2xl md:text-3xl font-black text-white leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    {stat.unit}
                  </div>
                  <div className="text-[10px] font-medium text-white/60 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINTING METHODS ────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand-dark/5 shadow-sm mb-6">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark">
                Our Printing Methods
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-4">
              Two Methods,{" "}
              <span className="text-brand-orange">
                Infinite Possibilities
              </span>
            </h2>
            <p className="text-brand-dark/50 text-base md:text-lg font-medium max-w-xl mx-auto">
              Choose the printing technology that fits your volume, design, and
              budget — or let our team guide you to the perfect solution.
            </p>
          </div>

          {/* Method Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {printingMethods.map((method) => (
              <div
                key={method.id}
                className={`relative rounded-3xl border ${method.borderColor} bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Top accent gradient */}
                <div
                  className={`h-1.5 w-full bg-linear-to-r ${method.color}`}
                />

                <div className="p-8 md:p-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span
                        className={`inline-block text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${method.badgeColor} text-white mb-3`}
                      >
                        {method.badge}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{method.icon}</span>
                        <div>
                          <h3 className="text-2xl font-black text-brand-dark leading-none">
                            {method.title}
                          </h3>
                          <p className={`text-sm font-bold ${method.accentColor} mt-0.5`}>
                            {method.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={`p-4 rounded-2xl ${method.bgAccent} border ${method.borderColor}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Package size={14} className={method.accentColor} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">
                          Min. Order
                        </span>
                      </div>
                      <div className={`text-xl font-black ${method.accentColor}`}>
                        {method.minQty}
                      </div>
                    </div>
                    <div className={`p-4 rounded-2xl ${method.bgAccent} border ${method.borderColor}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock size={14} className={method.accentColor} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">
                          Lead Time
                        </span>
                      </div>
                      <div className={`text-base font-black ${method.accentColor} leading-tight`}>
                        {method.timeline}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-brand-dark/60 text-sm font-medium leading-relaxed mb-6">
                    {method.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/40 block mb-3">
                      What You Get
                    </span>
                    {method.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <CheckCircle
                          size={14}
                          className={`${method.accentColor} shrink-0`}
                        />
                        <span className="text-sm font-medium text-brand-dark/70">
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className={`mt-8 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 ${
                      method.id === "gravure"
                        ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                        : "bg-brand-success text-white shadow-lg shadow-brand-success/20"
                    }`}
                  >
                    Request a Quote
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLETED JOBS ──────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-brand-dark relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-success/5 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                <div className="w-2 h-2 bg-brand-success rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                  Our Print Portfolio
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Printing Jobs{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-red-400">
                  We&apos;ve Delivered
                </span>
              </h2>
              <p className="mt-3 text-white/50 text-base font-medium max-w-xl">
                A snapshot of recent printing runs across both our Gravure and
                Screen printing lines.
              </p>
            </div>
            <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
              <div className="text-4xl font-black text-brand-orange">500+</div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/40">
                Printing Jobs Completed
              </div>
            </div>
          </div>

          {/* Job Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {completedJobs.map((job, i) => (
              <div
                key={i}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{job.icon}</span>
                  <span
                    className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                      job.method === "Gravure"
                        ? "bg-brand-orange/20 text-brand-orange"
                        : "bg-brand-success/20 text-brand-success"
                    }`}
                  >
                    {job.method}
                  </span>
                </div>
                <h4 className="text-sm font-black text-white leading-snug mb-1">
                  {job.title}
                </h4>
                <p className="text-[11px] font-bold text-white/40 uppercase tracking-wider mb-4">
                  {job.client}
                </p>
                <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-0.5">
                      Qty
                    </div>
                    <div className="text-xs font-black text-white">{job.qty}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-0.5">
                      Colors
                    </div>
                    <div className="text-xs font-black text-white">{job.colors}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-0.5">
                      Time
                    </div>
                    <div className="text-xs font-black text-white">{job.timeline}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand-dark/5 shadow-sm mb-6">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-4">
              From Artwork to{" "}
              <span className="text-brand-orange">Your Door</span>
            </h2>
            <p className="text-brand-dark/50 text-base font-medium">
              Our streamlined 5-step process keeps your order on time and on
              brief — every single time.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-linear-to-r from-transparent via-brand-orange/20 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {processSteps.map((step, i) => (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  {/* Step circle */}
                  <div className="relative w-20 h-20 rounded-full bg-white border-2 border-brand-orange/20 flex items-center justify-center shadow-sm mb-4 group-hover:border-brand-orange group-hover:shadow-lg group-hover:shadow-brand-orange/10 transition-all duration-300">
                    <span className="text-2xl">{step.icon}</span>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-orange rounded-full flex items-center justify-center">
                      <span className="text-[9px] font-black text-white">{step.step}</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-black text-brand-dark mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-brand-dark/50 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPORTANT NOTES / REQUIREMENTS ─────────────────── */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl border border-brand-dark/5 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-brand-bg">
              {/* Left */}
              <div className="p-10 md:p-14">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-6">
                  <Package className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark mb-4">
                  Minimum Order Quantities
                </h3>
                <p className="text-brand-dark/60 text-sm font-medium leading-relaxed mb-6">
                  Our MOQs are set to ensure the highest print quality and
                  economic efficiency for your production run.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-brand-bg rounded-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🖨️</span>
                      <div>
                        <div className="text-sm font-black text-brand-dark">Gravure Printing</div>
                        <div className="text-xs text-brand-dark/40 font-medium">Rotogravure technology</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-brand-orange">10,000</div>
                      <div className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest">pcs min.</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-brand-bg rounded-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🎨</span>
                      <div>
                        <div className="text-sm font-black text-brand-dark">Screen Printing</div>
                        <div className="text-xs text-brand-dark/40 font-medium">Mesh stencil technology</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-brand-success">1,000</div>
                      <div className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest">pcs min.</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-brand-dark/40 font-medium mt-4 leading-relaxed">
                  * MOQs may vary depending on substrate type, number of colors,
                  and special finishing requirements. Contact us for custom
                  quotes.
                </p>
              </div>

              {/* Right */}
              <div className="p-10 md:p-14">
                <div className="w-12 h-12 rounded-2xl bg-brand-success/10 flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-brand-success" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark mb-4">
                  Production Timelines
                </h3>
                <p className="text-brand-dark/60 text-sm font-medium leading-relaxed mb-6">
                  Lead times begin from artwork approval. Complex designs,
                  special finishes, or large quantities may affect timelines.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      label: "Artwork Review & Proof",
                      time: "1–3 days",
                      icon: "📐",
                      desc: "Design check & digital proof approval",
                    },
                    {
                      label: "Plate / Screen Setup",
                      time: "2–5 days",
                      icon: "🔧",
                      desc: "Cylinder engraving or screen preparation",
                    },
                    {
                      label: "Print Production",
                      time: "7–15 days",
                      icon: "⚙️",
                      desc: "Active printing run and QC checks",
                    },
                    {
                      label: "Finishing & Dispatch",
                      time: "2–3 days",
                      icon: "📦",
                      desc: "Counting, packing, and shipping",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-bg transition-colors">
                      <span className="text-xl shrink-0">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-black text-brand-dark">{item.label}</span>
                          <span className="text-xs font-black text-brand-success shrink-0">{item.time}</span>
                        </div>
                        <p className="text-xs text-brand-dark/40 font-medium mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap size={14} className="text-brand-orange" />
                    <span className="text-xs font-black text-brand-orange uppercase tracking-wider">Total Minimum Lead Time</span>
                  </div>
                  <div className="text-2xl font-black text-brand-dark">15 Business Days</div>
                  <p className="text-xs text-brand-dark/40 font-medium mt-1">
                    Actual time varies by complexity and order volume.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ───────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-brand-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-brand-dark tracking-tight mb-3">
              Why Print with{" "}
              <span className="text-brand-orange">MF Packages?</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "🌱",
                title: "Eco-Friendly Inks",
                desc: "Food-safe, solvent-free inks on biodegradable substrates.",
              },
              {
                icon: "🎯",
                title: "Color Accuracy",
                desc: "Pantone-matched printing for consistent brand identity.",
              },
              {
                icon: "⚡",
                title: "Fast Turnaround",
                desc: "Efficient production lines with a 15-day minimum lead time.",
              },
              {
                icon: "🛡️",
                title: "Quality Guarantee",
                desc: "Multi-stage QC inspection with every production run.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-7 rounded-2xl border border-brand-dark/5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-3xl block mb-4">{item.icon}</span>
                <h4 className="text-sm font-black text-brand-dark mb-2">{item.title}</h4>
                <p className="text-xs text-brand-dark/50 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-brand-dark" />
            <div className="absolute inset-0 bg-linear-to-br from-brand-orange/20 via-transparent to-brand-success/10" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                backgroundSize: "25px 25px",
              }}
            />
            <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-3">
                  Ready to Print?
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Get a Free Printing Quote
                  <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-red-400">
                    Today.
                  </span>
                </h3>
                <p className="text-white/50 text-sm font-medium mt-3 max-w-md">
                  Share your artwork and requirements — our team will come back
                  with a tailored quote within 24 hours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-orange text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-opacity-90 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-brand-orange/30"
                >
                  Get Quote
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-md"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
