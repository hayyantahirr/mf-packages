"use client";

import { createSlice } from "@reduxjs/toolkit";
import { calculateTieredPrice } from "@/config/utils/pricing";

/**
 * Initial state for the shopping cart.
 * items: Array of objects with id, name, size, quantity, basePrice, totalPrice, mainImage.
 * isOpen: Controls the visibility of the Cart Dropdown/Slide-over.
 */
const initialState = {
  items: [],
  cartCurrency: null, // Locked currency for the current cart session
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
      const { quantity, basePricePKR, currency } = action.payload;
      
      // If cart is empty, lock the currency to the first item added
      if (state.items.length === 0) {
        state.cartCurrency = currency;
      }

      state.items.push({
        ...action.payload,
        cartEntryId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        basePricePKR, // Store original PKR price
        totalPricePKR: Number((quantity * basePricePKR).toFixed(2)),
        currencyAddedUnder: currency, // The currency selected when this was added
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

      // If cart becomes empty, unlock the currency
      if (state.items.length === 0) {
        state.cartCurrency = null;
      }
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
      state.cartCurrency = null;
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
