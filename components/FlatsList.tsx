"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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
import SearchBar from "./Search";
import { User } from "@/types";
import { getUserRole } from "@/utils/auth";

interface ListProps {
  user?: User;
}

const FlatList = ({ user }: ListProps) => {
  const [flats, setFlats] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [filters, setFilters] = useState({ campus: "", type: "", block: "" });
  const [campuses] = useState(["MGRC", "AGVC", "JNU"]);
  const [types] = useState([
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
  const [blocks] = useState([
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
    setPage(1);
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [filters, page]);

  const totalPages = Math.ceil(total / 10);

  useEffect(() => {
    const role = getUserRole();
    setRole(role);
  }, []);

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
            disabled={filters.campus === "AGVC" || filters.campus === "JNU"}
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
        <div>
          <SearchBar setFlats={setFlats} />
        </div>
        <Button
          className="max-w-40 bg-blue-300 text-white py-1 px-2 rounded-md mt-6 cursor-pointer hover:bg-blue-600 transition duration-200"
          disabled={loading}
          onClick={() => {
            setFilters({ campus: "", type: "", block: "" });
            setPage(1);
          }}
        >
          Reset Filters
        </Button>
      </div>

      {/* Flats Table */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Progress className="w-full" value={30} />
        </div>
      ) : flats.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-purple-300 text-left">
              <tr>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Designation</th>
                <th className="px-4 py-2 border-b">Campus</th>
                <th className="px-4 py-2 border-b">Flat No</th>
                <th className="px-4 py-2 border-b">Type</th>
                <th className="px-4 py-2 border-b">Block</th>
                <th className="px-4 py-2 border-b">Vacant</th>
                {role === "admin" && <th className="px-4 py-2 border-b">Action</th>}
              </tr>
            </thead>
            <tbody>
              {flats.map((flat) => (
                <tr key={flat._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{flat.name}</td>
                  <td className="px-4 py-2 border-b">{flat.designation}</td>
                  <td className="px-4 py-2 border-b">{flat.campus}</td>
                  <td className="px-4 py-2 border-b">{flat.flatNo}</td>
                  <td className="px-4 py-2 border-b">{flat.type}</td>
                  <td className="px-4 py-2 border-b">{flat.block || "NA"}</td>
                  <td className="px-4 py-2 border-b">
                    {flat.vacant ? "Yes" : "No"}
                  </td>
                  {role === "admin" && (
                    <td className="px-4 py-2 border-b">
                      <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => router.push(`/update-flat/${flat._id}`)}
                      >
                        <Pencil size={16} className="mr-1" /> Edit
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No flats found for the selected filters.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          className="bg-blue-500 text-white py-1 px-2 rounded-md cursor-pointer hover:bg-blue-600 transition duration-200"
          disabled={page === 1 || loading}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <Button
          className="bg-blue-500 text-white py-1 px-2 rounded-md cursor-pointer hover:bg-blue-600 transition duration-200"
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
