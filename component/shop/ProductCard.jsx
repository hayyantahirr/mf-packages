import React from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(29,45,68,0.15)] transition-all duration-500 border border-slate-100 hover:border-red-100 flex flex-col h-full hover:-translate-y-3">
      {/* Thumbnail Container */}
      <div className="relative h-72 w-full overflow-hidden bg-slate-100">
        <Image
          src={product.mainImage || "/carousel/brown-kraft-flat-bottom.png"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Badges Overlay */}
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          <span className="bg-[#1D2D44]/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
            {product.category || "Uncategorized"}
          </span>
          {product.inStock ? (
            <span className="bg-emerald-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5 text-nowrap">
              <CheckCircle2 size={10} /> In Stock
            </span>
          ) : (
            <span className="bg-red-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5 text-nowrap">
              <XCircle size={10} /> Out of Stock
            </span>
          )}
        </div>

        {/* Floating Actions */}
        <div className="absolute top-5 right-5 flex flex-col gap-3 translate-x-16 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button className="p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl text-slate-600 hover:text-red-500 hover:scale-110 transition-all">
            <Heart size={18} />
          </button>
          <button className="p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl text-slate-600 hover:text-[#1D2D44] hover:scale-110 transition-all">
            <Share2 size={18} />
          </button>
        </div>

        {/* Gallery Preview Component */}
        {product.extraImages && product.extraImages.length > 0 && (
          <div className="absolute bottom-5 left-5 flex -space-x-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
            {product.extraImages.slice(0, 3).map((img, idx) => (
              <div
                key={idx}
                className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-xl ring-2 ring-[#1D2D44]/10"
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {product.extraImages.length > 3 && (
              <div className="w-10 h-10 rounded-full bg-[#1D2D44]/90 backdrop-blur-md border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-xl">
                +{product.extraImages.length - 3}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow bg-linear-to-b from-white to-slate-50/30">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-black text-[#1D2D44] tracking-tight mb-1 group-hover:text-[#D00000] transition-colors leading-tight">
              {product.name}
            </h2>
            {product.size && (
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Size: {product.size}
              </span>
            )}
          </div>
          <div className="flex items-center bg-amber-50 px-2 py-1 rounded-lg text-amber-600 font-bold text-xs ring-1 ring-amber-100">
            <Star size={12} fill="currentColor" className="mr-1" />
            <span>4.9</span>
          </div>
        </div>

        {/* Truncated Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow ">
          {product.description?.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description ||
              "Premium quality biodegradable packaging solution."}
        </p>

        {/* Footer / CTA */}
        <div className="mt-auto space-y-5">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-1">
                Price Per Unit
              </span>
              <span className="text-3xl font-black text-[#1D2D44] flex items-center">
                <span className="text-sm font-bold mr-1 opacity-60">Rs.</span>
                {product.price || "---"}
              </span>
            </div>
          </div>

          <button
            disabled={!product.inStock}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
              product.inStock
                ? "bg-[#1D2D44] text-white hover:bg-[#D00000] hover:shadow-red-200 hover:scale-[1.02]"
                : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
            }`}
          >
            <ShoppingCart size={18} />
            {product.inStock ? "Add to Cart" : "Restocking Soon"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
