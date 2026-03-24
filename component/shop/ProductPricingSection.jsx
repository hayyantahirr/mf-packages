"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/src/components/cart/cartSlice";
import { calculateTieredPrice } from "@/src/utils/pricing";
import {
  ShoppingCart,
  Truck,
  Printer,
  Info,
  ChevronDown,
  Gift,
} from "lucide-react";

export default function ProductPricingSection({
  id,
  name,
  size,
  mainImage,
  basePrice,
  printingPrice,
  inStock,
}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(100);

  const currentPrice = calculateTieredPrice(quantity, basePrice);
  const isDiscounted = currentPrice < basePrice;

  const handleAddToCart = () => {
    dispatch(addItem({
      id,
      name,
      size: size || "Standard",
      quantity,
      originalPrice: basePrice, // Pass originalPrice for tiered recalculation in cart
      basePrice: currentPrice,
      mainImage: mainImage || "/placeholder.png"
    }));
  };

  return (
    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-8 backdrop-blur-md shadow-2xl animate-fade-in">
      {/* Price Display Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-white/10">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Printing Cost per color per side
          </span>
          <div className="flex items-baseline justify-start gap-2">
            <span className="text-sm font-black text-slate-400">+ Rs.</span>
            <span className="text-4xl font-black text-[#D00000] tracking-tighter">
              {printingPrice || "0"}
            </span>
          </div>
        </div>

        <div className="space-y-1 text-right">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Base Unit Price
          </span>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-sm font-black text-slate-400">Rs.</span>
              <span className="text-6xl font-black text-white tracking-tighter transition-all duration-300">
                {currentPrice.toLocaleString()}
              </span>
            </div>
            {isDiscounted && (
              <span className="bg-[#D00000]/20 text-[#D00000] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-[#D00000]/30 animate-pulse">
                Discounted Price
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
          Select Order Quantity
        </label>
        <div className="relative group">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 text-white py-4 px-6 rounded-2xl font-black text-sm appearance-none cursor-pointer focus:outline-none focus:border-[#D00000] transition-all hover:border-white/20"
          >
            {Array.from({ length: 20 }, (_, i) => (i + 1) * 50).map((qty) => (
              <option key={qty} value={qty} className="bg-[#1D2D44] text-white">
                {qty} PCS {qty === 50 || qty === 100 ? "(Default)" : ""}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 group-hover:text-white transition-colors">
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      {/* Key Information & Samples */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
          <Truck size={18} className="text-[#D00000]" />
          <span>Free Shipping on Volume Orders over Rs. 10,000</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
          <Printer size={18} className="text-[#D00000]" />
          <span>Custom Branding Available: Standard 10-day lead time</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
          <Gift size={18} className="text-[#D00000]" />
          <span className="font-bold text-white tracking-tight uppercase text-xs underline decoration-[#D00000] underline-offset-4">
            No Cylinder Charges
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[10px] font-black text-[#D00000] uppercase tracking-widest">
            <Info size={14} /> Sample Service
          </div>
          <p className="text-slate-400 text-xs leading-relaxed font-medium">
            Sample cost is <span className="text-white font-bold">Rs. 50/pc</span> (any size). 
            Delivery is <span className="text-white font-bold">Rs. 250</span> for overnight shipping.
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
