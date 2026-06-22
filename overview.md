# MF Packages - Codebase Overview

Welcome! This document provides a high-level technical overview of the **MF Packages** codebase. It outlines the project's architecture, core logic engines, state management, and page structures to demonstrate a clear and structured understanding of the system.

---

## 🛠️ Technology Stack
* **Framework**: Next.js 16.1.1 (App Router, Server & Client Components)
* **Library**: React 19.2.3
* **State Management**: Redux Toolkit (`@reduxjs/toolkit` v2) & React Redux (`react-redux` v9)
* **State Persistence**: Redux Persist (`redux-persist` v6)
* **Styling**: Tailwind CSS v4 & Custom CSS transitions/animations (`globals.css`)
* **Database**: Firebase Firestore (`firebase` v12)
* **Icons & Animation**: Lucide React (`lucide-react` v0.562) & Framer Motion (`framer-motion` v12)
* **Slider/Carousel**: Swiper.js (`swiper` v12)

---

## 📁 Codebase Directory Structure

```
mf-packages/
├── app/                      # Next.js App Router Pages & Styling
│   ├── about/                # About Us page
│   ├── blogs/                # Blog overview & [id] dynamic blog posts
│   ├── checkout/             # Order checkout page
│   ├── contact/              # Interactive contact & quotation form
│   ├── shop/                 # Category view, [productName] variations, & [productId] product details
│   ├── globals.css           # Tailwind v4 configuration, theme variables & animations
│   └── layout.js             # Root Layout (ReduxProvider, Navbar, Footer wrapping)
├── component/                # Reusable React UI Components
│   ├── cart/                 # CartDropdown, CartTrigger & cartSlice redux logic
│   ├── home/                 # landing page Sections (Hero, Carousels, Sec1-5)
│   ├── shop/                 # ProductCard, ImageGallery, PricingSection, TechSpecs
│   ├── FAQs.jsx              # Collapsible FAQ Accordion
│   ├── Footer.jsx            # Global site Footer
│   └── Navbar.jsx            # Dynamic glassmorphic Navbar with currency selector
├── config/                   # Configuration & Utilities
│   ├── redux/                # Redux store configuration & currencySlice
│   ├── utils/                # Currency converters & pricing calculators
│   └── firebase.js           # Firebase app initialization & Firestore setup
└── public/                   # Static assets (images, logos, certifications, flags)
```

---

## ⚙️ Core System Integrations & Logic

### 1. State Management & Local Storage Persistence
* The application manages state using **Redux Toolkit**. 
* The store combines two main slices: `cart` and `currency`.
* Persistence is handled via `redux-persist` with local storage (`key: "mf-packages-cart"`), ensuring the user's cart and selected currency remain intact across browser refreshes.

### 2. Live Currency Converter Engine
* **Base Currency**: The system stores all product prices in **PKR (Pakistani Rupee)** as the ground truth.
* **API Integration**: Upon site load, the `Navbar` dispatches `fetchExchangeRates`, calling the ExchangeRate-API using a public API key:
  $$\text{PKR} \rightarrow \text{USD, CNY, GBP, EUR}$$
* **Conversion & Formatting**: Prices are dynamically calculated on-the-fly (`convertPrice`) and formatted with local symbols (`formatPrice`) across all views.
* **Cart Currency Lock**: To prevent multi-currency checkout errors, the cart employs a *Single Currency Rule*. Adding the first item locks the cart to that currency (`cartCurrency`). The user cannot check out unless they switch back to the locked currency or empty the cart.

### 3. Tiered & Bulk Pricing Calculation
* Product pricing uses a customized volume-based tiered formula located in `config/utils/pricing.js`:
  * **Option A**: Manual overrides defined in Firestore per product (`tieredPrices` mapping for 50, 100, 500, or 1000 pieces).
  * **Option B (Fallback)**: Hardcoded legacy increments/reductions relative to quantity:
    * **50 pcs**: Price + Rs. 2.00 surcharge per piece.
    * **100 pcs**: Base Price.
    * **500 pcs**: Price - Rs. 2.00 discount per piece.
    * **1000 pcs**: Price - Rs. 3.00 discount per piece.

### 4. Firebase Firestore Operations
Firestore serves as the database for the application, handling four collections:
* **`products`**: Contains document specifications for items, including `price`, `size`, `category`, `inStock`, `materialStructure`, and `technicalSpecs`.
* **`blogs`**: Contains dynamic blog posts displaying titles, categories, dates, excerpts, and markdown-friendly content.
* **`contacts`**: Stores customer submissions from the "Get A Quote" form (Name, Email, Phone, Subject, Message).
* **`orders`**: Records completed checkout invoices, storing customer details, serialized item entries, conversion rates, and total amounts in both PKR and the selected currency.

---

## 🎨 Styling, Aesthetics, and UI Vibes
* **Theme**: The website utilizes a clean, premium light-gray theme (`#E6E6E6` background) with dark violet (`#281E2A`) text, accented by vibrant emerald green (`#10B981`) and brand orange (`#E93E24`).
* **Visual Effects**:
  * **Navbar**: Features responsive glassmorphic blur and scroll-active height transition.
  * **Hero Page**: A split-screen design featuring a dynamic background grid and high-resolution visuals.
  * **Image Hover Zoom**: Product detail pages feature an interactive lens zoom on hover.
  * **Micro-animations**: Custom keyframes like `.animate-draw-line` and `.animate-fade-in` are integrated for premium user interaction.
