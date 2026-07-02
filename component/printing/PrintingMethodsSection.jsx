"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Package,
  X,
  Images,
} from "lucide-react";

/* ─── Data (kept here alongside the component so it can be used client-side) ─ */

const printingMethods = [
  {
    id: "gravure",
    title: "Gravure Printing",
    subtitle: "High-Volume Precision",
    badge: "Most Popular",
    badgeColor: "bg-brand-orange",
    icon: "🖨️",
    minQty: "40,000–60,000 pcs (depending on Size)",
    timeline: "30–45 business days",
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
    timelineBreakdown: [
      { label: "Cylinder Engraving", days: "10–15 days", desc: "Engraving precision steel/copper cylinders for every color plate." },
      { label: "Print Production", days: "15–20 days", desc: "High-speed rotogravure ink deposition onto packaging films." },
      { label: "Finishing & QC", days: "5–10 days", desc: "Adhesive lamination, curing, bag-making, and physical inspection." }
    ],
    color: "from-brand-orange/20 to-brand-orange/5",
    borderColor: "border-brand-orange/30",
    accentColor: "text-brand-orange",
    bgAccent: "bg-brand-orange/10",
    ctaColor:
      "bg-brand-orange text-white shadow-lg shadow-brand-orange/20 hover:bg-brand-dark",
    samplesKey: "Gravure",
  },
  {
    id: "screen",
    title: "Screen Printing",
    subtitle: "Bold & Versatile",
    badge: "Low MOQ",
    badgeColor: "bg-brand-success",
    icon: "🎨",
    minQty: "1,000 pcs",
    timeline: "10–15 business days",
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
    timelineBreakdown: [
      { label: "Screen & Stencil Setup", days: "2–3 days", desc: "Setting up silk mesh screens and stencils for each ink layer." },
      { label: "Vibrant Spot Printing", days: "5–8 days", desc: "Semi-automated screen printing of spot ink colors." },
      { label: "Curing & Sealing", days: "3–4 days", desc: "Thermal curing of thick ink layers and pouch processing." }
    ],
    color: "from-brand-success/20 to-brand-success/5",
    borderColor: "border-brand-success/30",
    accentColor: "text-brand-success",
    bgAccent: "bg-brand-success/10",
    ctaColor:
      "bg-brand-success text-white shadow-lg shadow-brand-success/20 hover:opacity-90",
    samplesKey: "Screen",
  },
  {
    id: "offset",
    title: "Offset Printing",
    subtitle: "Precision Color Matching",
    badge: "Premium Quality",
    badgeColor: "bg-blue-600",
    icon: "🖋️",
    minQty: "1,000 pcs",
    timeline: "15–20 business days",
    description:
      "Offset printing transfers ink from a plate to a rubber blanket and then onto the substrate — delivering exceptionally consistent, high-resolution output with perfect Pantone color matching. Ideal for brands that demand meticulous color accuracy across sophisticated multi-element designs.",
    highlights: [
      "Pantone color-matched accuracy",
      "Crisp fine detail reproduction",
      "Excellent for complex multi-layer art",
      "Low ink waste per unit at mid-volume",
      "Works on paper, board & flexible films",
      "Cost-efficient for medium run sizes",
    ],
    timelineBreakdown: [
      { label: "Metal Plate Setup", days: "3–5 days", desc: "Transferring design plates onto print rollers and ink calibrating." },
      { label: "High-Res Offset Run", days: "7–10 days", desc: "Printing on premium paper layers with Pantone matching." },
      { label: "Finishing & Forming", days: "5–5 days", desc: "Lamination, pouch forming, and quality inspection." }
    ],
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    accentColor: "text-blue-600",
    bgAccent: "bg-blue-500/10",
    ctaColor:
      "bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:opacity-90",
    samplesKey: "Offset",
  },
  {
    id: "single-pass",
    title: "Single Pass Printing",
    subtitle: "Fastest Turnaround",
    badge: "Fastest",
    badgeColor: "bg-purple-600",
    icon: "⚡",
    minQty: "200 pcs",
    timeline: "5–10 business days",
    description:
      "Single pass (digital inkjet) printing applies all colors simultaneously in a single pass over the substrate, eliminating plate setup entirely. This makes it the fastest route from artwork to finished pouch — perfect for short-run proofs, seasonal designs, and brands that need quick market testing.",
    highlights: [
      "No plate or cylinder setup fees",
      "Fastest production turnaround",
      "Minimum 500 pcs — ultra-low MOQ",
      "Full-color variable data printing",
      "Ideal for short runs & prototyping",
      "On-demand reprints with no minimum",
    ],
    timelineBreakdown: [
      { label: "Digital Image Prep", days: "1–2 days", desc: "Preflight design checks and preparing digital raster artwork." },
      { label: "Simultaneous Inkjet", days: "2–4 days", desc: "No plates needed: printheads deposit all colors instantly." },
      { label: "Pouch Sealing & QC", days: "2–4 days", desc: "Direct cutting, sealing, counting, and packaging." }
    ],
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    accentColor: "text-purple-600",
    bgAccent: "bg-purple-500/10",
    ctaColor:
      "bg-purple-600 text-white shadow-lg shadow-purple-500/20 hover:opacity-90",
    samplesKey: "Single Pass",
  },
];

