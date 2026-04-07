"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "Where are you based and where will the goods be shipped from?",
    answer:
      "We are based in Shanghai China. The products are shipped from our Shanghai factory to worldwide customers of the below countries by UPS, FedEx, DHL, Aramex, DPEX and other Express Shipping Services.",
  },
  {
    question:
      "Are we responsible for Any kind of Taxes and to Which address we do not Ship?",
    answer:
      "*We do NOT ship to P.O. boxes or APO/FPO addresses.\n*We’re NOT responsible for import Duty/Taxes if any will be charged by your Customs, but we’ll declare low value for shipping.",
  },
  {
    question: "When will you ship out the goods after I place the order?",
    answer:
      "Usually, we are working in two types of categories: First we have in-stock products which we Dispatch in 2~3 Working Days after receiving your order. And For Customized order its takes 15-20 days for Customization and then further Delivery time for Courier. For Express Delivery it takes 8-10 working days and for normal delivery usually it takes 20-25 working days.",
  },
  {
    question:
      "Can I order samples to check size and quality before ordering bulk?",
    answer:
      "Yes, you can contact us to request a custom sample that you are interested in. Usually, we can send free in-stock samples if you are willing to pay the international shipping cost. Contact us for sample requests.",
  },
  {
    question: "What’s the minimum order of customized paper packaging?",
    answer:
      "For custom Standup Pouches minimum order quantity is 1000 pcs per size, but for startups, we support lowering the minimum quantity to help your business grow.",
  },
  {
    question: "What’s the production time of customized paper packaging?",
    answer:
      "For custom paper packaging, a sample usually takes 5~7 days, it will be longer if the finish is complicated. Custom packaging mass order production usually takes 10~15 days.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-brand-section relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-brand-orange/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight">
            Frequently Asked{" "}
            <span className="text-brand-orange">
              Questions
            </span>
          </h2>
          <p className="text-brand-text/60 max-w-2xl mx-auto">
            Find answers to common questions about our shipping, timeline, and
            custom packaging orders.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border border-brand-dark/5 rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "bg-white border-brand-orange/30 shadow-[0_0_30px_rgba(233,62,36,0.1)]"
                    : "bg-white/50 hover:bg-white"
                }`}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span
                    className={`font-semibold text-lg transition-colors duration-300 ${isOpen ? "text-brand-orange" : "text-brand-dark"}`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`p-2 rounded-full transition-transform duration-300 ${isOpen ? "bg-brand-orange text-white rotate-180" : "bg-brand-dark/5 text-brand-dark/40"}`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-6"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden px-6">
                    <div className="text-brand-text/70 leading-relaxed space-y-2">
                      {faq.answer.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
