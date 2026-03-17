"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  ArrowRight,
  Leaf,
  Recycle,
  Globe,
  X,
} from "lucide-react";

const BlogGrid = ({ blogs }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Environment":
        return Recycle;
      case "Industry":
        return Globe;
      default:
        return Leaf;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Environment":
        return "from-blue-500 to-cyan-600";
      case "Industry":
        return "from-[#D00000] to-red-600";
      case "Sustainability":
        return "from-green-500 to-emerald-600";
      default:
        return "from-green-500 to-emerald-600";
    }
  };

  const closeModal = () => setSelectedBlog(null);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => {
          const Icon = getCategoryIcon(blog.category);
          const colorClass = getCategoryColor(blog.category);
          return (
            <article
              key={blog.id}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-64 bg-linear-to-br from-gray-100 to-gray-50 overflow-hidden">
                <Image
                  src={blog.image || "/carousel/brown-kraft-flat-bottom.png"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1D2D44]/60 to-transparent"></div>

                {/* Category Badge */}
                <div
                  className={`absolute top-4 left-4 flex items-center space-x-2 bg-linear-to-r ${colorClass} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{blog.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 flex flex-col flex-grow">
                {/* Meta Info */}
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-[#1D2D44] group-hover:text-green-600 transition-colors line-clamp-2">
                  {blog.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 line-clamp-3 text-sm flex-grow">
                  {blog.excerpt}
                </p>

                {/* Read More Button */}
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="mt-4 flex items-center space-x-2 text-green-600 font-bold hover:text-green-700 transition-colors group/btn w-fit"
                >
                  <span>Read Full Post</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal */}
      {selectedBlog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-y-auto scrollbar-hide animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-800 hover:bg-white hover:scale-110 transition-all shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col">
              {/* Header Image */}
              <div className="relative h-64 md:h-96 w-full">
                <Image
                  src={
                    selectedBlog.image ||
                    "/carousel/brown-kraft-flat-bottom.png"
                  }
                  alt={selectedBlog.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Category in Modal */}
                <div
                  className={`absolute bottom-6 left-8 flex items-center space-x-2 bg-linear-to-r ${getCategoryColor(selectedBlog.category)} text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl`}
                >
                  {React.createElement(getCategoryIcon(selectedBlog.category), {
                    className: "w-4 h-4",
                  })}
                  <span>{selectedBlog.category}</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-8 md:p-12 space-y-6">
                <div className="flex items-center space-x-6 text-sm text-gray-500 font-medium">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span>{selectedBlog.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>{selectedBlog.readTime}</span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-[#1D2D44] leading-tight">
                  {selectedBlog.title}
                </h1>

                <div className="w-20 h-1.5 bg-linear-to-r from-green-500 to-emerald-600 rounded-full"></div>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  <p className="text-xl text-[#1D2D44]/80 font-semibold italic">
                    {selectedBlog.excerpt}
                  </p>
                  <div className="text-lg leading-relaxed whitespace-pre-line pt-4">
                    {selectedBlog.content || "Content coming soon..."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default BlogGrid;
