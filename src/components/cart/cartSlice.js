"use client";

import { createSlice } from "@reduxjs/toolkit";

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
     * Adds an item to the cart or increments quantity if it already exists.
     * payload: { id, name, size, quantity, basePrice, mainImage }
     */
    addItem: (state, action) => {
      const { id, size, quantity, basePrice } = action.payload;
      
      // Look for an existing item with the same ID and size variation
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size
      );

      if (existingItem) {
        // Increment quantity and update total price
        existingItem.quantity += quantity;
        existingItem.totalPrice = Number((existingItem.quantity * existingItem.basePrice).toFixed(2));
      } else {
        // Add new item to the array
        state.items.push({
          ...action.payload,
          totalPrice: Number((quantity * basePrice).toFixed(2)),
        });
      }
    },

    /**
     * Removes an item from the cart based on its ID and size.
     */
    removeItem: (state, action) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size)
      );
    },

    /**
     * Updates the quantity of a specific item.
     * payload: { id, size, quantity }
     */
    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.size === size
      );
      if (item) {
        // Ensure quantity is at least 1
        item.quantity = Math.max(1, quantity);
        item.totalPrice = Number((item.quantity * item.basePrice).toFixed(2));
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
