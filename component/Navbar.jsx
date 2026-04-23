"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Leaf, ChevronDown } from "lucide-react";
import CartTrigger from "@/component/cart/CartTrigger";
import CartDropdown from "@/component/cart/CartDropdown";
import { useSelector, useDispatch } from "react-redux";
import { fetchExchangeRates, setCurrency } from "@/config/redux/currencySlice";
import { currencies } from "@/config/utils/currencyUtils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { selectedCurrency } = useSelector((state) => state.currency);
  const { cartCurrency } = useSelector((state) => state.cart);
  const isCheckout = pathname === "/checkout";

  useEffect(() => {
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Blogs", href: "/blogs" },
    { name: "Reach Us Now !", href: "/contact" },
  ];

  return (
    <>
      <CartDropdown />
      {/* Animated Background Gradient */}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        {/* Main Navbar Container with Advanced Glassmorphism */}
        <div className="max-w-7xl mx-auto md:px-4 px-1">
          <div
            className={`relative rounded-2xl transition-all duration-500 border border-white/20 backdrop-blur-xl ${
              isScrolled
                ? "bg-[#fdf2f0]/30 shadow-2xl"
                : "bg-[#fdf2f0] shadow-xl"
            }`}
          >
            {/* Animated Border Glow */}
            {/* <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#D00000]/20 via-transparent to-[#D00000]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> */}

            <div className="relative flex items-center justify-between px-3 sm:px-6 py-4">
              {/* Logo Section with Eco Badge */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0  rounded-full   transition-all duration-500"></div>
                  <div
                    className={`relative w-10 h-10 sm:w-14 sm:h-14 rounded-full p-1.5 sm:p-2 backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-2 ${
                      isScrolled
                        ? "bg-[#fdf2f0]/20 shadow-2xl"
                        : "bg-[#fdf2f0] shadow-xl"
                    }`}
                  >
                    <Image
                      src="/logo.png"
                      alt="MF Packages Logo"
                      fill
                      className="object-contain p-1"
                      priority
                    />
                  </div>
                  {/* Eco Badge */}
                  <div className="absolute -bottom-1 -right-1 bg-linear-to-r from-green-400 to-green-500 rounded-full p-1 shadow-lg">
                    <Leaf className="w-3 h-3 text-[#f1ead6]" />
                  </div>
                </div>
                {/* <div className="flex flex-col">
                  <span className="text-base sm:text-2xl font-bold text-brand-dark tracking-tight leading-tight">
                    MF Packages
                  </span>
                  <p className="text-[10px] sm:text-xs text-brand-dark/70">
                    Eco-Friendly
                  </p>
                </div> */}
              </Link>

              {/* Desktop Navigation with Advanced Effects */}
              <div className="hidden md:flex items-center space-x-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative px-5 py-2.5 text-brand-dark font-medium transition-all duration-300 group"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {/* Hover Background */}
                    <span className="absolute inset-0 bg-white/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 backdrop-blur-sm"></span>

                    {/* Active State */}
                    {pathname === link.href && (
                      <span className="absolute inset-0 bg-brand-orange/10 rounded-xl border border-brand-orange/50"></span>
                    )}

                    {/* Text */}
                    <span className="relative z-10 group-hover:text-brand-orange transition-colors duration-300">
                      {link.name}
                    </span>

                    {/* Animated Underline */}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-transparent via-brand-orange to-transparent group-hover:w-4/5 transition-all duration-500 shadow-lg shadow-brand-orange/50"></span>

                    {/* Glow Effect */}
                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-brand-orange/20"></span>
                  </Link>
                ))}
              </div>

              {/* Cart & Currency Section */}
              <div className="flex items-center space-x-2 md:space-x-4">
                {/* Currency Switcher */}
                <div className="relative">
                  <button
                    disabled={isCheckout}
                    onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                    className={`flex items-center space-x-1 sm:space-x-2 px-2 py-1 sm:px-3 sm:py-2 rounded-xl border transition-all duration-300 backdrop-blur-md ${
                      isCheckout
                        ? "opacity-50 cursor-not-allowed border-white/10"
                        : "border-white/10 hover:bg-white/10"
                    } text-brand-dark`}
                  >
                    <span className="text-[10px] sm:text-sm font-bold">
                      {
                        currencies.find((c) => c.code === selectedCurrency)
                          ?.flag
                      }{" "}
                      {selectedCurrency}
                    </span>
                    {!isCheckout && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${isCurrencyOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>

                  {isCurrencyOpen && !isCheckout && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-fade-in">
                      {currencies.map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => {
                            dispatch(setCurrency(curr.code));
                            setIsCurrencyOpen(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-brand-dark hover:bg-brand-section transition-colors ${
                            selectedCurrency === curr.code
                              ? "bg-brand-section font-bold"
                              : ""
                          }`}
                        >
                          <span>{curr.flag}</span>
                          <span>{curr.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <CartTrigger />

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 sm:p-3 text-brand-dark hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle Menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu with Enhanced Design */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 mt-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block px-5 py-3 text-brand-dark font-medium rounded-xl transition-all duration-300 ${
                      pathname === link.href
                        ? "bg-brand-orange/10 border border-brand-orange/50"
                        : "hover:bg-brand-section border border-transparent"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
