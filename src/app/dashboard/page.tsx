"use client";
import React from "react";
import Navbar from "../../../components/Navbar";
import SideBar from "../../../components/SideBar";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Main from "../../../components/Main";
import SmallFooter from "../../../components/SmallFooter";

const page = () => {
  const [showSidebar, setShowSidebar] = React.useState(true);
  return (
    <div className="block w-screen h-full">
      <Navbar />
      <main className="grid grid-cols-1 sm:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] overflow-hidden mt-12">
        {showSidebar ? (
          <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        ) : (
          <IoArrowForwardCircleOutline
            onClick={() => setShowSidebar(!showSidebar)}
            className="fixed left-10 top-22 cursor-pointer mt-4"
            size={24}
            color="#7e81f8"
          />
        )}
       <Main />
       <SmallFooter />
      </main>
    </div>
  );
};

export default page;
