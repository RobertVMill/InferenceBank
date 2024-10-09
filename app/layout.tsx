import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar"; // Import the Navbar component
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

// Update metadata
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
        {/* Sidebar Navbar */}
        <Navbar />

        {/* Main content area with margin-left to avoid overlap */}
        <div className="ml-64 mt-4"> {/* Adjusted margin-left to account for the sidebar width */}
          <main className="pt-16 container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
