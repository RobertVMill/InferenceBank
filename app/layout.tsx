import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar"; // Sidebar/Navbar component
import "./globals.css";

// Load custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for SEO
export const metadata: Metadata = {
  title: "InferenceBank",
  description: "AI-driven financial insights platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* Navbar component alone, without extra sidebar */}
        <Navbar />

        {/* Main content area with padding to account for the sidebar */}
        <div className="ml-64 mt-4">
          <main className="pt-16 container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
