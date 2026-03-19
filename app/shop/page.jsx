"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  ArrowLeft,
  LayoutGrid,
  ShoppingBag,
  Loader2,
  ChevronRight,
  Filter,
} from "lucide-react";
import ProductCard from "@/component/shop/ProductCard";

const categories = [
  {
    name: "Kraft paper standup pouch",
    image: "/categories/kraft_paper_pouches.png",
  },
  { name: "Aluminum pouches", image: "/categories/alimunum_pouch.png" },
  { name: "Flat bottom pouches", image: "/categories/flat_bottom_pouch.png" },
  { name: "Plastic pouches", image: "/categories/plastic_pouch.png" },
  { name: "Retort pouches", image: "/categories/retort_pouch.png" },
  { name: "Chocolate sheets", image: "/categories/chocolate_paper.png" },
  { name: "Coffee pouches", image: "/categories/coffee_pouch.png" },
  { name: "PVC shrink capsules", image: "/categories/seal_capsule.png" },
  { name: "Spout pouches", image: "/categories/spout_pouch.png" },
];

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : [];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Conditional Header based on View */}
        {!activeCategory ? (
          <div className="text-center mb-16 space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-white px-5 py-2 rounded-full border border-slate-100 shadow-sm mb-4">
              <ShoppingBag className="w-5 h-5 text-[#D00000]" />
              <span className="text-[#1D2D44] font-bold text-sm tracking-tight">
                Official Shop
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#1D2D44] tracking-tight leading-tight">
              Premium <span className="text-[#D00000]">Packaging</span>{" "}
              <br className="hidden md:block" /> Collections
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-medium">
              Select a category to explore our professional-grade eco-friendly
              solutions.
            </p>
          </div>
        ) : (
          <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in">
            <div className="space-y-2">
              <button
                onClick={() => setActiveCategory(null)}
                className="group flex items-center gap-2 text-slate-400 hover:text-[#D00000] font-bold text-xs uppercase tracking-widest transition-all mb-4"
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back to Categories
              </button>
              <h2 className="text-3xl md:text-5xl font-black text-[#1D2D44] tracking-tight">
                {activeCategory}
              </h2>
              <div className="flex items-center gap-2 text-slate-400 font-medium">
                <LayoutGrid size={16} />
                <span>{filteredProducts.length} Products Found</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-2 text-[#1D2D44] font-bold text-sm cursor-default ring-1 ring-[#D00000]/5">
                <Filter size={16} className="text-[#D00000]" />
                Viewing {activeCategory}
              </div>
            </div>
          </div>
        )}

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-12 h-12 text-[#D00000] animate-spin" />
            <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">
              Fetching Inventory...
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div className="max-w-md mx-auto bg-red-50 text-red-600 p-8 rounded-[2.5rem] border border-red-100 text-center mb-12 shadow-sm animate-fade-in">
            <h3 className="text-xl font-bold mb-2">Connection Issue</h3>
            <p className="font-medium opacity-80">{error}</p>
          </div>
        )}

        {/* CATEGORY GALLERY VIEW */}
        {!loading && !activeCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => setActiveCategory(cat.name)}
                className="group relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-white"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#1D2D44]/90 via-[#1D2D44]/20 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>

                {/* Content */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="space-y-3">
                    <div className="w-10 h-1 bg-[#D00000] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                    <h3 className="text-2xl font-black text-white leading-tight tracking-tight">
                      {cat.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                      View Collection{" "}
                      <ChevronRight size={14} className="text-[#D00000]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FILTERED PRODUCTS VIEW */}
        {!loading && activeCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 animate-fade-in">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {/* Empty State for Category */}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-32 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-inner text-center">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={48} className="text-slate-200" />
                </div>
                <h3 className="text-2xl font-bold text-slate-400 italic tracking-tight mb-2">
                  Coming Soon to {activeCategory}
                </h3>
                <p className="text-slate-400 max-w-sm mx-auto">
                  Our specialized team is currently preparing this collection
                  for release.
                </p>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="mt-8 px-8 py-3 bg-[#1D2D44] text-white rounded-2xl font-bold text-sm hover:bg-[#D00000] transition-all"
                >
                  Browse Other Categories
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
