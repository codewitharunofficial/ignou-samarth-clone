"use client";
import Footer from "../../components/Footer";
import Login from "../../components/Login";

export default function Home() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 items-center justify-items-center min-h-screen p-8 pb-20 sm:p-15 font-[family-name:var(--font-geist-sans)] overflow-scroll">
      <div className="w-full"></div>
      <Login />
      <Footer />
    </div>
  );
}
