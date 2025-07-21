"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const UpdateFlat = () => {
  const { id } = useParams();
  const [flat, setFlat] = useState<any>(null);
  const [vacant, setVacant] = useState(false);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        const res = await axios.get(`/api/flat/${id}`);
        const data = res.data.flat;
        setFlat(data);
        setVacant(data.vacant || false);
        setDate(data.date || "");
      } catch (error) {
        console.error("Failed to fetch flat:", error);
      }
    };

    if (id) fetchFlat();
  }, [id]);

  const handleInputChange = (field: string, value: string) => {
    setFlat((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleVacantToggle = () => {
    const newVacant = !vacant;
    setVacant(newVacant);
    setFlat((prev: any) => ({
      ...prev,
      name: newVacant ? "" : prev.name || "",
      designation: newVacant ? "" : prev.designation || "",
      odlId: newVacant ? "" : prev.odlId || "",
    }));
    if (newVacant) setDate("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Create updatedData with all fields from flat state
    const updatedData = {
      name: vacant ? "" : flat.name || "",
      odlId: vacant ? "" : flat.odlId || "",
      designation: vacant ? "" : flat.designation || "",
      division: flat.division || "",
      flatNo: flat.flatNo || "",
      block: flat.block || "",
      date: vacant ? "" : date || "",
      category: flat.category || "",
      change: flat.change || "",
      remarks: flat.remarks || "",
      type: flat.type || "",
      campus: flat.campus || "",
      vacant,
    };

    try {
      await axios.put(`/api/update-flat/${id}`, updatedData);
      alert("Flat updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!flat)
    return <p className="text-center py-10">Fetching Flat Details...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-white p-6 rounded shadow-md space-y-6"
    >
      <h2 className="text-xl font-bold text-gray-800">Update Flat</h2>

      <div className="flex items-center justify-between">
        <Label className="m-2">Mark as Vacant</Label>
        <Switch
          className="cursor-pointer"
          checked={vacant}
          onCheckedChange={handleVacantToggle}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="m-2" htmlFor="name">
            Name of Allottee
          </Label>
          <Input
            id="name"
            value={flat.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled={vacant}
          />
        </div>

        <div>
          <Label className="m-2" htmlFor="odlId">
            ODL ID
          </Label>
          <Input
            id="odlId"
            value={flat.odlId}
            onChange={(e) => handleInputChange("odlId", e.target.value)}
            disabled={vacant}
          />
        </div>

        <div>
          <Label className="m-2" htmlFor="designation">
            Designation
          </Label>
          <Input
            id="designation"
            value={flat.designation}
            onChange={(e) => handleInputChange("designation", e.target.value)}
            disabled={vacant}
          />
        </div>

        <div>
          <Label className="m-2" htmlFor="category">
            Category
          </Label>
          <Input
            id="category"
            value={flat.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            disabled={vacant}
          />
        </div>

        <div>
          <Label className="m-2" htmlFor="change">
            Change (Yes or No)
          </Label>
          <select
            id="change"
            value={flat.change}
            onChange={(e) => handleInputChange("change", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <Label className="m-2" htmlFor="division">
            Division
          </Label>
          <Input
            id="division"
            value={flat.division}
            onChange={(e) => handleInputChange("division", e.target.value)}
            disabled={vacant}
          />
        </div>

        <div>
          <Label className="m-2" htmlFor="remarks">
            Remarks
          </Label>
          <Input
            id="remarks"
            value={flat.remarks}
            onChange={(e) => handleInputChange("remarks", e.target.value)}
            disabled={vacant}
          />
        </div>

        <div>
          <Label className="m-2" htmlFor="campus">
            Campus
          </Label>
          <Input id="campus" value={flat.campus} disabled />
        </div>

        <div>
          <Label className="m-2" htmlFor="flatNo">
            Flat No.
          </Label>
          <Input id="flatNo" value={flat.flatNo} disabled />
        </div>

        <div>
          <Label className="m-2" htmlFor="block">
            Block
          </Label>
          <Input id="block" value={flat.block || "NA"} disabled />
        </div>

        <div>
          <Label className="m-2" htmlFor="type">
            Type
          </Label>
          <Input id="type" value={flat.type} disabled />
        </div>

        <div>
          <Label className="m-2" htmlFor="date">
            {vacant ? "Date of Vacation" : "Date of Occupation"}
          </Label>
          <Input
            className="cursor-pointer"
            id="date"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            disabled={vacant}
            required={!vacant}
            placeholder="YYYY-MM-DD"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Flat"}
      </Button>
    </form>
  );
};

export default UpdateFlat;
