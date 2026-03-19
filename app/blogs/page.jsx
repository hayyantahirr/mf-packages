import React from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  ArrowRight,
  Leaf,
  Recycle,
  Globe,
} from "lucide-react";
import { db } from "@/config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import BlogGrid from "./BlogGrid";

const BlogsPage = async () => {
  let blogs = [];
  let error = null;

  try {
    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);

    blogs = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // Sanitize data for Client Component: convert Timestamps to serializable values
      const sanitizedData = { ...data };

      if (data.createdAt && typeof data.createdAt.toMillis === "function") {
        sanitizedData.createdAt = data.createdAt.toMillis();
      }
      if (data.updatedAt && typeof data.updatedAt.toMillis === "function") {
        sanitizedData.updatedAt = data.updatedAt.toMillis();
      }

      return {
        id: doc.id,
        ...sanitizedData,
      };
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      blogs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const sanitizedData = { ...data };

        if (data.createdAt && typeof data.createdAt.toMillis === "function") {
          sanitizedData.createdAt = data.createdAt.toMillis();
        }
        if (data.updatedAt && typeof data.updatedAt.toMillis === "function") {
          sanitizedData.updatedAt = data.updatedAt.toMillis();
        }

        return {
          id: doc.id,
          ...sanitizedData,
        };
      });
    } catch (innerErr) {
      error = "Failed to load blogs. Please try again later.";
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b ">
      {/* Header Section */}
      <div className="relative bg-linear-to-r from-[#1D2D44] to-[#1D2D44]/95 py-20 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20 shadow-lg mb-8">
            <Leaf className="w-5 h-5 text-green-400" />
            <span className="text-white font-semibold">Our Blog</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Sustainability{" "}
            <span className="bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Explore our latest articles on eco-friendly packaging,
            sustainability practices, and environmental conservation
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {error ? (
          <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100 italic text-red-600">
            {error}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 italic text-gray-500">
            No blogs found. Stay tuned for our upcoming insights!
          </div>
        ) : (
          <BlogGrid blogs={blogs} />
        )}

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "100%", label: "Biodegradable" },
            { number: "50%", label: "Less Carbon" },
            { number: "0", label: "Plastic Waste" },
            { number: "24/7", label: "Support" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-green-200 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#d20000] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
