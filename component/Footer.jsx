/**
 * Footer Component
 *
 * Comprehensive footer for MF Packages website featuring:
 * - Company information and logo
 * - Navigation links
 * - Contact information
 * - Social media links
 * - Newsletter subscription
 * - Copyright and legal links
 *
 * Fully responsive design matching the website theme
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Leaf,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#1D2D44] text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D00000]/5 rounded-full blur-3xl"></div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Company Info */}
          <div className="space-y-6">
            {/* Logo and tagline */}
            <div>
              <Link
                href="/"
                className="inline-flex items-center space-x-3 group"
              >
                <div className="relative w-12 h-12 bg-white/10 rounded-full p-2 backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:scale-110">
                  <Image
                    src="/logo.png"
                    alt="MF Packages Logo"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <span className="text-xl font-bold text-white block">
                    MF Packages
                  </span>
                  <span className="text-xs text-white/70">
                    Eco-Friendly Solutions
                  </span>
                </div>
              </Link>
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm leading-relaxed">
              Redefining the future of food packaging in Pakistan with 100%
              biodegradable and sustainable solutions.
            </p>

            {/* Eco badge */}
            <div className="inline-flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
              <Leaf className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-semibold">
                100% Eco-Friendly
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Our Products", href: "/shop" },
                { name: "Certifications", href: "/#certifications" },
                { name: "Our Team", href: "/#team" },
                { name: "Contact", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-green-400 transition-colors duration-300 text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-0 h-0.5 bg-green-400 group-hover:w-4 transition-all duration-300"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Pakistan
                  <br />
                  Eco-Friendly Packaging Solutions
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="w-5 h-5 text-green-400 shrink-0" />
                <a
                  href="tel:+92 332 2464729"
                  className="text-white/70 hover:text-green-400 transition-colors"
                >
                  +92 332 2464729
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="w-5 h-5 text-green-400 shrink-0" />
                <a
                  href="mailto:info@mfpackages.com"
                  className="text-white/70 hover:text-green-400 transition-colors"
                >
                  info@mfpackages.com
                </a>
              </li>
            </ul>

            {/* Business hours */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-sm font-semibold text-white mb-2">
                Business Hours
              </div>
              <div className="text-xs text-white/70">
                Available 24/7 for your convenience
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Stay Updated</h3>
            <p className="text-white/70 text-sm mb-4">
              Subscribe to our newsletter for the latest updates on eco-friendly
              packaging solutions.
            </p>

            {/* Newsletter form */}
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-full bg-linear-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm"
              >
                Subscribe
              </button>
            </form>

            {/* Social media links */}
            <div className="mt-6">
              <div className="text-sm font-semibold text-white mb-3">
                Follow Us
              </div>
              <div className="flex space-x-3">
                {[
                  {
                    icon: Facebook,
                    href: "https://www.facebook.com/MFPackages",
                    label: "Facebook",
                  },
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/mfpackages/",
                    label: "Instagram",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2.5 bg-white/10 hover:bg-green-500 rounded-lg transition-all duration-300 hover:scale-110 border border-white/10 hover:border-green-400"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Bottom Footer */}
        <div className="py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} MF Packages. All rights reserved.
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <div className=" text-white/40 ">
                Powered by{" "}
                <a
                  href="https://hayyantahirr.vercel.app/"
                  className="underline text-[#d00000]"
                >
                  hayyantahirr
                </a>
              </div>
            </div>
          </div>

          {/* Made with love */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
