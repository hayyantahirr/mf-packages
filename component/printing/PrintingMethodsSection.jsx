import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Package,
  Images,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────────────────── */

export const printingMethods = [
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
      {
        label: "Cylinder Engraving",
        days: "10–15 days",
        desc: "Engraving precision steel/copper cylinders for every color plate.",
      },
      {
        label: "Print Production",
        days: "15–20 days",
        desc: "High-speed rotogravure ink deposition onto packaging films.",
      },
      {
        label: "Finishing & QC",
        days: "5–10 days",
        desc: "Adhesive lamination, curing, bag-making, and physical inspection.",
      },
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
      {
        label: "Screen & Stencil Setup",
        days: "2–3 days",
        desc: "Setting up silk mesh screens and stencils for each ink layer.",
      },
      {
        label: "Vibrant Spot Printing",
        days: "5–8 days",
        desc: "Semi-automated screen printing of spot ink colors.",
      },
      {
        label: "Curing & Sealing",
        days: "3–4 days",
        desc: "Thermal curing of thick ink layers and pouch processing.",
      },
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
      {
        label: "Metal Plate Setup",
        days: "3–5 days",
        desc: "Transferring design plates onto print rollers and ink calibrating.",
      },
      {
        label: "High-Res Offset Run",
        days: "7–10 days",
        desc: "Printing on premium paper layers with Pantone matching.",
      },
      {
        label: "Finishing & Forming",
        days: "5–5 days",
        desc: "Lamination, pouch forming, and quality inspection.",
      },
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
      {
        label: "Digital Image Prep",
        days: "1–2 days",
        desc: "Preflight design checks and preparing digital raster artwork.",
      },
      {
        label: "Simultaneous Inkjet",
        days: "2–4 days",
        desc: "No plates needed: printheads deposit all colors instantly.",
      },
      {
        label: "Pouch Sealing & QC",
        days: "2–4 days",
        desc: "Direct cutting, sealing, counting, and packaging.",
      },
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

/* ─── Main Section ──────────────────────────────────────────────────────────── */

function PrintingMethodCard({ method }) {
  return (
    <div
      className={`relative rounded-3xl border ${method.borderColor} bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-full`}
    >
      {/* Top accent gradient */}
      <div className={`h-1.5 w-full bg-linear-to-r ${method.color}`} />

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
                <p className={`text-sm font-bold ${method.accentColor} mt-0.5`}>
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
            <div
              className={`text-[11px] sm:text-xs font-black ${method.accentColor} leading-tight`}
            >
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

        {/* Highlights List */}
        <div className="mb-6 border-t border-brand-dark/5 pt-6">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50 mb-3.5">
            Key Highlights
          </h4>
          <div className="space-y-2.5">
            {method.highlights.slice(0, 4).map((h, i) => (
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
        </div>

        {/* Production Timeline */}
        <div className="mb-8 border-t border-brand-dark/5 pt-6 grow">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50 mb-4">
            Production Timeline
          </h4>
          <div className="relative pl-6 space-y-4">
            {/* Vertical timeline connector line */}
            <div className="absolute left-2.5 top-1 bottom-1 w-0.5 bg-brand-dark/10" />

            {method.timelineBreakdown.map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col gap-1"
              >
                {/* Timeline point */}
                <div
                  className={`absolute -left-6 top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-3 ${method.borderColor} z-10 flex items-center justify-center`}
                >
                  <div
                    className={`w-1 h-1 rounded-full ${method.accentColor.replace("text-", "bg-")}`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-1">
                  <span className="text-xs font-black text-brand-dark uppercase tracking-wider leading-none">
                    {step.label}
                  </span>
                  <span
                    className={`text-[9px] font-black uppercase tracking-widest ${method.accentColor} bg-brand-section px-2 py-0.5 rounded-md border ${method.borderColor} w-fit leading-none`}
                  >
                    {step.days}
                  </span>
                </div>
                <p className="text-[11px] text-brand-dark/50 font-medium leading-snug">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
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
          <Link
            href={`/printing/${method.id}`}
            className={`inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 border-2 ${method.borderColor} ${method.accentColor} hover:${method.bgAccent} bg-transparent text-center cursor-pointer`}
          >
            <Images size={13} />
            See Samples
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PrintingMethodsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {printingMethods.map((method) => (
        <PrintingMethodCard
          key={method.id}
          method={method}
        />
      ))}
    </div>
  );
}
