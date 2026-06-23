"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Menu,
  X,
  Leaf,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import CartTrigger from "@/component/cart/CartTrigger";
import CartDropdown from "@/component/cart/CartDropdown";
import { useSelector, useDispatch } from "react-redux";
import { fetchExchangeRates, setCurrency } from "@/config/redux/currencySlice";
import { currencies } from "@/config/utils/currencyUtils";

const shopCategories = [
  {
    name: "Kraft Paper Pouches",
    query: "Kraft paper standup pouch",
    subcategories: [
      {
        name: "All Kraft Pouches",
        href: "/shop?category=Kraft%20paper%20standup%20pouch",
      },
      {
        name: "Standup Kraft Pouches",
        href: "/shop?category=Kraft%20paper%20standup%20pouch",
      },
      {
        name: "Kraft Pouches with Window",
        href: "/shop?category=Kraft%20paper%20standup%20pouch",
      },
      {
        name: "Laminated Kraft Pouches",
        href: "/shop?category=Kraft%20paper%20standup%20pouch",
      },
    ],
  },
  {
    name: "Aluminum Pouches",
    query: "Aluminum pouches",
    subcategories: [
      {
        name: "All Aluminum Pouches",
        href: "/shop?category=Aluminum%20pouches",
      },
      { name: "Pure Foil Pouches", href: "/shop?category=Aluminum%20pouches" },
      { name: "Metalized Pouches", href: "/shop?category=Aluminum%20pouches" },
    ],
  },
  {
    name: "Flat Bottom Pouches",
    query: "Flat bottom pouches",
    subcategories: [
      {
        name: "All Flat Bottom Pouches",
        href: "/shop?category=Flat%20bottom%20pouches",
      },
      {
        name: "Gusseted Pouches",
        href: "/shop?category=Flat%20bottom%20pouches",
      },
      { name: "Box Pouches", href: "/shop?category=Flat%20bottom%20pouches" },
    ],
  },
  {
    name: "Plastic Pouches",
    query: "Plastic pouches",
    subcategories: [
      { name: "All Plastic Pouches", href: "/shop?category=Plastic%20pouches" },
      { name: "Transparent Standup", href: "/shop?category=Plastic%20pouches" },
      {
        name: "Frosted Standup Pouches",
        href: "/shop?category=Plastic%20pouches",
      },
    ],
  },
  {
    name: "Retort Pouches",
    query: "Retort pouches",
    subcategories: [
      { name: "All Retort Pouches", href: "/shop?category=Retort%20pouches" },
      { name: "High-Barrier Retort", href: "/shop?category=Retort%20pouches" },
      { name: "Microwaveable Retort", href: "/shop?category=Retort%20pouches" },
    ],
  },
  {
    name: "Coffee Pouches",
    query: "Coffee pouches",
    subcategories: [
      { name: "All Coffee Pouches", href: "/shop?category=Coffee%20pouches" },
      {
        name: "Degassing Valve Pouches",
        href: "/shop?category=Coffee%20pouches",
      },
      { name: "Tin-Tie Coffee Bags", href: "/shop?category=Coffee%20pouches" },
    ],
  },
  {
    name: "Specialty Packaging",
    subcategories: [
      { name: "Chocolate Sheets", href: "/shop?category=Chocolate%20sheets" },
      {
        name: "PVC Shrink Capsules",
        href: "/shop?category=PVC%20shrink%20capsules",
      },
      { name: "Spout Pouches", href: "/shop?category=Spout%20pouches" },
    ],
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [activeShopCategory, setActiveShopCategory] = useState(0);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);

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
    { name: "Printing", href: "/printing" },
    { name: "About", href: "/about" },
    { name: "Blogs", href: "/blogs" },
    { name: "Reach Us Now !", href: "/contact" },
  ];

  return (
    <>
      <CartDropdown />
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto md:px-4 px-1">
          <div
            className={`relative rounded-2xl transition-all duration-500 border border-white/20 backdrop-blur-xl ${
              isScrolled
                ? "bg-[#fdf2f0]/30 shadow-2xl"
                : "bg-[#fdf2f0] shadow-xl"
            }`}
          >
            <div className="relative flex items-center justify-between px-3 sm:px-6 py-4">
              {/* Logo Section with Eco Badge */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full transition-all duration-500"></div>
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
                  <div className="absolute -bottom-1 -right-1 bg-linear-to-r from-green-400 to-green-500 rounded-full p-1 shadow-lg">
                    <Leaf className="w-3 h-3 text-[#f1ead6]" />
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation with Advanced Effects */}
              <div className="hidden md:flex items-center space-x-2">
                {navLinks.map((link, index) => {
                  if (link.name === "Shop") {
                    return (
                      <div
                        key={link.name}
                        className="relative group"
                        onMouseEnter={() => setIsShopDropdownOpen(true)}
                        onMouseLeave={() => setIsShopDropdownOpen(false)}
                      >
                        <Link
                          href="/shop"
                          className="relative px-5 py-2.5 text-brand-dark font-medium transition-all duration-300 flex items-center gap-1"
                        >
                          <span className="absolute inset-0 bg-white/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 backdrop-blur-sm"></span>
                          {pathname.startsWith("/shop") && (
                            <span className="absolute inset-0 bg-brand-orange/10 rounded-xl border border-brand-orange/50"></span>
                          )}
                          <span className="relative z-10 group-hover:text-brand-orange transition-colors duration-300">
                            Shop
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 ${
                              isShopDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-transparent via-brand-orange to-transparent group-hover:w-4/5 transition-all duration-500 shadow-lg shadow-brand-orange/50"></span>
                        </Link>

                        {/* Mega Dropdown Panel */}
                        {isShopDropdownOpen && (
                          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-fade-in-fast">
                            <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4 min-w-[550px] grid grid-cols-12 gap-4">
                              {/* Left Column: Categories */}
                              <div className="col-span-5 border-r border-brand-bg/50 pr-2 space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-text/40 px-3 pb-2 block">
                                  Categories
                                </span>
                                {shopCategories.map((cat, idx) => (
                                  <Link
                                    key={cat.name}
                                    href={
                                      cat.query
                                        ? `/shop?category=${encodeURIComponent(
                                            cat.query,
                                          )}`
                                        : "/shop"
                                    }
                                    onMouseEnter={() =>
                                      setActiveShopCategory(idx)
                                    }
                                    onClick={() => {
                                      setIsShopDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-between cursor-pointer ${
                                      activeShopCategory === idx
                                        ? "bg-brand-orange/10 text-brand-orange"
                                        : "text-brand-dark hover:bg-brand-section"
                                    }`}
                                  >
                                    <span>{cat.name}</span>
                                    <ChevronDown className="-rotate-90 w-3 h-3 opacity-60" />
                                  </Link>
                                ))}
                              </div>

                              {/* Right Column: Subcategories */}
                              <div className="col-span-7 pl-2 space-y-1.5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-text/40 pb-2 block">
                                  {shopCategories[activeShopCategory].name}{" "}
                                  Products
                                </span>
                                <div className="grid grid-cols-1 gap-1">
                                  {shopCategories[
                                    activeShopCategory
                                  ].subcategories.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      href={sub.href}
                                      onClick={() => setIsShopDropdownOpen(false)}
                                      className="group/sub flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-brand-dark hover:bg-brand-section hover:text-brand-orange transition-all duration-200"
                                    >
                                      <span>{sub.name}</span>
                                      <ArrowRight className="w-3.5 h-3.5 text-brand-orange opacity-0 group-hover/sub:opacity-100 transition-opacity duration-200" />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="relative px-5 py-2.5 text-brand-dark font-medium transition-all duration-300 group"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <span className="absolute inset-0 bg-white/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 backdrop-blur-sm"></span>
                      {pathname === link.href && (
                        <span className="absolute inset-0 bg-brand-orange/10 rounded-xl border border-brand-orange/50"></span>
                      )}
                      <span className="relative z-10 group-hover:text-brand-orange transition-colors duration-300">
                        {link.name}
                      </span>
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-transparent via-brand-orange to-transparent group-hover:w-4/5 transition-all duration-500 shadow-lg shadow-brand-orange/50"></span>
                      <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-brand-orange/20"></span>
                    </Link>
                  );
                })}
              </div>

              {/* Cart & Currency Section */}
              <div className="flex items-center space-x-2 md:space-x-4">
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
                        className={`w-4 h-4 transition-transform ${
                          isCurrencyOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {isCurrencyOpen && !isCheckout && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-fade-in-fast">
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
              ? "max-h-[800px] opacity-100 mt-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link, index) => {
                  if (link.name === "Shop") {
                    return (
                      <div key={link.name} className="space-y-1">
                        <button
                          type="button"
                          onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                          className={`w-full flex items-center justify-between px-5 py-3 text-brand-dark font-medium rounded-xl transition-all duration-300 cursor-pointer ${
                            pathname.startsWith("/shop")
                              ? "bg-brand-orange/10 border border-brand-orange/50"
                              : "hover:bg-brand-section border border-transparent"
                          }`}
                        >
                          <span>Shop</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isMobileShopOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isMobileShopOpen && (
                          <div className="pl-4 pr-2 py-2 space-y-2 border-l-2 border-brand-orange/20 ml-5 animate-fade-in-fast">
                            {shopCategories.map((cat, catIdx) => (
                              <div key={cat.name} className="space-y-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveMobileCategory(
                                      activeMobileCategory === catIdx
                                        ? null
                                        : catIdx,
                                    )
                                  }
                                  className="w-full flex items-center justify-between py-2 text-sm font-bold text-brand-dark/80 hover:text-brand-orange transition-colors cursor-pointer"
                                >
                                  <span>{cat.name}</span>
                                  <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                      activeMobileCategory === catIdx
                                        ? "rotate-180"
                                        : ""
                                    }`}
                                  />
                                </button>

                                {activeMobileCategory === catIdx && (
                                  <div className="pl-3 py-1 space-y-1.5 border-l border-brand-bg ml-3 animate-fade-in-fast flex flex-col">
                                    {cat.subcategories.map((sub) => (
                                      <Link
                                        key={sub.name}
                                        href={sub.href}
                                        onClick={() => {
                                          setIsMobileMenuOpen(false);
                                          setIsMobileShopOpen(false);
                                          setActiveMobileCategory(null);
                                        }}
                                        className="text-xs font-semibold text-brand-dark/60 hover:text-brand-orange py-1 transition-colors"
                                      >
                                        {sub.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
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
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
