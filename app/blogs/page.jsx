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

const BlogsPage = () => {
  const blogs = [
    {
      id: 1,
      title: "The Rise of Kraft Pouches: A Sustainable Packaging Revolution",
      excerpt:
        "Discover how kraft pouches are transforming the packaging industry with their biodegradable properties and minimal environmental impact.",
      content:
        "Kraft pouches have emerged as a game-changer in sustainable packaging. Made from renewable resources, these pouches decompose naturally without leaving harmful residues. Their production requires less energy compared to traditional plastic packaging, making them an eco-friendly choice for businesses committed to environmental responsibility.",
      image: "/carousel/brown-kraft-flat-bottom.png",
      date: "January 15, 2025",
      readTime: "5 min read",
      category: "Sustainability",
      icon: Leaf,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 2,
      title: "How Biodegradable Packaging Reduces Carbon Footprint",
      excerpt:
        "Learn about the environmental benefits of switching to biodegradable packaging and its positive impact on our planet.",
      content:
        "Biodegradable packaging significantly reduces carbon emissions throughout its lifecycle. Unlike conventional plastics that persist for centuries, biodegradable materials break down naturally, returning nutrients to the soil. This circular approach to packaging helps combat climate change while maintaining product quality and safety standards.",
      image: "/carousel/brown-kraft-almunium-lamination.png",
      date: "January 10, 2025",
      readTime: "4 min read",
      category: "Environment",
      icon: Recycle,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: 3,
      title: "Pakistan's Journey Towards Eco-Friendly Food Packaging",
      excerpt:
        "Explore how Pakistan is embracing sustainable packaging solutions and leading the way in environmental conservation.",
      content:
        "Pakistan is witnessing a remarkable shift towards eco-friendly packaging solutions. Local businesses are increasingly adopting kraft pouches and biodegradable materials, reducing plastic waste significantly. This movement not only protects the environment but also creates economic opportunities in the green packaging sector, positioning Pakistan as a leader in sustainable practices.",
      image: "/carousel/coffee-flat-bottom.png",
      date: "January 5, 2025",
      readTime: "6 min read",
      category: "Industry",
      icon: Globe,
      color: "from-[#D00000] to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b ">
      {/* Header Section */}
      <div className="relative bg-linear-to-r from-[#1D2D44] to-[#1D2D44]/95 py-20 md:py-32 overflow-hidden">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={blog.id}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 bg-linear-to-br from-gray-100 to-gray-50 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1D2D44]/60 to-transparent"></div>

                {/* Category Badge */}
                <div
                  className={`absolute top-4 left-4 flex items-center space-x-2 bg-linear-to-r ${blog.color} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}
                >
                  <blog.icon className="w-4 h-4" />
                  <span>{blog.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
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
                <h2 className="text-xl md:text-2xl font-bold text-[#1D2D44] group-hover:text-green-600 transition-colors line-clamp-2">
                  {blog.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 line-clamp-3">{blog.excerpt}</p>

                
              </div>
            </article>
          ))}
        </div>

        

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
