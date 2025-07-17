"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Card from "./Card";
import FlatForm from "./AddFlatForm";
import FlatList from "./FlatsList";
import UpdateFlat from "./UpdateFlat";

const Main = () => {
  const pathname = usePathname();
  const router = useRouter();

  const pathParts = pathname.split("/").filter(Boolean); // removes empty strings
  const currentRoute = `/${pathParts[0] || ""}`;
  const flatId = pathParts[1]; // if route is /update-flats/[id]

  const renderContent = () => {
    if (currentRoute === "/") {
      return (
        <>
          <div className="w-screen bg-white shadow-sm p-4">
            <h1 className="text-xs font-bold">Dashboard</h1>
          </div>
          <div className="flex flex-wrap items-center p-4">
            <Card />
          </div>
        </>
      );
    }

    if (currentRoute === "/reports") {
      return (
        <div className="w-screen bg-white p-4 shadow">
          <h1 className="text-lg font-semibold mb-2">Reports</h1>
          <p className="text-sm text-gray-600">This is the reports page.</p>
        </div>
      );
    }

    if (currentRoute === "/flats") {
      return (
        <div className="w-screen bg-white p-4 shadow pb-4">
          <h1 className="text-lg font-semibold mb-2">Flat Listings</h1>
          <FlatList />
        </div>
      );
    }

    if (currentRoute === "/update-flat" && flatId) {
      return (
        <div className="w-screen bg-white sm:p-12 shadow">
          <h1 className="text-lg font-semibold mb-2">Update Flat</h1>
          <UpdateFlat />
        </div>
      );
    }

    if (currentRoute === "/add-flats") {
      return (
        <div className="w-screen bg-white p-4 shadow">
          <h1 className="text-lg font-semibold mb-2">Add New Flat</h1>
          <FlatForm />
        </div>
      );
    }

    return (
      <div className="bg-white p-4 shadow">
        <h1 className="text-lg font-semibold">Page Not Found</h1>
      </div>
    );
  };

  return <div className="w-full p-2">{renderContent()}</div>;
};

export default Main;
