import React from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

interface SideBarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

const SideBar = ({ showSidebar, setShowSidebar }: SideBarProps) => {
  return (
    <div
      className={`${
        showSidebar ? "sm:block" : "sm:hidden"
      } hidden w-64 h-screen bg-white text-black p-4 shadow-md`}
    >
      <IoArrowBackCircleOutline
        onClick={() => setShowSidebar(!showSidebar)}
        className="float-right cursor-pointer"
        size={20}
        color="#7e81f8"
      />
      <ul className="list-disc pl-5 h-auto border-b-1 border-gray-200 mt-2 sm:mt-4">
        <li className="mb-2 sm:mb-6 mx-2 hover:text-[#7e81f8] text-sm text-gray-600">
          <a href="#">Finance</a>
        </li>
        <li className="mb-2 sm:mb-6 mx-2 hover:text-[#7e81f8] text-sm text-gray-600">
          <a href="#">Governance</a>
        </li>
      </ul>
      <ul className="list-disc pl-5">
        <li className="mt-2 sm:mt-4 mx-2 hover:text-[#7e81f8] text-sm text-gray-500">
          <a href="#">Account Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
