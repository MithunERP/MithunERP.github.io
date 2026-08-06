import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickConnect from "@/components/QuickConnect";
import ChatWidget from "@/components/ChatWidget";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import ThemeScript from "./theme-script";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MithunERP — Web Design, Software & Photography",
  description:
    "MithunERP crafts custom web design, bespoke software, and professional photography for businesses that want to stand out.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <Preloader />
        <Cursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <QuickConnect />
        <ChatWidget />
      </body>
    </html>
  );
}
