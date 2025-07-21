"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { GoPerson } from "react-icons/go";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState<{ userId: string; role: string } | null>(
    null
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user_info");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_info");
    router.push("/auth");
  };

  return (
    <nav className="fixed top-0 w-full bg-[rgb(5,44,101)] z-50 px-4 py-2 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo & Dashboard */}
        <div className="flex items-center gap-2">
          <img
            onClick={() => router.push("/")}
            className="h-5 cursor-pointer"
            src="./samarth-logo-nav.svg"
            alt="Samarth Logo"
          />
          <Link
            href="/dashboard"
            className="text-gray-200 hover:text-white text-sm"
          >
            / Dashboard
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="sm:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="text-white text-2xl"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex items-center gap-4">
          <li className="text-gray-200 hover:text-white text-sm cursor-default">
            Page Font Size: A - A A+
          </li>
          <li className="text-gray-200 hover:text-white text-sm">
            {user?.userId || "admin"} - Executive (DP)
          </li>
          <li className="text-gray-200 font-semibold text-sm">IGNOU</li>
          <li
            ref={dropdownRef}
            className="relative text-gray-200 hover:text-white cursor-pointer text-sm"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <div className="flex flex-col items-center">
              {user?.userId || "admin"} <GoPerson className="self-center" />
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 p-4 text-sm text-black">
                <p>
                  <strong>User ID:</strong> {user?.userId}
                </p>
                <p>
                  <strong>Role:</strong> {user?.role}
                </p>
                <button
                  onClick={handleLogout}
                  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded transition duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="flex flex-col sm:hidden gap-3 mt-2 text-sm text-gray-200">
          <li className="text-gray-200">Page Font Size: A - A A+</li>
          <li>{user?.userId || "admin"} - Executive (DP)</li>
          <li className="font-semibold">IGNOU</li>
          <li
            ref={dropdownRef}
            className="relative cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <div className="flex items-center gap-1">
              {user?.userId || "admin"} <GoPerson />
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 p-4 text-sm text-black">
                <p>
                  <strong>User ID:</strong> {user?.userId}
                </p>
                <p>
                  <strong>Role:</strong> {user?.role}
                </p>
                <button
                  onClick={handleLogout}
                  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded transition duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
