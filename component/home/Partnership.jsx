import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  HandshakeIcon,
  TrendingUp,
  Globe,
  Package,
  BadgeCheck,
  ChevronRight,
  Boxes,
  Percent,
  HeadphonesIcon,
} from "lucide-react";

const partnerBenefits = [
  {
    icon: Percent,
    title: "Exclusive Partner Pricing",
    desc: "Unlock tiered wholesale discounts up to 40% off standard rates — scaling as your volume grows.",
    color: "text-brand-orange",
    bg: "bg-brand-orange/10",
    border: "border-brand-orange/20",
  },
  {
    icon: Globe,
    title: "Global Distribution Rights",
    desc: "Become an authorised regional distributor with exclusive territory rights and co-branded collateral.",
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Boxes,
    title: "Bulk Order Fulfilment",
    desc: "Priority production slots and dedicated account management for orders of 10,000 pcs and above.",
    color: "text-brand-success",
    bg: "bg-brand-success/10",
    border: "border-brand-success/20",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    desc: "A personal account manager, direct factory access, and same-day response SLA for all partners.",
    color: "text-purple-600",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
];

const bulkTiers = [
  {
    label: "Starter Bulk",
    qty: "5,000+",
    unit: "pcs",
    perk: "5% volume discount",
    icon: "📦",
    highlight: false,
  },
  {
    label: "Business Bulk",
    qty: "20,000+",
    unit: "pcs",
    perk: "15% volume discount",
    icon: "🏭",
    highlight: false,
  },
  {
    label: "Partner Tier",
    qty: "50,000+",
    unit: "pcs",
    perk: "25% + dedicated manager",
    icon: "🤝",
    highlight: true,
  },
  {
    label: "Distributor",
    qty: "100,000+",
    unit: "pcs",
    perk: "Custom pricing + exclusivity",
    icon: "🌍",
    highlight: false,
  },
];

const partnerTypes = [
  {
    title: "Become a Distributor",
    desc: "Sell MF Packages products in your region with exclusive territory rights, marketing support, and the highest volume pricing.",
    badge: "Exclusive Territory",
    badgeColor: "bg-brand-orange",
    cta: "Apply to Distribute",
    href: "/contact",
    dark: true,
  },
  {
    title: "Reseller Partner",
    desc: "List our full catalogue on your platform or storefront and earn a competitive margin on every order you place.",
    badge: "Open Applications",
    badgeColor: "bg-brand-success",
    cta: "Become a Reseller",
    href: "/contact",
    dark: false,
  },
  {
    title: "Bulk Buyer",
    desc: "Not a reseller, but ordering large volumes for your own brand? Get priority slots and volume-based pricing directly.",
    badge: "No Commitment",
    badgeColor: "bg-blue-600",
    cta: "Request Bulk Quote",
    href: "/contact",
    dark: false,
  },
];

const Partnership = () => {
  return (
    <section className="relative bg-brand-bg py-24 md:py-32 overflow-hidden">
      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-success/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand-dark/5 shadow-sm mb-6">
            <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark">
              Partner With Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-dark tracking-tight leading-tight mb-5 uppercase">
            Grow Together as a{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-red-400">
              MF Partner
            </span>
          </h2>
          <p className="text-brand-dark/50 text-base sm:text-lg font-medium leading-relaxed">
            Whether you&apos;re a regional distributor, a growing reseller, or a
            brand placing bulk orders — MF Packages has a partnership model
            built for you.
          </p>
        </div>

        {/* ── Partner Type Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {partnerTypes.map((type, i) => (
            <div
              key={i}
              className={`relative rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                type.dark
                  ? "bg-brand-dark border-white/10 text-white"
                  : "bg-white border-brand-dark/5 text-brand-dark"
              }`}
            >
              {/* Top accent line */}
              <div
                className={`h-1.5 w-full ${
                  type.dark
                    ? "bg-linear-to-r from-brand-orange to-red-400"
                    : i === 1
                      ? "bg-linear-to-r from-brand-success/60 to-brand-success/20"
                      : "bg-linear-to-r from-blue-500/60 to-blue-500/20"
                }`}
              />

              <div className="p-8">
                {/* Badge */}
                <span
                  className={`inline-block text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full text-white mb-5 ${type.badgeColor}`}
                >
                  {type.badge}
                </span>

                <h3
                  className={`text-xl font-black uppercase tracking-tight leading-tight mb-3 ${
                    type.dark ? "text-white" : "text-brand-dark"
                  }`}
                >
                  {type.title}
                </h3>

                <p
                  className={`text-sm font-medium leading-relaxed mb-8 ${
                    type.dark ? "text-white/60" : "text-brand-dark/55"
                  }`}
                >
                  {type.desc}
                </p>

                <Link
                  href={type.href}
                  className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 ${
                    type.dark
                      ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/25 hover:bg-opacity-90"
                      : "bg-brand-dark text-white hover:bg-brand-orange shadow-lg"
                  }`}
                >
                  {type.cta}
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── Partner Benefits ── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-black text-brand-dark uppercase tracking-tight">
              What You Get as a Partner
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerBenefits.map((b, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl bg-white border ${b.border} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl ${b.bg} flex items-center justify-center mb-4`}
                >
                  <b.icon size={20} className={b.color} />
                </div>
                <h4 className="text-sm font-black text-brand-dark mb-2 uppercase tracking-tight">
                  {b.title}
                </h4>
                <p className="text-xs text-brand-dark/50 font-medium leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bulk Order Tiers ── */}
        <div className="relative rounded-[2.5rem] bg-brand-dark overflow-hidden p-10 md:p-16">
          {/* BG glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-success/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-5">
                  <TrendingUp size={12} className="text-brand-orange" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                    Volume Pricing
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                  Bulk Order{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-red-400">
                    Tiers
                  </span>
                </h3>
                <p className="text-white/50 text-sm font-medium mt-3 max-w-lg">
                  The more you order, the more you save. All tiers include
                  priority production and quality inspection reports.
                </p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2.5 px-7 py-4 bg-brand-orange text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-opacity-90 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-brand-orange/25"
              >
                Get Custom Quote
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Tier Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {bulkTiers.map((tier, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                    tier.highlight
                      ? "bg-brand-orange border-brand-orange text-white shadow-xl shadow-brand-orange/20"
                      : "bg-white/5 border-white/10 hover:border-white/25 text-white"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white text-brand-orange rounded-full whitespace-nowrap shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-2xl mb-3">{tier.icon}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">
                    {tier.label}
                  </div>
                  <div className="text-2xl font-black leading-none mb-0.5">
                    {tier.qty}
                  </div>
                  <div
                    className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${
                      tier.highlight ? "opacity-80" : "opacity-40"
                    }`}
                  >
                    {tier.unit} minimum
                  </div>
                  <div
                    className={`text-xs font-black leading-snug ${
                      tier.highlight ? "text-white" : "text-brand-orange"
                    }`}
                  >
                    {tier.perk}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-white/30 text-[11px] font-medium mt-6 text-center">
              * Discounts apply on standard unit pricing. Custom substrates,
              printing, and special finishes quoted separately.
            </p>
          </div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className="mt-12 text-center">
          <p className="text-brand-dark/50 text-sm font-medium mb-4">
            Ready to explore a partnership? Our team responds within 24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-dark text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-orange transition-all duration-300 shadow-xl"
            >
              Start a Conversation
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/printing"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-brand-dark border border-brand-dark/10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:border-brand-orange hover:text-brand-orange transition-all duration-300 shadow-sm"
            >
              View Printing Options
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;
