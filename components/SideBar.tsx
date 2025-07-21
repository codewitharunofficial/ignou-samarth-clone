"use client";

import React from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FiX } from "react-icons/fi";

interface SideBarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

const SideBar = ({ showSidebar, setShowSidebar }: SideBarProps) => {
  return (
    <>
      {/* Overlay for mobile */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-40 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white text-black shadow-md transform transition-transform duration-300
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block
        `}
      >
        {/* Close Icon (mobile only) */}
        <div className="flex justify-end p-4 lg:hidden">
          <FiX
            size={24}
            className="cursor-pointer text-[#7e81f8]"
            onClick={() => setShowSidebar(false)}
          />
        </div>

        {/* Collapse Icon (desktop only) */}
        <div className="hidden lg:flex justify-end p-2">
          <IoArrowBackCircleOutline
            onClick={() => setShowSidebar(!showSidebar)}
            className="cursor-pointer"
            size={20}
            color="#7e81f8"
          />
        </div>

        {/* Menu */}
        <div className="p-4">
          <ul className="list-disc pl-5 border-b border-gray-200">
            <li className="mb-4 hover:text-[#7e81f8] text-sm text-gray-600">
              <a href="#">Finance</a>
            </li>
            <li className="mb-4 hover:text-[#7e81f8] text-sm text-gray-600">
              <a href="#">Governance</a>
            </li>
          </ul>
          <ul className="list-disc pl-5 mt-4">
            <li className="hover:text-[#7e81f8] text-sm text-gray-500">
              <a href="#">Account Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
