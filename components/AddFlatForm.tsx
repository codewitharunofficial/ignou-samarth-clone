"use client";

import React, { useEffect, useState } from "react";
import { fetchCampuses, fetchTypes } from "../ApiCalls/apicalls";

interface CampusOption {
  _id: string;
  name: string;
  types?: string[]; // Assuming each campus can have an array of string types
}

interface FlatFormData {
  campus: string;
  type: string;
  block: string;
  flatNo: string;
  name: string;
  odlId: string;
  designation: string;
  division: string;
  date: string;
  category: string;
  change: string;
  remarks: string;
}

const FlatForm: React.FC = () => {
  const [campuses, setCampuses] = useState<CampusOption[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FlatFormData>({
    campus: "",
    type: "",
    block: "",
    flatNo: "",
    name: "",
    odlId: "",
    designation: "",
    division: "",
    date: "",
    category: "",
    change: "",
    remarks: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCampuses()
      .then((data) => {
        setCampuses(data.campuses);
      })
      .catch((error) => console.error("Error fetching campuses:", error));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let updatedFormData = { ...formData, [name]: value };

    if (name === "campus") {
      updatedFormData.type = "";
      const selectedCampus = campuses.find((c) => c.name === value);
      setTypes(selectedCampus?.types || []);
    }

    setFormData(updatedFormData);
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const requiredFields: (keyof FlatFormData)[] = [
      "campus",
      "type",
      "block",
      "flatNo",
      "name",
      "designation",
      "division",
      "date",
      "category",
      "change",
    ];
    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Flat details submitted successfully!");
        setFormData({
          campus: "",
          type: "",
          block: "",
          flatNo: "",
          name: "",
          odlId: "",
          designation: "",
          division: "",
          date: "",
          category: "",
          change: "",
          remarks: "",
        });
        setTypes([]);
      } else {
        alert("Submission failed.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6"
    >
      {/* Campus, Type, Block, FlatNo */}
      <fieldset>
        <legend className="text-lg font-semibold mb-4">
          🏢 Location Selection
        </legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label>
              Campus <span className="text-red-500">*</span>
            </label>
            <select
              name="campus"
              value={formData.campus}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">Select Campus</option>
              {campuses.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.campus && (
              <p className="text-red-500 text-sm">{errors.campus}</p>
            )}
          </div>

          <div>
            <label>
              Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={!types.length}
              className="w-full border rounded p-2"
            >
              <option value="">Select Type</option>
              {types.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type}</p>
            )}
          </div>

          <div>
            <label>
              Block <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="block"
              value={formData.block}
              onChange={handleChange}
              placeholder="e.g. A"
              className="w-full border rounded p-2"
            />
            {errors.block && (
              <p className="text-red-500 text-sm">{errors.block}</p>
            )}
          </div>

          <div>
            <label>
              Flat No. <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="flatNo"
              value={formData.flatNo}
              onChange={handleChange}
              placeholder="e.g. 101 or A1"
              className="w-full border rounded p-2"
            />
            {errors.flatNo && (
              <p className="text-red-500 text-sm">{errors.flatNo}</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Personal Details */}
      <fieldset>
        <legend className="text-lg font-semibold mb-4">
          👤 Personal Details
        </legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label>ODL ID</label>
            <input
              name="odlId"
              value={formData.odlId}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
      </fieldset>

      {/* Employee Details */}
      <fieldset>
        <legend className="text-lg font-semibold mb-4">
          💼 Employee Details
        </legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label>
              Designation <span className="text-red-500">*</span>
            </label>
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.designation && (
              <p className="text-red-500 text-sm">{errors.designation}</p>
            )}
          </div>

          <div>
            <label>
              Division <span className="text-red-500">*</span>
            </label>
            <input
              name="division"
              value={formData.division}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.division && (
              <p className="text-red-500 text-sm">{errors.division}</p>
            )}
          </div>

          <div>
            <label>
              Date of Occupation / Vacation{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          <div>
            <label>Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label>
              Change <span className="text-red-500">*</span>
            </label>
            <select
              name="change"
              value={formData.change}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.change && (
              <p className="text-red-500 text-sm">{errors.change}</p>
            )}
          </div>

          <div>
            <label>Remarks</label>
            <input
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
      </fieldset>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed " 
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default FlatForm;
