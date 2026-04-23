import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import ReduxProvider from "@/config/redux/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "MF - Packages",
  description: "MF Packages provides premium, eco-friendly packaging solutions. From kraft paper pouches to custom foil-lined bags, we help brands scale with quality and style.",
  authors: [{ name: "MF Packages" }],
  creator: "MF Packages",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mfpackages.com", // Add your domain
    title: "MF Packages",
    description: "Premium Eco-Friendly Packaging Solutions for Global Brands",
    images: [
      {
        url: "/home_banner.png", // Add your OG image URL
        width: 1200,
        height: 630,
        alt: "MF Packages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MF Packages",
    description: "Premium Eco-Friendly Packaging Solutions for Global Brands",
    images: ["/home_banner.png"], // Add your OG image URL
  },
  appleWebApp: {
    title: "MF Packages",
    statusBarStyle: "default",
    touchIcon: "/icon192.png",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon1.png", sizes: "32x32", type: "image/png" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-brand-bg text-brand-text`}
      >
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer/>
        </ReduxProvider>
      </body>
    </html>
  );
}
