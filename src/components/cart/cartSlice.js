"use client";

import { createSlice } from "@reduxjs/toolkit";
import { calculateTieredPrice } from "../../utils/pricing";

/**
 * Initial state for the shopping cart.
 * items: Array of objects with id, name, size, quantity, basePrice, totalPrice, mainImage.
 * isOpen: Controls the visibility of the Cart Dropdown/Slide-over.
 */
const initialState = {
  items: [],
  isOpen: false,
};

/**
 * Cart slice containing reducers for managing cart items and UI state.
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Adds an item to the cart as a unique entry.
     * Every click of "Add to Cart" pushes a new item to the items array.
     */
    addItem: (state, action) => {
      const { quantity, originalPrice, basePrice } = action.payload;
      
      // Calculate final pricing at the time of addition
      const finalBasePrice = basePrice;
      const finalTotalPrice = Number((quantity * finalBasePrice).toFixed(2));

      state.items.push({
        ...action.payload,
        cartEntryId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        basePrice: finalBasePrice,
        totalPrice: finalTotalPrice,
      });
    },

    /**
     * Removes an item from the cart based on its unique entry ID.
     */
    removeItem: (state, action) => {
      const { cartEntryId } = action.payload;
      state.items = state.items.filter(
        (item) => item.cartEntryId !== cartEntryId
      );
    },

    /**
     * Toggles the visibility of the cart dropdown.
     */
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    /**
 * Sets the visibility of the cart dropdown.
 */
    setCartOpen: (state, action) => {
      state.isOpen = action.payload;
    },

    /**
     * Clears all items from the cart.
     */
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  toggleCart, 
  setCartOpen,
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
