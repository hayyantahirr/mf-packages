"use client";

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { removeItem, updateQuantity, toggleCart, setCartOpen } from "./cartSlice";

/**
 * CartDropdown component that displays the list of items in the cart.
 * Features: item list, quantity updates, removal, and grand total.
 */
const CartDropdown = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.cart);
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
  const grandTotal = items.reduce((total, item) => total + item.totalPrice, 0);

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
        className="relative w-full max-w-lg bg-[#1D2D44] h-screen shadow-2xl border-l border-white/10 flex flex-col pointer-events-auto transform transition-transform duration-500 ease-out"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-[#D00000]" size={24} />
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Your Cart</h2>
          </div>
          <button 
            onClick={() => dispatch(setCartOpen(false))}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

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
                key={`${item.id}-${item.size}`}
                className="flex gap-4 p-4 rounded-3xl bg-white/5 border border-white/10 group hover:border-[#D00000]/30 transition-all duration-300"
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
                        onClick={() => dispatch(removeItem({ id: item.id, size: item.size }))}
                        className="text-slate-500 hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-[10px] font-black text-[#D00000] uppercase tracking-widest mt-1">
                      Size: {item.size}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 bg-white/5 rounded-xl border border-white/10 p-1">
                      {item.quantity === 50 ? (
                        <button 
                          onClick={() => dispatch(removeItem({ id: item.id, size: item.size }))}
                          className="p-1.5 text-slate-500 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all"
                          title="Remove from cart"
                        >
                          <Trash2 size={12} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, quantity: Math.max(50, item.quantity - 50) }))}
                          className="p-1.5 text-slate-400 hover:bg-white/10 hover:text-white rounded-lg transition-all"
                        >
                          <Minus size={12} />
                        </button>
                      )}
                      <span className="w-8 text-center text-xs font-black text-white">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, quantity: item.quantity + 50 }))}
                        className="p-1.5 text-slate-400 hover:bg-white/10 hover:text-white rounded-lg transition-all"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 uppercase font-black">Subtotal</p>
                      <p className="text-lg font-black text-white tracking-tighter">
                        Rs. {item.totalPrice.toLocaleString()}
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
                  Rs. {grandTotal.toLocaleString()}
                </p>
              </div>
              <div className="text-right text-xs text-slate-500 font-medium">
                Inclusive of all taxes
              </div>
            </div>

            <button className="w-full py-6 bg-[#D00000] text-white rounded-3xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 hover:bg-white hover:text-[#D00000] transition-all duration-500 shadow-2xl shadow-[#D00000]/20">
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
