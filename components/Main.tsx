"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Card from "./Card";
import FlatForm from "./AddFlatForm";
import FlatList from "./FlatsList";
import UpdateFlat from "./UpdateFlat";
import { Button } from "@/components/ui/button";
import AddFlatCard from "./AddFlatCard";

const Main = () => {
  const pathname = usePathname();
  const router = useRouter();

  const pathParts = pathname.split("/").filter(Boolean); // removes empty strings
  const currentRoute = `/${pathParts[0] || ""}`;
  const flatId = pathParts[1]; // if route is /update-flats/[id]

  const download = (format: string) => {
    window.open(`/api/export-data?format=${format}`, "_blank");
  };

  const renderContent = () => {
    if (currentRoute === "/") {
      return (
        <>
          <div className="w-screen bg-white sm:shadow-sm p-4">
            <h1 className="text-xs font-bold">Dashboard</h1>
          </div>
          <div className="flex flex-row gap-5 lg:flex-wrap items-center p-4">
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
        <div className="w-screen bg-white p-4 sm:shadow pb-4">
          <h1 className="text-lg font-semibold mb-2">Flat Listings</h1>
          <Button
            className="sm:bg-green-200 sm:hover:bg-green-500 bg-green-500 text-white py-1 px-2 rounded-md mb-4 cursor-pointer transition duration-200 m-2"
            onClick={() => download("excel")}
          >
            Export Data As Excel
          </Button>
          <Button
            className="sm:bg-red-200 sm:hover:bg-red-500 bg-red-500 text-white py-1 px-2 rounded-md mb-4 cursor-pointer transition duration-200 m-2"
            onClick={() => download("pdf")}
          >
            Export Data As PDF
          </Button>
          <Button
            className="sm:bg-blue-200 sm:hover:bg-blue-500 bg-blue-500 text-white py-1 px-2 rounded-md mb-4 cursor-pointer transition duration-200 m-2"
            onClick={() => router.push("/add-flats")}
          >
            Add New Flat
          </Button>
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
