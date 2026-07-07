import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";
import SamplesGallery from "@/component/printing/SamplesGallery";
import samplesRegistry from "@/component/printing/samples-registry.json";
import { printingMethods } from "@/component/printing/PrintingMethodsSection";

const allSamples = [
  {
    image: "/hero-ai-images/coffe_pouch_mockup.webp",
    label: "Gravure — Coffee Pouch",
    method: "Gravure",
    desc: "8-color full-bleed photographic print",
  },
  {
    image: "/categories/coffee_pouch.webp",
    label: "Gravure — Specialty Coffee",
    method: "Gravure",
    desc: "Metallic ink + gradient design",
  },
  {
    image: "/hero-ai-images/pet-food-pouches-hero.webp",
    label: "Screen — Pet Food Bags",
    method: "Screen",
    desc: "Bold 3-color spot logo print",
  },
  {
    image: "/categories/kraft_paper_pouches.webp",
    label: "Screen — Kraft Pouches",
    method: "Screen",
    desc: "Single-color heritage branding",
  },
  {
    image: "/hero-ai-images/transparent-pouch-mockup.webp",
    label: "Offset — Transparent Pouch",
    method: "Offset",
    desc: "Pantone-matched brand identity",
  },
  {
    image: "/categories/flat_bottom_pouches.webp",
    label: "Offset — Flat Bottom Pouch",
    method: "Offset",
    desc: "Premium Pantone retail packaging",
  },
  {
    image: "/categories/plastic_pouch.webp",
    label: "Single Pass — Plastic Pouch",
    method: "Single Pass",
    desc: "Short-run full-color digital print",
  },
  {
    image: "/categories/retort_pouch.webp",
    label: "Single Pass — Retort Pouch",
    method: "Single Pass",
    desc: "Variable data digital inkjet print",
  },
];

const getStepEmoji = (methodId, idx) => {
  if (methodId === "gravure") {
    if (idx === 0) return "🔩"; // cylinder engraving
    if (idx === 1) return "🌀"; // high speed printing
    if (idx === 2) return "📦"; // finishing & QC
  }
  if (methodId === "screen") {
    if (idx === 0) return "📐"; // stencil setup
    if (idx === 1) return "🎨"; // screen printing
    if (idx === 2) return "🌡️"; // curing & sealing
  }
  if (methodId === "offset") {
    if (idx === 0) return "⚙️"; // metal plate
    if (idx === 1) return "🖋️"; // offset run
    if (idx === 2) return "📦"; // forming
  }
  if (methodId === "single-pass") {
    if (idx === 0) return "🖥️"; // image prep
    if (idx === 1) return "⚡"; // inkjet print
    if (idx === 2) return "📦"; // sealing
  }
  return "⏱️";
};

export async function generateMetadata({ params }) {
  const { method } = await params;
  const methodData = printingMethods.find((m) => m.id === method);
  if (!methodData) return { title: "Printing Samples" };

  return {
    title: `${methodData.title} Samples | MF Packages`,
    description: `View real production samples of our ${methodData.title} capabilities. High-definition images of custom printed bags, pouches, and specialty packaging.`,
  };
}

export default async function SamplesPage({ params }) {
  const { method } = await params;
  const methodData = printingMethods.find((m) => m.id === method);
  if (!methodData) {
    notFound();
  }

  const folderImages = samplesRegistry[method] || [];
  const images = folderImages.length > 0
    ? folderImages.map((src, idx) => ({
        src,
        label: `${methodData.title} Sample ${idx + 1}`,
        desc: "High-quality production print",
      }))
    : allSamples
        .filter((s) => s.method === methodData.samplesKey)
        .map((s) => ({
          src: s.image,
          label: s.label,
          desc: s.desc,
        }));

  return (
    <main className="min-h-screen bg-brand-bg text-brand-dark pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-brand-dark/50 text-xs font-black uppercase tracking-widest mb-8 select-none">
          <Link href="/" className="hover:text-brand-dark transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/printing" className="hover:text-brand-dark transition-colors">
            Printing
          </Link>
          <ChevronRight size={12} />
          <span className={methodData.accentColor}>{methodData.title} Samples</span>
        </div>

        {/* Header Section */}
        <div className="mb-12">
          <Link
            href="/printing"
            className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest ${methodData.accentColor} hover:text-brand-dark transition-colors mb-6`}
          >
            <ArrowLeft size={14} />
            Back to Printing Services
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{methodData.icon}</span>
                <h1 className="text-3xl sm:text-5xl font-black text-brand-dark tracking-tight uppercase leading-none">
                  {methodData.title} <span className={methodData.accentColor}>Samples</span>
                </h1>
              </div>
              <p className="text-brand-dark/60 text-sm sm:text-base font-medium max-w-3xl leading-relaxed mt-4">
                Experience the precision, color consistency, and detail quality of our {methodData.title} capabilities. Browse our physical gallery below. Click on any picture to experience the full view.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic 2-Column Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Gallery Area (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <SamplesGallery images={images} method={methodData} />
          </div>

          {/* Sidebar Detail Cards (1/3 width) */}
          <div className="space-y-6">
            {/* Specs Summary Card */}
            <div className="bg-white rounded-3xl border border-gray-200/65 p-6 sm:p-8 shadow-sm space-y-5">
              <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest border-b border-gray-100 pb-4 mb-4 flex items-center gap-2">
                📋 Method Summary
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/45 block mb-1">Minimum Order Qty</span>
                  <span className={`text-sm font-black ${methodData.accentColor}`}>{methodData.minQty}</span>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/45 block mb-1">Production Lead Time</span>
                  <span className={`text-sm font-black ${methodData.accentColor}`}>{methodData.timeline}</span>
                </div>
              </div>
            </div>

            {/* Detailed Timeline Card */}
            <div className="bg-white rounded-3xl border border-gray-200/65 p-6 sm:p-8 shadow-sm">
              <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest border-b border-gray-100 pb-4 mb-6 flex items-center gap-2">
                ⏳ Production Timeline
              </h3>
              <div className="relative pl-8 space-y-6">
                {/* Vertical timeline line */}
                <div className="absolute left-3.5 top-2.5 bottom-2.5 w-0.5 bg-gray-100" />

                {methodData.timelineBreakdown.map((step, idx) => (
                  <div key={idx} className="relative flex flex-col gap-1.5 animate-fade-in-fast">
                    {/* Circle Bullet with emoji */}
                    <div className="absolute -left-8 top-0.5 -translate-x-1/2 w-7 h-7 rounded-full bg-brand-section border border-gray-200 flex items-center justify-center text-xs shadow-xs select-none">
                      {getStepEmoji(methodData.id, idx)}
                    </div>

                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-1">
                      <span className="text-xs font-black text-brand-dark uppercase tracking-wider leading-none">
                        {step.label}
                      </span>
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest ${methodData.accentColor} bg-brand-section px-2.5 py-0.5 rounded-md border ${methodData.borderColor} w-fit leading-none`}
                      >
                        {step.days}
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-dark/50 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
