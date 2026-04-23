import React from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  ArrowLeft,
  ShoppingCart,
  CheckCircle2,
  XCircle,
  Package,
  Info,
  ChevronRight,
} from "lucide-react";
import { notFound } from "next/navigation";
import { calculateTieredPrice } from "@/config/utils/pricing";

export default async function ProductVariationsPage({ params }) {
  const { productName: rawProductName } = await params;
  const productName = decodeURIComponent(rawProductName);

  let variations = [];
  let error = null;

  try {
    const q = query(
      collection(db, "products"),
      where("name", "==", productName),
    );
    const querySnapshot = await getDocs(q);
    variations = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // Serialize Firestore Timestamps to ISO strings
      const serializedData = Object.entries(data).reduce(
        (acc, [key, value]) => {
          if (value && typeof value === "object" && "seconds" in value) {
            acc[key] = new Date(value.seconds * 1000).toISOString();
          } else {
            acc[key] = value;
          }
          return acc;
        },
        {},
      );

      return {
        id: doc.id,
        ...serializedData,
      };
    });
  } catch (err) {
    console.error("Error fetching variations:", err);
    error = "Unable to load product variations. Please try again later.";
  }

  // Robust sorting logic to display variations from smallest to largest
  const sortedVariations = [...variations].sort((a, b) => {
    const parseSize = (s) => {
      if (!s) return 0;
      const cleanS = s.toString().toLowerCase();

      // Case 1: Dimensions (e.g., "10x15" or "10 x 15")
      const dimMatch = cleanS.match(/(\d+)\s*x\s*(\d+)/);
      if (dimMatch) {
        // Sort primarily by area (WxH) for a predictable geometric progression
        return parseInt(dimMatch[1]) * parseInt(dimMatch[2]);
      }

      // Case 2: Single measurement (e.g., "250ml", "10cm", "50pcs")
      const singleMatch = cleanS.match(/(\d+)/);
      if (singleMatch) {
        return parseInt(singleMatch[1]);
      }

      return 0; // Fallback for pure strings
    };

    return parseSize(a.size) - parseSize(b.size);
  });

  if (sortedVariations.length === 0 && !error) {
    notFound();
  }

  // Find the most suitable "main" product data from available variations
  // Prioritize variations that have both general image and description populated
  const mainProduct =
    sortedVariations.find((v) => v.genImage && v.genDescription) ||
    sortedVariations.find((v) => v.genImage) ||
    sortedVariations.find((v) => v.genDescription) ||
    sortedVariations[0] ||
    {};

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 text-center animate-fade-in">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle size={40} />
          </div>
          <h2 className="text-2xl font-black text-[#1D2D44] mb-4">
            Error Loading Variations
          </h2>
          <p className="text-slate-500 mb-8">{error}</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1D2D44] text-white rounded-2xl font-bold transition-all hover:bg-[#D00000] hover:scale-[1.02] shadow-xl shadow-red-100"
          >
            <ArrowLeft size={18} />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg py-16 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Navigation & Header Section */}
        <div className="space-y-10 animate-fade-in">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 text-brand-dark hover:text-brand-orange transition-all font-bold text-xs uppercase tracking-widest bg-white px-5 py-2.5 rounded-xl border border-gray-100 shadow-sm"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to All Collections
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 pb-12 border-b border-gray-200">
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="bg-brand-orange/10 text-brand-orange border border-brand-orange/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  {mainProduct.category}
                </span>
                <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
                  <Package size={14} className="text-brand-orange" />
                  <span className="text-brand-dark/60 text-[10px] font-black uppercase tracking-widest">
                    {sortedVariations.length} Variations
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight uppercase">
                {productName}
              </h1>
              {mainProduct.genDescription && (
                <p className="text-brand-dark/80 text-base font-medium leading-relaxed border-l-4 border-brand-orange pl-6 max-w-2xl italic">
                  {mainProduct.genDescription}
                </p>
              )}
            </div>

            {mainProduct.genImage && (
              <div className="relative hidden md:block w-full md:w-80 h-fit rounded-4xl overflow-hidden border border-gray-100 shadow-2xl group/main shrink-0 bg-white">
                <Image
                  src={mainProduct.genImage}
                  alt={productName}
                  width={320}
                  height={320}
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark/10 to-transparent pointer-events-none"></div>
              </div>
            )}
          </div>
        </div>

        {/* Variations Listing - Vertical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {sortedVariations.map((v, idx) => {
            const productLink = `/shop/${encodeURIComponent(productName)}/${v.id}`;
            const CardWrapper = v.inStock ? Link : "div";

            return (
              <CardWrapper
                key={v.id}
                href={v.inStock ? productLink : undefined}
                className={`group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-brand-orange/30 shadow-sm hover:shadow-2xl transition-all duration-500 ${
                  v.inStock
                    ? "hover:-translate-y-2 cursor-pointer"
                    : "opacity-75"
                } animate-fade-in`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Product Visual */}
                <div className="relative aspect-square overflow-hidden bg-brand-section">
                  <Image
                    src={
                      v.mainImage ||
                      mainProduct.mainImage ||
                      "/carousel/brown-kraft-flat-bottom.png"
                    }
                    alt={`${productName} - ${v.size}`}
                    fill
                    className="object-cover transition-transform duration-1000 "
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/20 to-transparent"></div>
                </div>

                {/* Product Info */}
                <div className="p-8 flex flex-col grow space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-brand-orange font-black text-[10px] uppercase tracking-[0.2em]">
                        <Package size={12} />
                        {v.category}
                      </div>
                      {v.inStock ? (
                        <span className="text-brand-success text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                          <CheckCircle2 size={12} /> In Stock
                        </span>
                      ) : (
                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                          <XCircle size={12} /> Out of Stock
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-black text-brand-dark tracking-tight group-hover:text-brand-orange transition-colors uppercase">
                      {v.size} CM - {productName}
                    </h3>
                  </div>

                  <div className="pt-6 border-t border-gray-50 flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Price / Piece
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-black text-gray-400">
                          Rs.
                        </span>
                        <span className="text-3xl font-black text-brand-dark tracking-tighter">
                          {calculateTieredPrice(1000, v.price, v.useTieredPricing, v.tieredPrices) || "---"}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-2xl transition-all duration-300 ${
                        v.inStock
                          ? "bg-brand-orange text-white group-hover:bg-[#ef6d59] shadow-lg shadow-brand-orange/20"
                          : "bg-gray-100 text-gray-300"
                      }`}
                    >
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="bg-brand-dark rounded-[3rem] p-12 md:p-20 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">
              Custom <span className="text-brand-orange">Manufacturing?</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
              We offer bespoke solutions with custom dimensions and premium
              branding for high-volume orders.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link
                href="/contact"
                className="px-10 py-5 bg-brand-orange text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-brand-dark transition-all duration-500 shadow-2xl"
              >
                Request Custom Quote
              </Link>
              <Link
                href="/shop"
                className="px-10 py-5 border-2 border-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-500"
              >
                Return to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
