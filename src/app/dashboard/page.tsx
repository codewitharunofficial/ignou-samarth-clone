"use client";
import React from "react";
import Navbar from "../../../components/Navbar";
import SideBar from "../../../components/SideBar";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const page = () => {
  const [showSidebar, setShowSidebar] = React.useState(true);
  return (
    <div className="flex w-full h-screen">
      <main className="flex-1 flex-row gap-10">
        <Navbar />
        {showSidebar ? (
          <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        ) : (
          <IoArrowForwardCircleOutline
            onClick={() => setShowSidebar(!showSidebar)}
            className="fixed left-10 cursor-pointer mt-4 "
            size={24}
            color="#7e81f8"
          />
        )}
        <div className="flex-1 p-4 itemns-center justify-center float-right">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome to the dashboard! Here you can manage your settings and
            preferences.
          </p>
        </div>
      </main>
    </div>
  );
};

export default page;
