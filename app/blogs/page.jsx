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
    <div className="min-h-screen bg-brand-bg">
      {/* Header Section */}
      <div className="relative bg-white pt-32 pb-16 overflow-hidden border-b border-gray-100">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-brand-section px-5 py-2 rounded-full border border-gray-200 shadow-sm mb-8 transition-transform hover:scale-105">
            <Leaf className="w-5 h-5 text-brand-success" />
            <span className="text-brand-dark font-semibold">Our Blog</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-dark mb-6 tracking-tight">
            Sustainability{" "}
            <span className="text-brand-orange">
              Insights
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Explore our latest articles on eco-friendly packaging,
            sustainability practices, and environmental conservation.
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
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 italic text-gray-500 shadow-sm">
            No blogs found. Stay tuned for our upcoming insights!
          </div>
        ) : (
          <BlogGrid blogs={blogs} />
        )}

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "100%", label: "Biodegradable", color: "text-brand-success" },
            { number: "50%", label: "Less Carbon", color: "text-brand-orange" },
            { number: "0", label: "Plastic Waste", color: "text-brand-success" },
            { number: "24/7", label: "Support", color: "text-brand-orange" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-brand-success/30 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-brand-dark/70 font-semibold tracking-wide uppercase text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
