import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Leaf, Recycle, Globe } from "lucide-react";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";

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

export default async function BlogPage({ params }) {
  const { id } = await params;
  let blog = null;

  try {
    const blogDoc = await getDoc(doc(db, "blogs", id));
    if (blogDoc.exists()) {
      blog = { id: blogDoc.id, ...blogDoc.data() };
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
  }

  if (!blog) {
    notFound();
  }

  const Icon = getCategoryIcon(blog.category);
  const colorClass = getCategoryColor(blog.category);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pb-20">
      {/* Header Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src={blog.image || "/carousel/brown-kraft-flat-bottom.png"}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Navigation Back */}
        <div className="absolute top-28 left-8 z-10">
          <Link
            href="/blogs"
            className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Blogs</span>
          </Link>
        </div>

        {/* Blog Header Info */}
        <div className="absolute bottom-12 left-0 w-full px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div
              className={`inline-flex items-center space-x-2 bg-linear-to-r ${colorClass} text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl`}
            >
              <Icon className="w-4 h-4" />
              <span>{blog.category}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center space-x-6 text-white/80 font-medium">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-green-400" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Excerpt */}
          <p className="text-2xl text-[#1D2D44]/80 font-semibold italic border-l-4 border-green-500 pl-6 mb-12">
            {blog.excerpt}
          </p>

          {/* Main Content */}
          <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-line space-y-6">
            {blog.content || "Content coming soon..."}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1D2D44]">
                MF Packages Editorial
              </p>
              <p className="text-xs text-gray-500">
                Eco-Friendly Solutions Team
              </p>
            </div>
          </div>
          <Link
            href="/blogs"
            className="text-green-600 font-bold hover:text-green-700 transition-colors flex items-center space-x-1"
          >
            <span>Explore more insights</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