const allSamples = [
  {
    image: "/hero-ai-images/coffe_pouch_mockup.svg",
    label: "Gravure — Coffee Pouch",
    method: "Gravure",
    methodColor: "bg-brand-orange",
    desc: "8-color full-bleed photographic print",
  },
  {
    image: "/categories/coffee_pouch.svg",
    label: "Gravure — Specialty Coffee",
    method: "Gravure",
    methodColor: "bg-brand-orange",
    desc: "Metallic ink + gradient design",
  },
  {
    image: "/hero-ai-images/pet-food-pouches-hero.png",
    label: "Screen — Pet Food Bags",
    method: "Screen",
    methodColor: "bg-brand-success",
    desc: "Bold 3-color spot logo print",
  },
  {
    image: "/categories/kraft_paper_pouches.svg",
    label: "Screen — Kraft Pouches",
    method: "Screen",
    methodColor: "bg-brand-success",
    desc: "Single-color heritage branding",
  },
  {
    image: "/hero-ai-images/transparent-pouch-mockup.png",
    label: "Offset — Transparent Pouch",
    method: "Offset",
    methodColor: "bg-blue-600",
    desc: "Pantone-matched brand identity",
  },
  {
    image: "/categories/flat_bottom_pouches.svg",
    label: "Offset — Flat Bottom Pouch",
    method: "Offset",
    methodColor: "bg-blue-600",
    desc: "Premium Pantone retail packaging",
  },
  {
    image: "/categories/plastic_pouch.svg",
    label: "Single Pass — Plastic Pouch",
    method: "Single Pass",
    methodColor: "bg-purple-600",
    desc: "Short-run full-color digital print",
  },
  {
    image: "/categories/retort_pouch.svg",
    label: "Single Pass — Retort Pouch",
    method: "Single Pass",
    methodColor: "bg-purple-600",
    desc: "Variable data digital inkjet print",
  },
];

/* ─── Samples Modal ─────────────────────────────────────────────────────────── */

