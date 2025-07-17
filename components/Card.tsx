"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Card = () => {
  const router = useRouter();
  return (
    <div className="card w-64 h-44 bg-base-100 shadow-sm rounded-md mt-1 border border-gray-200 py-2 weight-600">
      <div className="p-3 border-b-1 border-gray-500 ">
        <h3 className="text-black text-lg text-start font-semibold space-x-2">
          Estate Management
        </h3>
      </div>
      <p className="text-gray-600 text-sm p-3">
        Capture/Track Estate Using Estate...
      </p>
      <button
        onClick={() => {
          router.push("/flats");
        }}
        className="bg-gray-200 text-gray-400 text-xs py-1 px-2 rounded-md mx-4 cursor-pointer hover:text-gray-600 mt-5 font-semibold transition duration-200"
      >
        PROCEED
      </button>
    </div>
  );
};

export default Card;
