"use client";

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { removeItem, toggleCart, setCartOpen } from "./cartSlice";
import { convertPrice, formatPrice } from "@/config/utils/currencyUtils";
import { AlertCircle } from "lucide-react";

/**
 * CartDropdown component that displays the list of items in the cart.
 * Features: item list, quantity updates, removal, and grand total.
 */
const CartDropdown = () => {
  const dispatch = useDispatch();
  const { items, isOpen, cartCurrency } = useSelector((state) => state.cart);
  const { selectedCurrency, exchangeRates } = useSelector((state) => state.currency);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(setCartOpen(false));
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, dispatch]);

  // Calculate Grand Total
  // Calculate Totals dynamically based on selected currency
  const grandTotal = items.reduce((total, item) => {
    const itemTotalConverted = convertPrice(item.totalPricePKR, selectedCurrency, exchangeRates);
    return total + itemTotalConverted;
  }, 0);

  const isCurrencyMismatch = cartCurrency && selectedCurrency !== cartCurrency;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex justify-end animate-fade-in pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity pointer-events-auto"
        onClick={() => dispatch(setCartOpen(false))}
      ></div>

      {/* Dropdown Panel */}
      <div 
        ref={dropdownRef}
        className="relative w-full max-w-lg bg-brand-dark/95 backdrop-blur-2xl h-screen shadow-2xl border-l border-white/10 flex flex-col pointer-events-auto transform transition-transform duration-500 ease-out"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-brand-orange" size={24} />
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Your Cart</h2>
          </div>
          <button 
            onClick={() => dispatch(setCartOpen(false))}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Currency Mismatch Warning */}
        {isCurrencyMismatch && (
          <div className="bg-brand-orange/10 border-b border-brand-orange/20 p-4 flex items-center gap-3 animate-pulse">
            <AlertCircle className="text-brand-orange shrink-0" size={18} />
            <p className="text-[10px] font-bold text-brand-orange uppercase tracking-wider leading-relaxed">
              Currency mismatch. This cart was locked to <span className="underline">{cartCurrency}</span>. Please switch back to checkout.
            </p>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
              <ShoppingBag size={80} strokeWidth={1} />
              <div className="space-y-2">
                <p className="text-xl font-bold text-white">Your cart is empty</p>
                <p className="text-slate-400">Start adding premium packages to your collection.</p>
              </div>
              <button 
                onClick={() => dispatch(setCartOpen(false))}
                className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white hover:text-[#1D2D44] transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.cartEntryId}
                className="flex gap-4 p-4 rounded-3xl bg-white/5 border border-white/10 group hover:border-brand-orange/30 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                  <Image 
                    src={item.mainImage} 
                    alt={item.name} 
                    fill 
                    className="object-contain p-2"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-white uppercase tracking-tight text-sm line-clamp-1">
                        {item.name}
                      </h3>
                      <button 
                        onClick={() => dispatch(removeItem({ cartEntryId: item.cartEntryId }))}
                        className="text-slate-500 hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                      <p className="text-[10px] font-black text-brand-orange uppercase tracking-widest">
                        Size: {item.size}
                      </p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Quantity: {item.quantity} PCS
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-3">
                    <div className="text-left">
                      <p className="text-[10px] text-slate-500 uppercase font-black">Unit Price</p>
                      <p className="text-sm font-bold text-white">
                        {formatPrice(convertPrice(item.basePricePKR, selectedCurrency, exchangeRates), selectedCurrency)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 uppercase font-black">Subtotal</p>
                      <p className="text-lg font-black text-white tracking-tighter">
                        {formatPrice(convertPrice(item.totalPricePKR, selectedCurrency, exchangeRates), selectedCurrency)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Grand Total */}
        {items.length > 0 && (
          <div className="p-8 border-t border-white/10 bg-white/5 space-y-6">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Grand Total</p>
                <p className="text-4xl font-black text-white tracking-tighter">
                  {formatPrice(grandTotal, selectedCurrency)}
                </p>
              </div>
              <div className="text-right text-xs text-slate-500 font-medium">
                Inclusive of all taxes
              </div>
            </div>

            <Link 
              href={isCurrencyMismatch ? "#" : "/checkout"} 
              onClick={(e) => {
                if (isCurrencyMismatch) {
                  e.preventDefault();
                  alert(`Please switch your currency back to ${cartCurrency} to proceed to checkout.`);
                } else {
                  dispatch(setCartOpen(false));
                }
              }}
              className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl ${
                isCurrencyMismatch 
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                  : "bg-brand-orange text-white hover:bg-white hover:text-brand-orange shadow-brand-orange/20"
              }`}
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