function SamplesModal({ method, onClose }) {
  const samples = allSamples.filter((s) => s.method === method.samplesKey);

  // Close on Escape key
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Blurred dark backdrop */}
      <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm" />

      {/* Modal panel */}
      <div
        className="relative z-10 w-full max-w-3xl bg-white rounded-4xl shadow-2xl overflow-hidden animate-fade-in-fast"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{method.icon}</span>
            <div>
              <h3 className="text-lg font-black text-brand-dark uppercase tracking-tight leading-none">
                {method.title} Samples
              </h3>
              <p className={`text-xs font-bold mt-0.5 ${method.accentColor}`}>
                {samples.length} sample{samples.length !== 1 ? "s" : ""}{" "}
                available
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-brand-bg hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={18} className="text-brand-dark" />
          </button>
        </div>

        {/* Sample grid */}
        <div className="p-8">
          {samples.length === 0 ? (
            <div className="text-center py-12 text-brand-dark/40">
              <Images size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-bold text-sm">
                Sample photos coming soon for this method.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5">
              {samples.map((s, i) => (
                <div
                  key={i}
                  className="group rounded-2xl overflow-hidden border border-brand-dark/5 bg-brand-section hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="relative h-44 bg-white overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.label}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white ${s.methodColor}`}
                      >
                        {s.method}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-black text-brand-dark leading-snug mb-0.5">
                      {s.label}
                    </p>
                    <p className="text-[11px] font-medium text-brand-dark/50">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-brand-section border-t border-gray-100 flex items-center justify-between gap-4">
          <p className="text-xs text-brand-dark/50 font-medium">
            Want a physical sample kit? We ship samples worldwide.
          </p>
          <Link
            href="/contact"
            onClick={onClose}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white rounded-xl font-black text-[10px] uppercase tracking-wider hover:bg-brand-dark transition-colors duration-300"
          >
            Request Quote
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────────────────── */

function PrintingMethodCard({ method, openModal }) {
  const [activeTab, setActiveTab] = useState("highlights"); // "highlights" | "timeline"

  return (
    <div
      className={`relative rounded-3xl border ${method.borderColor} bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-full`}
    >
      {/* Top accent gradient */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${method.color}`} />

      <div className="p-8 md:p-10 flex flex-col grow">
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
                <p
                  className={`text-sm font-bold ${method.accentColor} mt-0.5`}
                >
                  {method.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className={`p-4 rounded-2xl ${method.bgAccent} border ${method.borderColor}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Package size={14} className={method.accentColor} />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">
                Min. Order
              </span>
            </div>
            <div className={`text-[11px] sm:text-xs font-black ${method.accentColor} leading-tight`}>
              {method.minQty}
            </div>
          </div>
          <div
            className={`p-4 rounded-2xl ${method.bgAccent} border ${method.borderColor}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Clock size={14} className={method.accentColor} />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">
                Lead Time
              </span>
            </div>
            <div
              className={`text-xs font-black ${method.accentColor} leading-tight`}
            >
              {method.timeline}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-brand-dark/60 text-sm font-medium leading-relaxed mb-6">
          {method.description}
        </p>

        {/* Tab Switcher */}
        <div className="flex border-b border-brand-dark/5 mb-6">
          <button
            onClick={() => setActiveTab("highlights")}
            className={`flex-1 pb-2.5 text-xs font-black uppercase tracking-widest border-b-2 text-center transition-all duration-300 cursor-pointer ${
              activeTab === "highlights"
                ? `${method.borderColor} ${method.accentColor}`
                : "border-transparent text-brand-dark/40 hover:text-brand-dark"
            }`}
          >
            Highlights
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`flex-1 pb-2.5 text-xs font-black uppercase tracking-widest border-b-2 text-center transition-all duration-300 cursor-pointer ${
              activeTab === "timeline"
                ? `${method.borderColor} ${method.accentColor}`
                : "border-transparent text-brand-dark/40 hover:text-brand-dark"
            }`}
          >
            Production Timeline
          </button>
        </div>

        {/* Tab Content */}
        <div className="grow mb-8 min-h-[160px]">
          {activeTab === "highlights" ? (
            /* Highlights List */
            <div className="space-y-2.5">
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
          ) : (
            /* Visual Timeline */
            <div className="relative pl-6 space-y-5">
              {/* Vertical timeline connector line */}
              <div className="absolute left-2.5 top-1 bottom-1 w-0.5 bg-brand-dark/10" />

              {method.timelineBreakdown.map((step, idx) => (
                <div key={idx} className="relative flex flex-col gap-1.5 animate-fade-in-fast">
                  {/* Timeline point */}
                  <div className={`absolute -left-6 top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-3 ${method.borderColor} z-10 flex items-center justify-center`}>
                    <div className={`w-1 h-1 rounded-full ${method.accentColor.replace('text-', 'bg-')}`} />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-1">
                    <span className="text-xs font-black text-brand-dark uppercase tracking-wider leading-none">
                      {step.label}
                    </span>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${method.accentColor} bg-brand-section px-2 py-0.5 rounded-md border ${method.borderColor} w-fit leading-none`}>
                      {step.days}
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-dark/50 font-medium leading-snug">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dual CTA Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <Link
            href="/contact"
            className={`inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 text-center ${method.ctaColor}`}
          >
            Request Quote
            <ArrowRight size={13} />
          </Link>
          <button
            onClick={() => openModal(method)}
            className={`inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 border-2 ${method.borderColor} ${method.accentColor} hover:${method.bgAccent} bg-transparent cursor-pointer`}
          >
            <Images size={13} />
            See Samples
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PrintingMethodsSection() {
  const [activeModal, setActiveModal] = useState(null); // method object or null

  const openModal = (method) => setActiveModal(method);
  const closeModal = () => setActiveModal(null);

  return (
    <>
      {/* Method Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {printingMethods.map((method) => (
          <PrintingMethodCard
            key={method.id}
            method={method}
            openModal={openModal}
          />
        ))}
      </div>

      {/* Modal */}
      {activeModal && (
        <SamplesModal method={activeModal} onClose={closeModal} />
      )}
    </>
  );
}
