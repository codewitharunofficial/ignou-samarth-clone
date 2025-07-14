"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { GoPerson } from "react-icons/go";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full bg-[rgb(5,44,101)] flex flex-row flex-wrap items-center justify-between px-4 py-1">
      <div className="flex flex-row gap-1 items-center ">
        <img
          onClick={() => router.push("/")}
          className="object-scale-down h-[20px] hover:cursor-pointer"
          src="./samarth-logo-nav.svg"
          alt="samarth logo"
          color="inherit"
        />
        <Link
          className="text-gray-200 hover:text-white text-sm"
          href={"/dashboard"}
        >
          {" "}
          / Dashboard
        </Link>
      </div>
      <ul className={`hidden sm:flex flex-row gap-4 items-center`}>
        <li className="text-gray-200 hover:text-white cursor-pointer text-sm">
          Page Font Size : A - A A +
        </li>
        <li className="text-gray-200 hover:text-white cursor-pointer text-sm">
          admin_ga_aedp_2 - Executive (DP) (Administration Division)
        </li>
        <li className="text-gray-200 font-semibold hover:text-white cursor-pointer text-sm">
          IGNOU
        </li>
        <li className="flex flex-col gap-2 text-gray-200 hover:text-white cursor-pointer text-sm">
          admin_ga_aedp_2 <GoPerson className="self-center" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
