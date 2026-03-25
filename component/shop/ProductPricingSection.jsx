"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/src/components/cart/cartSlice";
import { ShoppingCart, Truck, Printer, Info, Gift } from "lucide-react";

import ProductTechnicalSpecs from "./ProductTechnicalSpecs";

export default function ProductPricingSection({
  id,
  name,
  size,
  mainImage,
  basePrice,
  printingPrice,
  inStock,
  technicalSpecs,
}) {
  const dispatch = useDispatch();
  const quantities = [50, 100, 500, 1000];
  const [quantity, setQuantity] = useState(100);

  // Fixed Tiered Pricing Logic
  const calculateFinalPrice = (qty) => {
    if (qty === 500) return basePrice - 2;
    if (qty === 1000) return basePrice - 3;
    return basePrice;
  };

  const currentPrice = calculateFinalPrice(quantity);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id,
        name,
        size: size || "Standard",
        quantity,
        originalPrice: basePrice,
        basePrice: currentPrice,
        mainImage: mainImage || "/placeholder.png",
      }),
    );
  };

  return (
    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-8 backdrop-blur-md shadow-2xl animate-fade-in">
      {/* Price Display Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-white/10">
        <div className="space-y-1 text-left w-full">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Unit Price
          </span>
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-baseline justify-start gap-2">
              <span className="text-sm font-black text-slate-400">Rs.</span>
              <span className="text-6xl font-black text-white tracking-tighter transition-all duration-300">
                {currentPrice.toLocaleString()}
              </span>
            </div>
            {quantity >= 500 && (
              <span className="bg-[#D00000]/20 text-[#D00000] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-[#D00000]/30 animate-pulse">
                Tiered Discount Applied
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quantity Selector (Buttons) */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
          Select Bundle Size
        </label>
        <div className="grid grid-cols-2 gap-3">
          {quantities.map((qty) => (
            <button
              key={qty}
              onClick={() => setQuantity(qty)}
              className={`py-4 px-6 rounded-2xl font-black text-sm transition-all border ${
                quantity === qty
                  ? "bg-[#D00000] border-[#D00000] text-white shadow-lg shadow-[#D00000]/20 scale-[1.02]"
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {qty} PCS
              {qty >= 500 && (
                <span className="block text-[8px] opacity-70 mt-0.5">
                  Save Rs. {qty === 500 ? "2" : "3"}/pc
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Technical Specifications - Immediately below buttons */}
      <ProductTechnicalSpecs specs={technicalSpecs} />

      {/* Key Information & Samples */}
      <div className="space-y-4 pt-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[10px] font-black text-[#D00000] uppercase tracking-widest">
            <Info size={14} /> Sample Service
          </div>
          <p className="text-slate-400 text-xs leading-relaxed font-medium">
            Sample cost is{" "}
            <span className="text-white font-bold">Rs. 50/pc</span> (any size).
            Delivery is <span className="text-white font-bold">Rs. 250</span>{" "}
            for overnight shipping.
          </p>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!inStock}
        className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 transition-all duration-500 shadow-2xl ${
          inStock
            ? "bg-[#D00000] text-white hover:bg-white hover:text-[#D00000] hover:scale-[1.02]"
            : "bg-white/5 text-white/20 cursor-not-allowed"
        }`}
      >
        <ShoppingCart size={22} />
        {inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
