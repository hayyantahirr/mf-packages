"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { toggleCart } from "./cartSlice";

/**
 * CartTrigger component that sits in the Navbar.
 * Displays the current item count and toggles the cart dropdown.
 */
const CartTrigger = () => {
  const dispatch = useDispatch();
  
  // Calculate total items in the cart
  const items = useSelector((state) => state.cart.items);
  const totalItems = items.length;

  return (
    <button 
      onClick={() => dispatch(toggleCart())}
      className="relative group focus:outline-none transition-all duration-300" 
      aria-label="Shopping Cart"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-linear-to-r from-[#D00000] to-transparent rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>

      {/* Main Button Container */}
      <div className="relative px-5 py-3 bg-linear-to-r from-[#D00000] to-[#D00000]/90 rounded-xl shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl border border-white/10 flex items-center space-x-2">
        <ShoppingCart className="w-5 h-5 text-[#f1ead6] group-hover:rotate-12 transition-transform duration-300" />
        <span className="hidden sm:inline text-[#f1ead6] font-bold text-sm tracking-wide">
          Cart
        </span>

        {/* Dynamic Badge for Item Count */}
        <span className="absolute -top-2 -right-2 bg-white text-[#D00000] text-[10px] font-black rounded-full w-6 h-6 flex items-center justify-center border-2 border-[#D00000] shadow-sm transform group-hover:scale-110 transition-transform duration-300">
          {totalItems}
        </span>
      </div>
    </button>
  );
};

export default CartTrigger;
