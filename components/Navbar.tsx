"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { GoPerson } from "react-icons/go";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="w-full bg-blue-900 flex flex-row items-center justify-between p-2 px-4">
      <div className="flex flex-row gap-1 items-center">
        <img
          onClick={() => router.push("/")}
          className="object-scale-down h-12 hover:cursor-pointer"
          src="./samarth-logo.svg"
          alt="samarth logo"
          color="inherit"
        />
        <Link className="text-gray-200 hover:text-white" href={"/dashboard"}>
          / Dashboard
        </Link>
      </div>
      <ul className={`hidden sm:flex flex-row gap-4 items-center`}>
        <li className="text-gray-200 hover:text-white cursor-pointer  w-[150px] text-wrap text-center">
          Page Font Size A -
        </li>
        <li className="text-gray-200 hover:text-white cursor-pointer w-[180px] text-wrap text-center">
          Executive (DP) (Administration Division)
        </li>
        <li className="text-gray-200 font-semibold hover:text-white cursor-pointer text-wrap text-center">
          IGNOU
        </li>
        <li className="flex flex-col gap-2 text-gray-200 hover:text-white cursor-pointer text-wrap w-[150px] text-center">
          admin_ga_aedp_2 <GoPerson className="self-center" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
