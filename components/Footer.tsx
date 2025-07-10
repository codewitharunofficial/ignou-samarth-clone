import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-row  justify-between items-center w-full p-2 bg-white border-t border-gray-200 fixed bottom-0 left-0">
      <p className="flex items-center text-sm gap-2 hover:underline hover:underline-offset-4">
        <strong>© Samarth eGov Suite-</strong> Designed & Developed by
        University of Delhi | An Initiative by Ministry of Education
      </p>
      <img src="./samarth-logo.svg" alt="samarth logo" />
    </footer>
  );
};

export default Footer;
