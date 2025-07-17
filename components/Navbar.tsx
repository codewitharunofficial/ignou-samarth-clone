"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { GoPerson } from "react-icons/go";

const Navbar = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
        !dropdownRef.current.contains(event.target as Node)
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
    <nav className="fixed top-0 w-full bg-[rgb(5,44,101)] flex justify-between items-center px-4 py-1 z-50">
      <div className="flex flex-row gap-1 items-center">
        <img
          onClick={() => router.push("/")}
          className="object-scale-down h-[20px] hover:cursor-pointer"
          src="./samarth-logo-nav.svg"
          alt="samarth logo"
        />
        <Link
          className="text-gray-200 hover:text-white text-sm"
          href={"/dashboard"}
        >
          / Dashboard
        </Link>
      </div>

      <ul className="hidden sm:flex flex-row gap-4 items-center">
        <li className="text-gray-200 hover:text-white cursor-pointer text-sm">
          Page Font Size : A - A A +
        </li>
        <li className="text-gray-200 hover:text-white text-sm">
          {user?.userId || "admin"} - Executive (DP)
        </li>
        <li className="text-gray-200 font-semibold text-sm">IGNOU</li>
        <li
          ref={dropdownRef ? null : undefined}
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
                className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded cursor-pointer transition duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
