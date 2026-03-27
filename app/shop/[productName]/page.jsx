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

  if (variations.length === 0 && !error) {
    notFound();
  }

  const mainProduct = variations[0] || {};

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
    <div className="min-h-screen bg-[#1D2D44] py-16 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Navigation & Header Section */}
        <div className="space-y-10 animate-fade-in">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 text-slate-400 hover:text-white transition-all font-bold text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-xl border border-white/10"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to All Collections
          </Link>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 pb-12 border-b border-white/10">
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="bg-[#D00000]/10 text-[#D00000] border border-[#D00000]/30 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  {mainProduct.category}
                </span>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                  <Package size={14} className="text-[#D00000]" />
                  <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest">
                    {variations.length} Variations
                  </span>
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none uppercase">
                {productName}
              </h1>
              {mainProduct.genDescription && (
                <p className="text-white text-sm md:text-base font-medium leading-relaxed border-l-2 border-[#D00000] pl-4 max-w-2xl">
                  {mainProduct.genDescription}
                </p>
              )}
            </div>

            {mainProduct.mainImage && (
              <div className="relative w-full md:w-72 aspect-square rounded-4xl overflow-hidden border border-white/10 shadow-2xl group/main shrink-0">
                <Image
                  src={mainProduct.mainImage}
                  alt={productName}
                  fill
                  className="object-cover transition-transform duration-700 "
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1D2D44]/40 to-transparent"></div>
              </div>
            )}
          </div>
        </div>

        {/* Variations Listing - Vertical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {variations.map((v, idx) => (
            <div
              key={v.id}
              className="group flex flex-col bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-[#D00000]/30 shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Product Visual */}
              <div className="relative aspect-square overflow-hidden bg-white/5">
                <Image
                  src={
                    v.mainImage ||
                    mainProduct.mainImage ||
                    "/carousel/brown-kraft-flat-bottom.png"
                  }
                  alt={`${productName} - ${v.size}`}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1D2D44]/80 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Product Info */}
              <div className="p-8 flex flex-col grow space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#D00000] font-black text-[10px] uppercase tracking-[0.2em]">
                      <Package size={12} />
                      {v.category}
                    </div>
                    {v.inStock ? (
                      <span className="text-[#00FF88] text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 size={12} /> In Stock
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <XCircle size={12} /> Out of Stock
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-[#D00000] transition-colors">
                    {v.size} CM - {productName}
                  </h3>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Price / Unit
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black text-slate-400">
                        Rs.
                      </span>
                      <span className="text-3xl font-black text-white tracking-tighter">
                        {v.price || "---"}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/shop/${encodeURIComponent(productName)}/${v.id}`}
                    className={`p-4 rounded-2xl transition-all duration-300 ${
                      v.inStock
                        ? "bg-[#D00000] text-white hover:bg-white hover:text-[#D00000] shadow-lg shadow-[#D00000]/20"
                        : "bg-white/5 text-white/20 cursor-not-allowed pointer-events-none"
                    }`}
                  >
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#D00000] rounded-[3rem] p-12 md:p-20 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">
              Custom <span className="text-[#1D2D44]">Manufacturing?</span>
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
              We offer bespoke solutions with custom dimensions and premium
              branding for high-volume orders.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link
                href="/contact"
                className="px-10 py-5 bg-[#1D2D44] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-[#1D2D44] transition-all duration-500 shadow-2xl"
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
