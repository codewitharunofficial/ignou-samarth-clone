"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

const FlatList = () => {
  const [flats, setFlats] = useState([]);
  const [filters, setFilters] = useState({ campus: "", type: "", block: "" });
  const [campuses, setCampuses] = useState(["MGRC", "AGVC", "JNU"]);
  const [types, setTypes] = useState([
    "Type-I",
    "Type-II",
    "Type-III Non-Academic",
    "Type-III Academic",
    "Type-III JNU",
    "Type-IV MGRC",
    "Type-IV AGVC",
    "Type-V MGRC",
    "Type-V AGVC",
  ]);
  const [blocks, setBlocks] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
  ]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        ...filters,
      });
      const { data } = await axios.get(`/api/flats?${query.toString()}`);
      if (data.success) {
        setFlats(data.flats);
        setTotal(data.total);
      }
    } catch (err) {
      console.error("Error fetching flats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // Reset to first page on filter change
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [filters, page]);

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="sm:p-4 max-w-screen-xl sm:mx-auto pb-16">
      <h2 className="text-2xl font-bold mb-4">Flat Listings</h2>

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div>
          <Label className="my-2">Campus</Label>
          <Select
            value={filters.campus}
            onValueChange={(val) =>
              setFilters((prev) => ({ ...prev, campus: val }))
            }
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Select Campus" />
            </SelectTrigger>
            <SelectContent>
              {campuses.map((campus) => (
                <SelectItem key={campus} value={campus}>
                  {campus}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="my-2">Type</Label>
          <Select
            value={filters.type}
            onValueChange={(val) =>
              setFilters((prev) => ({ ...prev, type: val }))
            }
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="my-2">Block</Label>
          <Select
            value={filters.block}
            onValueChange={(val) =>
              setFilters((prev) => ({ ...prev, block: val }))
            }
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Select Block" />
            </SelectTrigger>
            <SelectContent>
              {blocks.map((block) => (
                <SelectItem key={block} value={block}>
                  {block}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          className="max-w-40 bg-blue-300 text-white py-1 px-2 rounded-md mt-6 cursor-pointer hover:bg-blue-600 transition duration-200"
          disabled={page === totalPages || loading}
          onClick={() => {
            setFilters({ campus: "", type: "", block: "" });
            setPage(1);
          }}
        >
          Reset Filters
        </Button>
      </div>

      {/* Flats */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          loading || flats.length === 0 ? "md:grid-cols-1" : "md:grid-cols-3"
        } gap-4`}
      >
        {flats.length ? (
          flats.map((flat: any) => (
            <Card key={flat._id} className="shadow-md">
              <CardContent className="p-4 relative">
                <button
                  onClick={() => router.push(`/update-flat/${flat._id}`)}
                  className="absolute top-4 right-3 text-white cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-full p-1 transition duration-200"
                >
                  <Pencil size={18} />
                </button>
                <h3 className="text-lg font-semibold">{flat.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {flat.designation}
                </p>
                <p className="mt-2">
                  <strong>Campus:</strong> {flat.campus}
                </p>
                <p>
                  <strong>Flat:</strong> {flat.flatNo}
                </p>
                <p>
                  <strong>Type:</strong> {flat.type}
                </p>
                <p>
                  <strong>Block:</strong> {flat.block || "NA"}
                </p>
                <p>
                  <strong>Vacant:</strong> {flat.vacant ? "Yes" : "No"}
                </p>
              </CardContent>
            </Card>
          ))
        ) : loading ? (
          <p className="text-center">Loading flats...</p>
        ) : (
          <p className="text-center">
            No flats found for the selected filters.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          className="bg-blue-500 text-white py-1 px-2 rounded-md mt-4 cursor-pointer hover:bg-blue-600 transition duration-200 mb-5"
          disabled={page === 1 || loading}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <Button
          className="bg-blue-500 text-white py-1 px-2 rounded-md mt-4 cursor-pointer hover:bg-blue-600 transition duration-200 mb-5"
          disabled={page === totalPages || loading}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FlatList;
