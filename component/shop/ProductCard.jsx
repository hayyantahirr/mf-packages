"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { convertPrice, formatPrice } from "@/config/utils/currencyUtils";

const ProductCard = ({ product }) => {
  // Variation state
  const [selectedVarId, setSelectedVarId] = useState(product.variations[0]?.id);
  const selectedVariation =
    product.variations.find((v) => v.id === selectedVarId) ||
    product.variations[0];

  const hasMultipleVariations = product.variations.length > 1;
  const { selectedCurrency, exchangeRates } = useSelector(
    (state) => state.currency,
  );

  const formatMinMax = () => {
    const minConverted = convertPrice(
      product.minPrice,
      selectedCurrency,
      exchangeRates,
    );
    const maxConverted = convertPrice(
      product.maxPrice,
      selectedCurrency,
      exchangeRates,
    );

    if (minConverted === maxConverted)
      return formatPrice(minConverted, selectedCurrency);
    return `${formatPrice(minConverted, selectedCurrency)} - ${formatPrice(maxConverted, selectedCurrency)}`;
  };

  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(44,62,80,0.1)] transition-all duration-500 border border-brand-section hover:border-brand-cta/20 flex flex-col h-full hover:-translate-y-3">
      {/* Thumbnail Container */}
      <div className="relative h-72 w-full overflow-hidden bg-brand-section">
        <Image
          src={product.mainImage || "/carousel/brown-kraft-flat-bottom.png"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Badges Overlay */}
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          <span className="bg-brand-header/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
            {product.category || "Uncategorized"}
          </span>
          {selectedVariation?.inStock ? (
            <span className="bg-brand-success/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5 text-nowrap">
              <CheckCircle2 size={10} /> In Stock
            </span>
          ) : (
            <span className="bg-brand-cta/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5 text-nowrap">
              <XCircle size={10} /> Out of Stock
            </span>
          )}
        </div>

        {/* Variation Count Badge */}
        {hasMultipleVariations && (
          <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-brand-section flex items-center gap-1.5 animate-fade-in translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
            <span className="w-2 h-2 rounded-full bg-brand-cta animate-pulse"></span>
            <span className="text-[10px] font-black text-brand-header uppercase tracking-tighter">
              {product.variations.length} Sizes Available
            </span>
          </div>
        )}

        {/* Gallery Preview Component */}
        {product.extraImages && product.extraImages.length > 0 && (
          <div className="absolute bottom-5 left-5 flex -space-x-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
            {product.extraImages.slice(0, 3).map((img, idx) => (
              <div
                key={idx}
                className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-xl ring-2 ring-brand-header/10"
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {product.extraImages.length > 3 && (
              <div className="w-10 h-10 rounded-full bg-brand-header/90 backdrop-blur-md border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-xl">
                +{product.extraImages.length - 3}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col grow bg-linear-to-b from-white to-brand-section/30">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-brand-text tracking-tight group-hover:text-brand-cta transition-colors leading-tight">
              {product.name}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-brand-text/50 uppercase tracking-widest">
                Starting from{" "}
                <span className="text-brand-cta font-black">
                  {formatMinMax()}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Truncated Description */}
        <p className="text-brand-text/80 text-sm leading-relaxed mb-8 ">
          {product.description?.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description ||
              "Premium quality biodegradable packaging solution."}
        </p>

        {/* Footer / CTA */}
        <div className="mt-auto space-y-5 pt-6 border-t border-brand-section">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-brand-text/50 text-[10px] uppercase font-black tracking-widest mb-1">
                Full Collection
              </span>
              <span className="text-xl font-black text-brand-text">
                {product.variations.length} Variants
              </span>
            </div>
            <Link
              href={`/shop/${encodeURIComponent(product.name)}`}
              className="flex items-center gap-2 px-6 py-3 bg-brand-header text-white hover:bg-brand-cta rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 group/btn"
            >
              View More
              <ChevronRight
                size={14}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
