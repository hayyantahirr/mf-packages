import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  Leaf,
  Recycle,
  Globe,
} from "lucide-react";

const BlogGrid = ({ blogs }) => {
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
              <div className="p-6 space-y-4 flex flex-col grow">
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
                <p className="text-gray-600 line-clamp-3 text-sm grow">
                  {blog.excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  href={`/blogs/${blog.id}`}
                  className="mt-4 flex items-center space-x-2 text-green-600 font-bold hover:text-green-700 transition-colors group/btn w-fit"
                >
                  <span>Read Full Post</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default BlogGrid;
