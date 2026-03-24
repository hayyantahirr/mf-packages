import React from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  ArrowLeft,
  ShoppingCart,
  CheckCircle2,
  XCircle,
  Package,
  Info,
  ShieldCheck,
  Truck,
  Printer,
  FileText,
} from "lucide-react";
import { notFound } from "next/navigation";
import ProductImageGallery from "@/component/shop/ProductImageGallery";
import ProductPricingSection from "@/component/shop/ProductPricingSection";

export default async function SingleProductPage({ params }) {
  const { productName: rawProductName, productId } = await params;
  const productName = decodeURIComponent(rawProductName);

  let product = null;
  let error = null;

  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // Serialize Firestore Timestamps
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

      product = {
        id: docSnap.id,
        ...serializedData,
      };
    }
  } catch (err) {
    console.error("Error fetching product detail:", err);
    error = "Unable to load product details. Please try again later.";
  }

  if (!product && !error) {
    notFound();
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1D2D44] flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-white/10 text-center animate-fade-in">
          <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle size={40} />
          </div>
          <h2 className="text-2xl font-black text-white mb-4">
            Error Loading Product
          </h2>
          <p className="text-slate-400 mb-8">{error}</p>
          <Link
            href={`/shop/${encodeURIComponent(productName)}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#D00000] text-white rounded-2xl font-bold transition-all hover:bg-white hover:text-[#D00000] shadow-xl"
          >
            <ArrowLeft size={18} />
            Back to Variations
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [product.mainImage, ...(product.extraImages || [])].filter(
    Boolean,
  );

  return (
    <div className="min-h-screen bg-[#1D2D44] py-16 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Navigation */}
        <Link
          href={`/shop/${encodeURIComponent(productName)}`}
          className="group inline-flex items-center gap-3 text-slate-400 hover:text-white transition-all font-bold text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-xl border border-white/10 animate-fade-in"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to {productName} Variations
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 animate-fade-in">
          {/* Left Column: Image Gallery & Detailed Description */}
          <div className="space-y-12">
            <ProductImageGallery images={allImages} productName={productName} />

            <div className="space-y-8 pt-10 border-t border-white/10">
              <div className="flex items-center gap-2 text-[#D00000] font-black text-xs uppercase tracking-[0.2em]">
                <FileText size={16} />
                Technical Specifications
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Material Structure */}
                <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10 group hover:border-[#D00000]/30 transition-all">
                  <div className="flex items-center gap-2 text-slate-500 font-black text-[10px] uppercase tracking-widest">
                    Material Structure
                  </div>
                  <div className="text-white font-bold text-sm leading-relaxed">
                    {typeof product.materialStructure === "object" ? (
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(product.materialStructure).map(([key, value]) => (
                          <div key={key} className="bg-white/5 px-2 py-1 rounded-lg border border-white/10">
                            <span className="text-slate-400 text-[10px] uppercase">{key}:</span> {String(value)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>{product.materialStructure || "High-barrier multi-layer composite film."}</p>
                    )}
                  </div>
                </div>

                {/* Capacity & Specs */}
                <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10 group hover:border-[#D00000]/30 transition-all">
                  <div className="flex items-center gap-2 text-slate-500 font-black text-[10px] uppercase tracking-widest">
                    Capacity Specs
                  </div>
                  <div className="text-white font-bold text-sm leading-relaxed">
                    {typeof product.capacitySpecs === "object" ? (
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(product.capacitySpecs).map(([key, value]) => (
                          <div key={key} className="bg-white/5 px-2 py-1 rounded-lg border border-white/10">
                            <span className="text-slate-400 text-[10px] uppercase">{key}:</span> {String(value)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>{product.capacitySpecs || "Industrial grade specifications."}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Pricing */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-[#D00000]/10 text-[#D00000] border border-[#D00000]/30 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  {product.category}
                </span>
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck size={12} className="text-[#00FF88]" /> Verified
                  Quality
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none uppercase">
                {productName}
                <span className="block text-2xl md:text-3xl text-white mt-2 font-black ">
                  Size : {product.size || "Standard Edition"}
                </span>
              </h1>
            </div>

            {/* Dynamic Pricing & Quantity Section */}
            <ProductPricingSection
              id={product.id}
              name={productName}
              size={product.size}
              mainImage={product.mainImage}
              basePrice={product.price}
              printingPrice={product.printingPrice}
              inStock={product.inStock}
            />

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Item ID
                </span>
                <span className="text-white font-bold text-sm">
                  #{product.id.slice(-8)}
                </span>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Stock Status
                </span>
                <span
                  className={`font-bold text-sm ${product.inStock ? "text-[#00FF88]" : "text-red-500"}`}
                >
                  {product.inStock ? "Available" : "Restocking Soon"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-white/10">
          {[
            {
              icon: ShieldCheck,
              title: "Premium Material",
              desc: "Crafted from eco-friendly, food-grade materials for maximum safety.",
            },
            {
              icon: Printer,
              title: "Custom Print",
              desc: "High-precision CMYK printing available for your brand logos.",
            },
            {
              icon: Truck,
              title: "Secure Logistics",
              desc: "Reinforced shipping packaging to ensure zero-damage delivery.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="space-y-3 p-8 rounded-3xl bg-white/5 border border-white/10"
            >
              <feature.icon className="text-[#D00000] w-10 h-10" />
              <h3 className="text-white font-black text-lg uppercase tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
