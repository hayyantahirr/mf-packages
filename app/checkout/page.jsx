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
  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' or 'bank'
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
      <div className="min-h-screen bg-[#1D2D44] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#16253b] border border-white/10 rounded-2xl p-8 text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Order Confirmed!
          </h2>
          <p className="text-white mb-6">
            Your order{" "}
            <span className="text-green-500 font-mono">{orderIdRef}</span> has
            been placed successfully for <span className="font-bold">{formatPrice(grandTotal, selectedCurrency)}</span>.
          </p>
          <div className="space-y-4">
            <p className="text-white/60 text-sm">
              We've sent a confirmation email to {formData.email}
            </p>
            <button
              onClick={() => router.push("/shop")}
              className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-white/90 transition-all cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1D2D44] text-white selection:bg-red-500/30">
      {/* Spacer for Fixed Navbar */}
      <div className="h-28 md:h-36"></div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-16">
          {/* Left Side: Order Summary */}
          <div
            className="space-y-6 animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            {/* Mobile Toggle Handle */}
            <button
              onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
              className="lg:hidden w-full flex items-center justify-between p-6 bg-[#16253b] border border-white/10 rounded-2xl group transition-all"
            >
              <div className="flex items-center gap-3 mt-0 font-bold text-red-500 text-xl">
                <Package className="w-5 h-5" />
                <span className="text-white font-bold text-xl">
                  {isSummaryExpanded ? "Order Summary" : "Order Summary"}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <ChevronLeft
                  className={`w-5 h-5 text-white transition-transform duration-300 ${isSummaryExpanded ? "rotate-90" : "-rotate-90"}`}
                />
              </div>
            </button>

            <div
              className={`${isSummaryExpanded ? "block" : "hidden"} lg:block space-y-8 `}
            >
              <div>
                <h2 className="text-2xl font-bold mb-6 hidden lg:flex items-center gap-3">
                  <Package className="w-6 h-6 text-red-500" />
                  Order Summary
                </h2>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                  {items.map((item) => (
                    <div
                      key={item.cartEntryId}
                      className="flex gap-4 p-4 bg-[#16253b] border border-white/5 rounded-2xl group hover:border-white/10 transition-all"
                    >
                      <div className="w-24 h-24 bg-[#0a0a0a]/20 rounded-xl overflow-hidden shrink-0 relative border border-white/5">
                        {item.mainImage ? (
                          <Image
                            src={item.mainImage}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20">
                            <Package className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <div className="grow py-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-lg leading-tight mb-1">
                            {item.name}
                          </h3>
                          <p className="text-white text-sm">
                            Size:{" "}
                            <span className="text-white font-bold">
                              {item.size || "Custom"}
                            </span>
                          </p>
                          <p className="text-white text-sm">
                            Quantity:{" "}
                            <span className="text-white font-bold">
                              {item.quantity}
                            </span>
                          </p>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                          <span className="text-white text-xs">
                            {formatPrice(convertPrice(item.basePricePKR, selectedCurrency, exchangeRates), selectedCurrency)} / unit
                          </span>
                          <span className="font-bold text-white">
                            {formatPrice(convertPrice(item.totalPricePKR, selectedCurrency, exchangeRates), selectedCurrency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {items.length === 0 && (
                    <div className="py-12 text-center bg-[#16253b] rounded-2xl border border-dashed border-white/10">
                      <p className="text-white/40">Your cart is empty.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="bg-[#16253b] p-8 rounded-2xl border border-white/10 space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-red-500">Subtotal</span>
                  <span className="font-medium">
                    {formatPrice(subtotal, selectedCurrency)}
                  </span>
                </div>
                <div className="flex justify-between text-lg border-b border-white/5 pb-4">
                  <span className="text-red-500">Shipping</span>
                  <span className="text-white text-sm font-medium">
                    {formatPrice(shippingFee, selectedCurrency)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-bold text-red-500">
                    Grand Total
                  </span>
                  <span className="text-3xl font-black text-white">
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
            <div className="bg-[#16253b] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl ">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Truck className="w-6 h-6 text-red-500" />
                Shipping Details
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-black text-white ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-[#1D2D44] border border-white/10 rounded-xl px-4 py-4 focus:border-red-500 focus:outline-none transition-all placeholder:text-white/20 mt-4"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-black text-white ml-1 mt-4">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="03XX-XXXXXXX"
                      className="w-full bg-[#1D2D44] border border-white/10 rounded-xl px-4 py-4 focus:border-red-500 focus:outline-none transition-all placeholder:text-white/20 mt-4"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-white ml-1 mt-4">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full bg-[#1D2D44] border border-white/10 rounded-xl px-4 py-4 focus:border-red-500 focus:outline-none transition-all placeholder:text-white/20 mt-4"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-white ml-1 mt-4">
                    Detailed Shipping Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Street, Area, City, Nearest Landmark..."
                    className="w-full bg-[#1D2D44] border border-white/10 rounded-xl px-4 py-4 focus:border-red-500 focus:outline-none transition-all placeholder:text-white/20 resize-none mt-4"
                  ></textarea>
                </div>

                {/* Payment Method Selection */}
                <div className="pt-4 space-y-4">
                  <label className="text-xs uppercase tracking-widest font-black text-white ml-1 mt-4">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <label
                      className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${paymentMethod === "cod" ? "bg-red-500/10 border-red-500" : "bg-[#1D2D44] border-white/10 hover:border-white/30 "}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="w-5 h-5 accent-red-500 "
                      />
                      <div className="grow">
                        <p className="font-bold">Cash on Delivery (COD)</p>
                        <p className="text-white/40 text-xs">
                          Pay when your package arrives
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${paymentMethod === "bank" ? "bg-red-500/10 border-red-500" : "bg-[#1D2D44] border-white/10 hover:border-white/30"}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}
                        className="w-5 h-5 accent-red-500"
                      />
                      <div className="grow flex justify-between items-center">
                        <div>
                          <p className="font-bold">Online Bank Transfer</p>
                          <p className="text-white/40 text-xs">
                            Direct deposit to our account
                          </p>
                        </div>
                        <CreditCard className="w-5 h-5 text-white/40" />
                      </div>
                    </label>
                  </div>

                  {/* Revealed Bank Details */}
                  {paymentMethod === "bank" && (
                    <div className="mt-4 p-6 bg-[#0a0a0a]/20 border border-white/10 rounded-2xl animate-fade-in animate-duration-300">
                      <h4 className="text-sm font-bold text-red-500 mb-3 uppercase tracking-wider">
                        Bank Account Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/40">Bank Name</span>
                          <span>Meezan Bank</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Account Title</span>
                          <span>MF PACKAGES</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Account Number</span>
                          <span className="font-mono">1234 5678 9012 3456</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">IBAN</span>
                          <span className="font-mono">
                            PK60 MEZN 0012 3456 7890 1234
                          </span>
                        </div>
                      </div>
                      <p className="mt-4 text-[10px] text-white/40 leading-relaxed">
                        Please share the screenshot of your payment on our
                        WhatsApp along with your Order ID for faster
                        verification.
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  <button
                    disabled={
                      !isFormValid || isSubmitting || items.length === 0
                    }
                    onClick={handleConfirmOrder}
                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-red-500/10 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3
                      ${
                        !isFormValid || isSubmitting || items.length === 0
                          ? "bg-white/5 text-white/20 border border-white/10 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600 hover:shadow-red-500/20 active:bg-red-700"
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
                    <p className="text-xs text-center text-red-500/60 mt-4 flex items-center justify-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      Please fill in all mandatory fields to continue
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Trust badges */}
      <footer className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 opacity-40">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5" />
          <span className="text-xs uppercase tracking-widest font-bold">
            Fast Delivery
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5" />
          <span className="text-xs uppercase tracking-widest font-bold">
            Secure Packaging
          </span>
        </div>
        <div className="flex items-center gap-3">
          <CreditCard className="w-5 h-5" />
          <span className="text-xs uppercase tracking-widest font-bold">
            Safe Payments
          </span>
        </div>
      </footer>
    </div>
  );
}
