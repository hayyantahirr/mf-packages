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
        return "from-brand-success to-emerald-600";
      case "Industry":
        return "from-brand-orange to-orange-600";
      case "Sustainability":
        return "from-brand-success to-teal-600";
      default:
        return "from-brand-orange to-red-600";
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
              className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-brand-success/20 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-64 bg-brand-section overflow-hidden">
                <Image
                  src={blog.image || "/carousel/brown-kraft-flat-bottom.png"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark/40 to-transparent"></div>

                {/* Category Badge */}
                <div
                  className={`absolute top-4 left-4 flex items-center space-x-2 bg-linear-to-r ${colorClass} text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{blog.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 flex flex-col grow">
                {/* Meta Info */}
                <div className="flex items-center space-x-4 text-xs font-medium text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-brand-orange" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-brand-orange" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-brand-dark group-hover:text-brand-orange transition-colors line-clamp-2 leading-tight">
                  {blog.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 line-clamp-3 text-sm grow leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  href={`/blogs/${blog.id}`}
                  className="mt-4 flex items-center space-x-2 text-brand-success font-bold hover:text-brand-success/80 transition-colors group/btn w-fit text-sm uppercase tracking-wider"
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
