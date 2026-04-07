"use client";
import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Facebook,
  Instagram,
  MessageCircle,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      // Reset success status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text mb-6">
            Get In{" "}
            <span className="text-brand-cta">
              Touch
            </span>
          </h1>
          <p className="text-lg md:text-xl text-brand-text/70 max-w-2xl mx-auto">
            Have questions about our eco-friendly packaging? We're here to help
            24/7
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-brand-header/5">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-header mb-6">
              Get A Quote
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-brand-text/70 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-text/70 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-text/70 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="+92 300 1234567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-text/70 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-text/70 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-brand-header/10 rounded-xl focus:outline-none focus:border-brand-cta transition-colors resize-none"
                  placeholder="Tell us about your packaging needs..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 ${
                  status === "submitting"
                    ? "bg-brand-text/20 cursor-not-allowed"
                    : "bg-brand-cta text-white hover:shadow-xl hover:bg-brand-cta/90"
                }`}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="flex items-center space-x-2 text-brand-success bg-brand-success/10 p-4 rounded-xl border border-brand-success/20">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">
                    Message sent successfully! We'll get back to you soon.
                  </span>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center space-x-2 text-brand-cta bg-brand-cta/10 p-4 rounded-xl border border-brand-cta/20">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">{errorMsg}</span>
                </div>
              )}
            </form>
          </div>

          {/* Right Side - Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Phone */}
              <a
                href="tel:+92 332 2464729"
                className="flex items-center space-x-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-brand-header/5 group"
              >
                <div className="p-3 bg-brand-cta rounded-xl">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-brand-text/50 font-semibold">
                    Call Us
                  </div>
                  <div className="text-brand-header font-bold group-hover:text-brand-cta transition-colors">
                    +92 332 2464729
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@mfpackages.com"
                className="flex items-center space-x-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-brand-header/5 group"
              >
                <div className="p-3 bg-brand-cta rounded-xl">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-brand-text/50 font-semibold">
                    Email Us
                  </div>
                  <div className="text-brand-header font-bold group-hover:text-brand-cta transition-colors">
                    info@mfpackages.com
                  </div>
                </div>
              </a>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-brand-header/10">
              <h3 className="text-lg font-bold text-brand-header mb-4">
                Connect With Us
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <a
                  href="https://wa.me/+923322464729"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-2 p-4 bg-brand-success/10 hover:bg-brand-success/20 rounded-xl transition-all duration-300 hover:scale-105 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="bi bi-whatsapp text-brand-success"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                  </svg>
                  <span className="text-xs font-semibold text-brand-text/70">
                    WhatsApp
                  </span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-300 hover:scale-105 group"
                >
                  <Facebook className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-brand-text/70">
                    Facebook
                  </span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-2 p-4 bg-pink-50 hover:bg-pink-100 rounded-xl transition-all duration-300 hover:scale-105 group"
                >
                  <Instagram className="w-8 h-8 text-pink-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-brand-text/70">
                    Instagram
                  </span>
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-brand-header/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.2076489476844!2d67.02812631500238!3d24.85384598408234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sSaddar%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-brand-header rounded-3xl p-8 md:p-12 text-center shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Available 24/7 for Your Convenience
          </h3>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Our team is always ready to assist you with eco-friendly packaging
            solutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
