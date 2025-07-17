"use client";

import React, { useEffect, useState } from "react";
import { fetchCampuses, fetchTypes } from "../ApiCalls/apicalls";

interface Option {
  _id: string;
  name: string;
}

const FlatForm = () => {
  const [campuses, setCampuses] = useState<Option[]>([]);
  const [types, setTypes] = useState<Option[]>([]);
  const [blocks, setBlocks] = useState<Option[]>([]);
  const [flats, setFlats] = useState<Option[]>([]);

  const [formData, setFormData] = useState({
    campus: "",
    type: "",
    block: "",
    flat: "",
    name: "",
    odlId: "",
    designation: "",
    division: "",
    occupationDate: "",
    category: "",
    change: "",
    remarks: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Fetch campuses on load
  useEffect(() => {
    fetchCampuses()
      .then((data) => {
        setCampuses(data.campuses);
        console.log("Fetched campuses:", data);
      })
      .catch((error) => {
        console.error("Error fetching campuses:", error);
      });
  }, []);

  // Fetch types after campus is selected
  useEffect(() => {
    if (formData.campus) {
      fetchTypes(formData.campus)
        .then((data) => {
          setTypes(data.types);
          console.log("Fetched types:", data);
        })
        .catch((error) => {
          console.error("Error fetching types:", error);
        });
    }
  }, [formData.campus]);

  // Fetch blocks after type is selected
  useEffect(() => {
    if (formData.campus && formData.type) {
      fetch(`/api/blocks?campus=${formData.campus}&type=${formData.type}`)
        .then((res) => res.json())
        .then((data) => setBlocks(data));
    }
  }, [formData.type]);

  // Fetch flats after block is selected
  useEffect(() => {
    if (formData.campus && formData.type && formData.block) {
      fetch(
        `/api/flats?campus=${formData.campus}&type=${formData.type}&block=${formData.block}`
      )
        .then((res) => res.json())
        .then((data) => setFlats(data));
    }
  }, [formData.block]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "campus") {
      setFormData((prev) => ({ ...prev, type: "", block: "", flat: "" }));
      setTypes([]);
      setBlocks([]);
      setFlats([]);
    }
    if (name === "type") {
      setFormData((prev) => ({ ...prev, block: "", flat: "" }));
      setBlocks([]);
      setFlats([]);
    }
    if (name === "block") {
      setFormData((prev) => ({ ...prev, flat: "" }));
      setFlats([]);
    }
  };

  const validate = () => {
    const requiredFields = [
      "campus",
      "type",
      "block",
      "flat",
      "name",
      "designation",
      "division",
      "occupationDate",
      "category",
      "change",
    ];
    const newErrors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = "This field is required";
      }
    });

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const flatNo = `${formData.block}-${formData.flat}`;

    const payload = {
      ...formData,
      flatNo,
    };

    fetch("/api/flats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        alert("Flat details submitted successfully!");
        // Optionally reset form here
      } else {
        alert("Submission failed.");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6"
    >
      {/* Section 1: Location Selection */}
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
              {campuses?.length > 0 &&
                campuses?.map((c) => (
                  <option key={c._id} value={c._id}>
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
              {types.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
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
            <select
              name="block"
              value={formData.block}
              onChange={handleChange}
              disabled={!blocks.length}
              className="w-full border rounded p-2"
            >
              <option value="">Select Block</option>
              {blocks.map((b) => (
                <option key={b._id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
            {errors.block && (
              <p className="text-red-500 text-sm">{errors.block}</p>
            )}
          </div>

          <div>
            <label>
              Flat <span className="text-red-500">*</span>
            </label>
            <select
              name="flat"
              value={formData.flat}
              onChange={handleChange}
              disabled={!flats.length}
              className="w-full border rounded p-2"
            >
              <option value="">Select Flat</option>
              {flats.map((f) => (
                <option key={f._id} value={f.name}>
                  {f.name}
                </option>
              ))}
            </select>
            {errors.flat && (
              <p className="text-red-500 text-sm">{errors.flat}</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Section 2: Personal Details */}
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

      {/* Section 3: Employee Details */}
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
              Date of Occupation <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="occupationDate"
              value={formData.occupationDate}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.occupationDate && (
              <p className="text-red-500 text-sm">{errors.occupationDate}</p>
            )}
          </div>

          <div>
            <label>
              Category <span className="text-red-500">*</span>
            </label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
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
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Flat Details
        </button>
      </div>
    </form>
  );
};

export default FlatForm;
