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
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 text-center animate-fade-in">
          <div className="w-20 h-20 bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle size={40} />
          </div>
          <h2 className="text-2xl font-black text-brand-dark mb-4 uppercase tracking-tight">
            Error Loading Product
          </h2>
          <p className="text-gray-500 mb-8">{error}</p>
          <Link
            href={`/shop/${encodeURIComponent(productName)}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-dark text-white rounded-2xl font-bold transition-all hover:bg-brand-orange shadow-xl hover:scale-[1.02]"
          >
            <ArrowLeft size={18} />
            Back to Variations
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [
    product.mainImage,
    product.genImage,
    ...(product.extraImages || []),
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-brand-bg py-16 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Navigation */}
        <Link
          href={`/shop/${encodeURIComponent(productName)}`}
          className="group inline-flex items-center gap-3 text-brand-dark hover:text-brand-orange transition-all font-bold text-xs uppercase tracking-widest bg-white px-5 py-2.5 rounded-xl border border-gray-100 shadow-sm animate-fade-in"
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

            <div className="space-y-8 pt-10 border-t border-gray-200">
              <div className="flex items-center gap-2 text-brand-orange font-black text-xs uppercase tracking-[0.2em]">
                <FileText size={16} />
                Technical Specifications
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start text-brand-dark">
                <div className="space-y-8">
                  {/* Material Structure */}
                  <div className="space-y-3 p-6 rounded-2xl bg-white border border-gray-100 group hover:border-brand-orange/30 transition-all shadow-sm">
                    <div className="flex items-center gap-2 text-brand-dark/40 font-black text-[10px] uppercase tracking-widest">
                      Material Structure
                    </div>
                    <div className="font-bold text-sm leading-relaxed">
                      {typeof product.materialStructure === "object" ? (
                        <div className="flex flex-col gap-2">
                          {Object.entries(product.materialStructure).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                              >
                                <span className="text-brand-dark/60 text-[10px] uppercase font-bold tracking-wider">
                                  {key}
                                </span>
                                <span className="text-brand-dark text-sm font-black">
                                  {value} Microns
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      ) : (
                        <p className="text-brand-dark">
                          {product.materialStructure ||
                            "High-barrier multi-layer composite film."}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Printing Specifications */}
                  <div className="space-y-3 p-6 rounded-2xl bg-white border border-gray-100 group hover:border-brand-orange/30 transition-all shadow-sm">
                    <div className="flex items-center gap-2 text-brand-dark/40 font-black text-[10px] uppercase tracking-widest">
                      <Printer size={12} className="text-brand-orange" />{" "}
                      Printing Specifications
                    </div>
                    <div className="font-bold text-sm leading-relaxed">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between py-2 border-b border-gray-50">
                          <span className="text-brand-dark/60 text-[10px] uppercase font-bold tracking-wider">
                            Material Type
                          </span>
                          <span className="text-brand-dark text-sm font-black">
                            {typeof product.materialStructure === "object"
                              ? "Multi-Layer"
                              : product.materialStructure}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-brand-dark/60 text-[10px] uppercase font-bold tracking-wider">
                            Cost:
                          </span>
                          <span className="text-brand-orange">
                            Rs. {product.printingPrice || "0"}
                          </span>
                          <span className="text-gray-400 text-[8px] uppercase">
                            per color per side
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-brand-dark/60 text-[10px] uppercase font-bold tracking-wider">
                            Lead Time:
                          </span>
                          <span className="text-brand-dark">
                            10 Working Days
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-brand-dark/60 text-[10px] uppercase font-bold tracking-wider">
                            Minimum Order Quantity:
                          </span>
                          <span className="text-brand-dark">1000 PCS</span>
                        </div>
                        <div className="bg-brand-orange/10 border border-brand-orange/20 px-3 py-1.5 rounded-lg inline-flex items-center gap-2 w-fit">
                          <CheckCircle2
                            size={12}
                            className="text-brand-success"
                          />
                          <span className="text-[10px] font-black uppercase text-brand-orange">
                            No Cylinder Charges
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Capacity & Specs */}
                <div className="space-y-3 p-6 rounded-2xl bg-white border border-gray-100 group hover:border-brand-orange/30 transition-all shadow-sm">
                  <div className="flex items-center gap-2 text-brand-dark/40 font-black text-[10px] uppercase tracking-widest">
                    Size Guide
                  </div>
                  <div className="font-bold text-sm leading-relaxed">
                    {typeof product.capacitySpecs === "object" ? (
                      <div className="flex flex-col gap-3">
                        {Object.entries(product.capacitySpecs).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                            >
                              <span className="text-brand-dark/60 text-[10px] uppercase font-bold tracking-wider">
                                {key}
                              </span>
                              <span className="text-brand-dark text-sm font-black text-right">
                                {value}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
                      <p className="text-brand-dark">
                        {product.capacitySpecs ||
                          "Industrial grade specifications."}
                      </p>
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
                <span className="bg-brand-orange/10 text-brand-orange border border-brand-orange/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  {product.category}
                </span>
                <span className="text-brand-dark/60 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck size={12} className="text-brand-success" />{" "}
                  Verified Quality
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight uppercase">
                {product.size} CM - {productName}
              </h1>
            </div>

            {/* Dynamic Pricing & Quantity Section */}
            <ProductPricingSection
              id={product.id}
              name={productName}
              size={product.size}
              mainImage={product.mainImage}
              basePrice={product.price}
              useTieredPricing={product.useTieredPricing}
              tieredPrices={product.tieredPrices}
              printingPrice={product.printingPrice}
              inStock={product.inStock}
              technicalSpecs={product.technicalSpecs}
            />

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Item ID
                </span>
                <span className="text-brand-dark font-bold text-sm">
                  #{product.id.slice(-8)}
                </span>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Stock Status
                </span>
                <span
                  className={`font-bold text-sm ${product.inStock ? "text-brand-success" : "text-brand-orange"}`}
                >
                  {product.inStock ? "Available" : "Restocking Soon"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-gray-200">
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
              className="space-y-3 p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="text-brand-orange w-10 h-10" />
              <h3 className="text-brand-dark font-black text-lg uppercase tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
