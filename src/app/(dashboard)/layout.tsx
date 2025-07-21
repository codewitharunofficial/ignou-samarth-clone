// app/(dashboard)/layout.tsx
"use client";

import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import SideBar from "../../../components/SideBar";
import SmallFooter from "../../../components/SmallFooter";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="block w-screen h-full">
      <Navbar />
      <main className="grid grid-cols-1 sm:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] overflow-hidden mt-12">
        {showSidebar ? (
          <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        ) : (
          <IoArrowForwardCircleOutline
            onClick={() => setShowSidebar(!showSidebar)}
            className="fixed left-10 top-22 cursor-pointer mt-5"
            size={24}
            color="#7e81f8"
          />
        )}
        <div className="min-h-screen sm:px-4 pt-4">{children}</div>
        <SmallFooter />
      </main>
    </div>
  );
}
