"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import { clearCart } from "@/component/cart/cartSlice";
import {
  ChevronLeft,
  CreditCard,
  Truck,
  Package,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { convertPrice, formatPrice } from "@/config/utils/currencyUtils";

/**
 * MF-Packages Checkout Page
 * Responsive split-screen layout with Firestore integration.
 */
export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, cartCurrency } = useSelector((state) => state.cart);
  const { selectedCurrency, exchangeRates } = useSelector((state) => state.currency);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState("bank"); // Only 'bank' allowed now
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderIdRef, setOrderIdRef] = useState("");
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  /**
   * FORM VALIDATION LOGIC
   * 1. All mandatory fields (name, phone, email, address) must have non-empty values.
   * 2. A payment method must be selected.
   * 3. The "Confirm Order" button is disabled if these conditions are not met.
   */
  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.address.trim() !== "" &&
    paymentMethod !== "";

  // Calculations
  // Calculations (Dynamic based on PKR base)
  const subtotalPKR = items.reduce((acc, item) => acc + item.totalPricePKR, 0);
  const shippingFeePKR = 1500;
  const grandTotalPKR = subtotalPKR + shippingFeePKR;

  const subtotal = convertPrice(subtotalPKR, selectedCurrency, exchangeRates);
  const shippingFee = convertPrice(shippingFeePKR, selectedCurrency, exchangeRates);
  const grandTotal = subtotal + shippingFee;

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Generates a unique Order ID: MF-XXXXX
   * Uses current timestamp and a random string for uniqueness.
   */
  const generateOrderId = () => {
    const timestamp = Date.now().toString().slice(-5);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `MF-${timestamp}${random}`;
  };

  /**
   * FIRESTORE ORDER WRITE PROCESS
   * 1. Check if form is valid and not already submitting.
   * 2. Generate a unique custom Order ID.
   * 3. Prepare the data object (customer details, cart items, payment info, timestamp).
   * 4. Use Firebase SDK 'addDoc' to save the order in the 'orders' collection.
   * 5. On success, clear the global Redux cart and show the success confirmation state.
   */
  const handleConfirmOrder = async () => {
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    const orderId = generateOrderId();
    setOrderIdRef(orderId);

    try {
      // Data Object structure for Firestore 'orders' collection
      const orderData = {
        orderId, // Custom MF-XXXXX ID
        customerDetails: {
          ...formData,
        },
        items: items.map((item) => ({
          id: item.id || item.cartEntryId,
          name: item.name,
          size: item.size || "Standard",
          quantity: item.quantity,
          totalPriceConverted: convertPrice(item.totalPricePKR, selectedCurrency, exchangeRates),
          basePricePKR: item.basePricePKR,
          mainImage: item.mainImage || null,
        })),
        paymentMethod,
        status: "Pending",
        totalAmountConverted: grandTotal, // The amount in the used currency
        totalAmountPKR: grandTotalPKR,    // Original PKR for reference
        currencyUsed: selectedCurrency,
        exchangeRateAtTimeOfPurchase: exchangeRates[selectedCurrency] || 1,
        createdAt: serverTimestamp(),
      };

      // Writing to Firestore 'orders' collection
      await addDoc(collection(db, "orders"), orderData);

      // POST-ORDER ACTIONS:
      // Reset the Redux cart persistence state
      dispatch(clearCart());
      // Trigger success view
      setShowSuccess(true);
    } catch (error) {
      console.error("Error writing to Firestore:", error);
      alert("Failed to place order. Connection error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If cart is empty and not showing success, redirect to shop
  useEffect(() => {
    if (items.length === 0 && !showSuccess) {
      // router.push("/shop");
    }
  }, [items, showSuccess, router]);

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-gray-100 rounded-[2.5rem] p-10 text-center shadow-2xl animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-brand-success/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-brand-success" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-brand-dark mb-4 uppercase tracking-tight">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your order{" "}
            <span className="text-brand-orange font-mono font-bold tracking-wider">{orderIdRef}</span> has
            been placed successfully for <span className="font-extrabold text-brand-dark">{formatPrice(grandTotal, selectedCurrency)}</span>.
          </p>
          <div className="space-y-6">
            <button
              onClick={() => router.push("/shop")}
              className="w-full bg-brand-dark text-white font-black py-5 rounded-2xl hover:bg-brand-orange transition-all cursor-pointer shadow-lg shadow-brand-dark/10 tracking-widest uppercase text-xs"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark selection:bg-brand-orange/20">
      {/* Spacer for Fixed Navbar */}
      <div className="h-28 md:h-36"></div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side: Order Summary */}
          <div
            className="space-y-8 animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            {/* Mobile Toggle Handle */}
            <button
              onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
              className="lg:hidden w-full flex items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 font-black text-brand-orange text-lg">
                <Package className="w-5 h-5" />
                <span className="text-brand-dark font-black text-lg uppercase tracking-tight">
                  Order Summary
                </span>
              </div>
              <div className="flex items-center gap-4">
                <ChevronLeft
                  className={`w-5 h-5 text-brand-dark transition-transform duration-300 ${isSummaryExpanded ? "rotate-90" : "-rotate-90"}`}
                />
              </div>
            </button>

            <div
              className={`${isSummaryExpanded ? "block" : "hidden"} lg:block space-y-8`}
            >
              <div>
                <h2 className="text-2xl font-black mb-6 hidden lg:flex items-center gap-3 uppercase tracking-tight">
                  <Package className="w-6 h-6 text-brand-orange" />
                  Order Summary
                </h2>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                  {items.map((item) => (
                    <div
                      key={item.cartEntryId}
                      className="flex gap-5 p-5 bg-white border border-gray-100 rounded-2xl group hover:border-brand-orange/20 transition-all shadow-sm"
                    >
                      <div className="w-24 h-24 bg-brand-section rounded-xl overflow-hidden shrink-0 relative border border-gray-100">
                        {item.mainImage ? (
                          <Image
                            src={item.mainImage}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Package className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <div className="grow py-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-black text-brand-dark text-lg leading-tight mb-1 uppercase tracking-tight line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                            Size:{" "}
                            <span className="text-brand-dark font-black">
                              {item.size || "Custom"}
                            </span>
                          </p>
                          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                            Quantity:{" "}
                            <span className="text-brand-dark font-black">
                              {item.quantity}
                            </span>
                          </p>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                          <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                            {formatPrice(convertPrice(item.basePricePKR, selectedCurrency, exchangeRates), selectedCurrency)} / unit
                          </span>
                          <span className="font-black text-brand-dark text-lg">
                            {formatPrice(convertPrice(item.totalPricePKR, selectedCurrency, exchangeRates), selectedCurrency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {items.length === 0 && (
                    <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
                      <p className="text-gray-400 font-medium">Your cart is empty.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between text-sm uppercase font-bold tracking-widest">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-brand-dark">
                    {formatPrice(subtotal, selectedCurrency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm uppercase font-bold tracking-widest border-b border-gray-100 pb-4">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-brand-dark">
                    {formatPrice(shippingFee, selectedCurrency)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-black text-brand-orange uppercase tracking-tight">
                    Grand Total
                  </span>
                  <span className="text-3xl font-black text-brand-dark tracking-tighter">
                    {formatPrice(grandTotal, selectedCurrency)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: User Details Form */}
          <div
            className="space-y-8 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl">
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase tracking-tight">
                <Truck className="w-6 h-6 text-brand-orange" />
                Shipping Details
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-brand-section border border-gray-100 rounded-xl px-5 py-4 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 focus:outline-none transition-all placeholder:text-gray-300 font-bold text-brand-dark"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 ml-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 03XX-XXXXXXX"
                      className="w-full bg-brand-section border border-gray-100 rounded-xl px-5 py-4 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 focus:outline-none transition-all placeholder:text-gray-300 font-bold text-brand-dark"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. john@example.com"
                    className="w-full bg-brand-section border border-gray-100 rounded-xl px-5 py-4 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 focus:outline-none transition-all placeholder:text-gray-300 font-bold text-brand-dark"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 ml-1">
                    Detailed Shipping Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Street, Area, City, Nearest Landmark..."
                    className="w-full bg-brand-section border border-gray-100 rounded-xl px-5 py-4 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 focus:outline-none transition-all placeholder:text-gray-300 font-bold text-brand-dark resize-none"
                  ></textarea>
                </div>

                {/* Payment Method Selection */}
                <div className="pt-4 space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 ml-1">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-1 gap-4">
                    <label
                      className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${paymentMethod === "bank" ? "bg-brand-orange/5 border-brand-orange shadow-sm" : "bg-brand-section border-gray-100 hover:border-gray-200"}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}
                        className="w-5 h-5 accent-brand-orange"
                      />
                      <div className="grow flex justify-between items-center">
                        <div>
                          <p className="font-black text-brand-dark uppercase text-sm tracking-tight">Online Bank Transfer</p>
                          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                            Direct deposit to our account
                          </p>
                        </div>
                        <CreditCard className="w-5 h-5 text-gray-300" />
                      </div>
                    </label>
                  </div>

                  {/* Revealed Bank Details */}
                  {paymentMethod === "bank" && (
                    <div className="mt-4 p-6 bg-brand-section border border-gray-100 rounded-2xl animate-fade-in">
                      <h4 className="text-xs font-black text-brand-orange mb-4 uppercase tracking-widest">
                        Bank Account Details
                      </h4>
                      <div className="space-y-6">
                        {/* Alfalah Details */}
                        <div className="space-y-2">
                          <h5 className="text-[10px] font-black text-brand-dark/50 uppercase tracking-widest border-b border-gray-100 pb-1">Option 1: Bank Alfalah</h5>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Account Title</span>
                            <span className="font-black text-brand-dark text-xs uppercase">Mf corporation</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Account Number</span>
                            <span className="font-mono font-black text-brand-dark text-xs">09811007533647</span>
                          </div>
                        </div>

                        {/* Meezan Details */}
                        <div className="space-y-2 pt-2">
                          <h5 className="text-[10px] font-black text-brand-dark/50 uppercase tracking-widest border-b border-gray-100 pb-1">Option 2: Meezan Bank</h5>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Account Title</span>
                            <span className="font-black text-brand-dark text-xs uppercase">Mf corporation</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Account Number</span>
                            <span className="font-mono font-black text-brand-dark text-xs">99420105704120</span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-6 p-3 bg-brand-orange/5 rounded-xl border border-brand-orange/10 text-[10px] text-brand-dark font-bold leading-relaxed italic text-center">
                        Please share payment screenshot on WhatsApp with your Order ID.
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-8">
                  <button
                    disabled={
                      !isFormValid || isSubmitting || items.length === 0
                    }
                    onClick={handleConfirmOrder}
                    className={`w-full py-5 rounded-2xl font-black text-sm tracking-widest uppercase transition-all shadow-xl active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3
                      ${
                        !isFormValid || isSubmitting || items.length === 0
                          ? "bg-gray-100 text-gray-300 border border-gray-200 cursor-not-allowed shadow-none"
                          : "bg-brand-dark text-white hover:bg-brand-orange shadow-brand-dark/10 hover:shadow-brand-orange/20"
                      }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <span>CONFIRM ORDER</span>
                        <CheckCircle2 className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {!isFormValid && items.length > 0 && (
                    <p className="text-[10px] text-center text-brand-orange mt-4 flex items-center justify-center gap-1 font-black uppercase tracking-widest opacity-60">
                      <AlertCircle className="w-3 h-3" />
                      Please fill in all mandatory fields
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Trust badges */}
      <footer className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-gray-100 flex flex-wrap justify-center gap-8 md:gap-16 opacity-30">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-widest font-black">
            Fast Delivery
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-widest font-black">
            Secure Packaging
          </span>
        </div>
        <div className="flex items-center gap-3">
          <CreditCard className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-widest font-black">
            Safe Payments
          </span>
        </div>
      </footer>
    </div>
  );
}
