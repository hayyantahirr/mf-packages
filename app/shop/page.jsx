import React from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  ArrowLeft,
  LayoutGrid,
  ShoppingBag,
  Loader2,
  ChevronRight,
  Filter,
  Home,
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

const Breadcrumbs = ({ activeCategory }) => (
  <nav className="flex mb-6 animate-fade-in" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-2">
      <li className="inline-flex items-center">
        <Link
          href="/"
          className="inline-flex items-center text-[10px] uppercase tracking-widest font-black text-brand-text/40 hover:text-brand-orange transition-colors gap-2"
        >
          <Home size={12} />
          Home
        </Link>
      </li>
      <li>
        <div className="flex items-center">
          <ChevronRight size={12} className="text-brand-text/10 mx-1" />
          <Link
            href="/shop"
            className={`text-[10px] uppercase tracking-widest font-black transition-colors ${
              !activeCategory
                ? "text-brand-dark"
                : "text-brand-text/40 hover:text-brand-orange"
            }`}
          >
            Shop
          </Link>
        </div>
      </li>
      {activeCategory && (
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRight size={12} className="text-brand-text/10 mx-1" />
            <span className="text-[10px] uppercase tracking-widest font-black text-brand-orange truncate max-w-[150px] md:max-w-none">
              {activeCategory}
            </span>
          </div>
        </li>
      )}
    </ol>
  </nav>
);

export default async function ShopPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams.category || null;

  let products = [];
  let error = null;

  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    products = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // Serialize non-plain objects like Firestore Timestamps
      const serializedData = Object.entries(data).reduce(
        (acc, [key, value]) => {
          if (value && typeof value === "object" && "seconds" in value) {
            // It's likely a Firestore Timestamp
            acc[key] = new Date(value.seconds * 1000).toISOString();
          } else {
            acc[key] = value;
          }
          return acc;
        },
        {},
      );

      return {
        id: doc.id,
        ...serializedData,
      };
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    error = "Unable to connect to inventory. Please refresh the page.";
  }

  const groupedProducts = products.reduce((acc, product) => {
    const { name } = product;
    if (!acc[name]) {
      acc[name] = {
        ...product,
        variations: [],
        minPrice: product.price,
        maxPrice: product.price,
      };
    }
    acc[name].variations.push(product);
    acc[name].minPrice = Math.min(
      acc[name].minPrice,
      product.price || Infinity,
    );
    acc[name].maxPrice = Math.max(
      acc[name].maxPrice,
      product.price || -Infinity,
    );
    return acc;
  }, {});

  const collections = Object.values(groupedProducts);

  const filteredCollections = activeCategory
    ? collections.filter((c) => c.category === activeCategory)
    : [];


  return (
    <div className="min-h-screen bg-brand-bg pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <Breadcrumbs activeCategory={activeCategory} />

        </div>

        {/* Conditional Header based on View */}
        {!activeCategory ? (
          <div className="text-center mb-20 space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-brand-section px-5 py-2 rounded-2xl border border-brand-dark/10 shadow-xl group hover:border-brand-orange/50 transition-all duration-300 mx-auto">
              <ShoppingBag className="w-5 h-5 text-brand-orange group-hover:scale-110 transition-transform" />
              <span className="text-brand-dark font-bold tracking-tight">
                Official Shop
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black text-brand-text tracking-tight leading-tight">
                Premium <span className="text-brand-orange">Packaging</span>{" "}
                <br className="hidden md:block" /> Collections
              </h1>
              <p className="text-brand-text/80 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                Discover our professional-grade eco-friendly solutions. Select a
                category to explore specialized products.
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-16 animate-fade-in space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 text-brand-text/50 hover:text-brand-dark transition-all bg-brand-section hover:bg-brand-section/80 px-5 py-2.5 rounded-xl border border-brand-dark/10 shadow-lg w-fit"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span className="font-bold text-sm uppercase tracking-wider">
                  Back to Categories
                </span>
              </Link>

              <div className="flex items-center gap-3 bg-brand-section px-5 py-2.5 rounded-2xl border border-brand-dark/10">
                <LayoutGrid size={20} className="text-brand-orange" />
                <span className="text-brand-dark font-bold">
                  {filteredCollections.length} Product Collections
                </span>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 px-5 py-2 rounded-full mx-auto">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
                <span className="text-brand-orange text-sm font-black uppercase tracking-widest">
                  {activeCategory}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-brand-text tracking-tight">
                {activeCategory}
              </h2>
            </div>
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
        {!activeCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-brand-section"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark/90 via-brand-dark/20 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>

                {/* Content */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="space-y-3">
                    <div className="w-10 h-1 bg-brand-orange rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                    <h3 className="text-2xl font-black text-white leading-tight tracking-tight">
                      {cat.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                      View Collection{" "}
                      <ChevronRight size={14} className="text-brand-orange" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* FILTERED PRODUCTS VIEW */}
        {activeCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10 animate-fade-in">
            {filteredCollections.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {/* Empty State for Category */}
            {filteredCollections.length === 0 && (
              <div className="col-span-full py-32 bg-brand-section rounded-[3rem] border border-dashed border-brand-dark/10 shadow-inner text-center">
                <div className="w-24 h-24 bg-brand-dark/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={48} className="text-brand-dark/10" />
                </div>
                <h3 className="text-2xl font-bold text-brand-text/40 italic tracking-tight mb-2">
                  Coming Soon to {activeCategory}
                </h3>
                <p className="text-brand-text/30 max-w-sm mx-auto">
                  Our specialized team is currently preparing this collection
                  for release.
                </p>
                <Link
                  href="/shop"
                  className="mt-8 inline-block px-8 py-3 bg-brand-dark text-white rounded-2xl font-bold text-sm hover:bg-brand-orange transition-all"
                >
                  Browse Other Categories
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
