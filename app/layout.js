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
  title: {
    default: "MF Packages | Premium Flexible Packaging Solutions",
    template: "%s | MF Packages",
  },
  description: "Shop certified eco-friendly pouches, kraft paper bags, retort & coffee packaging. Custom branding, global shipping, fast dispatch. Order from MF Packages today.",
  keywords: [
    "flexible packaging",
    "kraft paper pouches",
    "custom food packaging",
    "standup pouches",
    "eco-friendly packaging",
    "aluminium foil pouches",
    "retort pouches",
    "coffee packaging bags",
    "flat bottom pouches",
    "spout pouches",
    "PVC shrink capsules",
    "aseptic packaging",
  ],
  authors: [{ name: "MF Packages" }],
  creator: "MF Packages",
  metadataBase: new URL("https://mfpackages.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mfpackages.com",
    siteName: "MF Packages",
    title: "MF Packages | Premium Flexible Packaging Solutions",
    description: "Certified eco-friendly pouches & custom food packaging. Kraft paper, aluminium foil, retort, coffee & more. Global shipping with fast dispatch.",
    images: [
      {
        url: "/home_banner.webp",
        width: 1200,
        height: 630,
        alt: "MF Packages — Premium Flexible Packaging Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MF Packages | Premium Flexible Packaging Solutions",
    description: "Certified eco-friendly pouches & custom food packaging. Kraft paper, aluminium foil, retort, coffee & more. Global shipping with fast dispatch.",
    images: ["/home_banner.webp"],
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
