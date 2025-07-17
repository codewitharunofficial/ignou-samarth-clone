"use client";
import Footer from "../../../components/Footer";
import Login from "../../../components/Login";

export default function LoginPage() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 items-center sm:justify-items-start sm:ml-40 justify-items-center min-h-screen p-8 pb-20 sm:p-20 m-1 font-[family-name:var(--font-geist-sans)] overflow-scroll">
      <div className="min-w-full"></div>
      <Login />
      <Footer />
    </div>
  );
}
