import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/common/sidebar";
import Navbar from "@/components/common/navbar";
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

export const metadata: Metadata = {
  title: "Test-Hub",
  description: "automated assessment app",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-100 min-h-screen flex flex-col md:flex-row lg:flex-row`}
      >
        <div className="flex">
          <div className="hidden md:block" >
            <Sidebar/>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="hidden md:block">
            <Navbar />
            </div>
            <div className="md:hidden">
            {/* sidebar showing when mobile view */}
            <Sidebar/> 
            </div>
            <div className="p-3">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
