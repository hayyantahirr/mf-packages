# MF Packages

A modern, responsive e-commerce platform specializing in premium, food-safe, certified, and eco-friendly flexible packaging solutions. MF Packages offers a wide range of products including kraft standup pouches, flat bottom bags, spout pouches, retort bags, and more.

## ✨ Key Features

- **Live Currency Converter**: Global shopping experience with dynamic, real-time currency conversion (PKR to USD, CNY, GBP, EUR) powered by the ExchangeRate-API.
- **Dynamic Tiered Pricing**: Automated bulk discount logic (e.g., pricing thresholds for 50, 100, 500, or 1000 pieces).
- **Persistent Shopping Cart**: A robust cart system built on Redux Toolkit and `redux-persist` that maintains user selections across sessions and strictly handles multi-currency checkout locks.
- **Modern App Router Architecture**: Built with Next.js 16, leveraging server and client components for optimal performance and SEO.
- **Premium Aesthetics**: Features a glassmorphic design system, vibrant accents, smooth transitions, lens zoom on products, and custom micro-animations utilizing Framer Motion.
- **Cloud Database Integration**: Fully integrated with Firebase Firestore for managing products, dynamic blog posts, contact inquiries, and checkout orders.
- **CDN Image Delivery**: Integrated with Cloudinary for fast, optimized, and dynamic delivery of high-resolution packaging product photography.

## 🛠️ Technology Stack

- **Framework:** Next.js 16.1 (App Router)
- **Library:** React 19.2
- **State Management:** Redux Toolkit v2 & React Redux v9
- **State Persistence:** Redux Persist v6
- **Styling:** Tailwind CSS v4 & Custom CSS keyframes
- **Database Backend:** Firebase Firestore (v12)
- **Media & Assets:** Cloudinary, Swiper.js (v12)
- **Icons & Animation:** Lucide React, Framer Motion

## 📁 Project Structure

```text
mf-packages/
├── app/                      # Next.js App Router (Pages & Layouts)
│   ├── about/                # About Us page
│   ├── blogs/                # Blog overview & dynamic posts
│   ├── checkout/             # Shopping cart & checkout flow
│   ├── contact/              # Customer inquiry & quotation form
│   ├── shop/                 # Product catalog, variations, & details
│   ├── globals.css           # Global Tailwind config & animations
│   └── layout.js             # Root application layout & providers
├── component/                # Reusable React UI Components
│   ├── cart/                 # Cart logic and UI elements
│   ├── home/                 # Landing page sections
│   ├── shop/                 # Product cards, galleries, pricing tables
│   └── ...                   # Navbar, Footer, FAQs, etc.
├── config/                   # Integrations & Global Utilities
│   ├── redux/                # Redux store & slices
│   ├── utils/                # Pricing calculators & currency formatters
│   └── firebase.js           # Firebase app initialization
└── public/                   # Static assets, local fallbacks, and logos
```

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed.

### 1. Clone & Install
```bash
git clone <your-repository-url>
cd mf-packages
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory and configure the following required environment variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Currency API
NEXT_PUBLIC_CURRENCY_API_KEY=your_exchangerate_api_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License
This project is proprietary and confidential.
