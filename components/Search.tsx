"use client";

import { useState, useRef, useEffect, SetStateAction } from "react";
import { Search } from "lucide-react";
import clsx from "clsx";
import axios from "axios";

type SearchProps = {
  setFlats: React.Dispatch<React.SetStateAction<never[]>>;
};

export default function SearchBar({ setFlats }: SearchProps) {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Collapse on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    if (query.trim()) {
      const { data } = await axios.get(
        `/api/search?q=${encodeURIComponent(query.trim())}`
      );
      if (data.success) {
        setFlats(data?.flats);
      } else {
        console.log(data);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        `flex items-center border border-blue-300 rounded-full px-2 transition-all duration-300 ${
          expanded ? "mt-6" : "mt-8"
        } py-2`,
        expanded
          ? "w-64 border-gray-300 bg-white shadow-sm"
          : "w-10 justify-center cursor-pointer"
      )}
      onClick={() => {
        setExpanded(true);
        setTimeout(() => inputRef.current?.focus(), 100); // ensure focus after expanding
      }}
    >
      <Search className="w-5 h-5 text-gray-500" />
      {expanded && (
        <>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="ml-2 flex-grow outline-none text-sm text-gray-800"
            placeholder="Search..."
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-full cursor-pointer border-blue-400"
          >
            Go
          </button>
        </>
      )}
    </div>
  );
}
