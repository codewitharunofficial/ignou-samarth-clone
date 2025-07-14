import React from "react";
import Card from "./Card";

const Main = () => {
  return (
    <div className="w-screen p-2">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-xs font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-wrap items-center p-4">
        <Card />
      </div>
    </div>
  );
};

export default Main;
