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
     * Adds an item to the cart or increments quantity if it already exists.
     * payload: { id, name, size, quantity, basePrice, mainImage }
     */
    addItem: (state, action) => {
      const { id, size, quantity, originalPrice, basePrice, mainImage, name } = action.payload;
      
      // Look for an existing item with the same ID and size variation
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size
      );

      if (existingItem) {
        // Increment quantity and update total price based on NEW tiered base price
        existingItem.quantity += quantity;
        
        // Recalculate base price based on new quantity if originalPrice exists
        if (existingItem.originalPrice) {
          existingItem.basePrice = calculateTieredPrice(existingItem.quantity, existingItem.originalPrice);
        }
        
        existingItem.totalPrice = Number((existingItem.quantity * existingItem.basePrice).toFixed(2));
      } else {
        // Add new item to the array
        state.items.push({
          ...action.payload,
          // Ensure basePrice is calculated if not already
          basePrice: basePrice || calculateTieredPrice(quantity, originalPrice),
          totalPrice: Number((quantity * (basePrice || calculateTieredPrice(quantity, originalPrice))).toFixed(2)),
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
        // Ensure quantity is at least 50 and is a multiple of 50
        const newQuantity = Math.max(50, quantity);
        item.quantity = newQuantity;
        
        // Recalculate base price based on new quantity using originalPrice
        if (item.originalPrice) {
          item.basePrice = calculateTieredPrice(newQuantity, item.originalPrice);
        }
        
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
