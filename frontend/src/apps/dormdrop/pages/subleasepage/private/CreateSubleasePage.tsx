import { SchoolsArray, type Schools } from "@/apps/dormdrop/types/enums/Schools";
import type { SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import { SubleaseAmenityArray } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import api from "@/lib/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateSubleasePage = () => {
  const navigate = useNavigate();
  const getFormValue = (key: keyof typeof form) => form[key];

  const [form, setForm] = useState({
    leaseName: "",
    leaseAddress: "",
    leasePrice: "",
    leaseDescription: "",
    leaseStartDate: "",
    leaseEndDate: "",
    leaseImage: "",
    numRoom: "",
    numBath: "",
    roomWidth: "",
    roomDepth: "",
    leaseSchool: [] as Schools[],
    latitude: "",
    longitude: "",
    amenities: [] as SubleaseAmenity[],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenity: SubleaseAmenity) => {
    setForm((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const leasePriceNumber = Number(form.leasePrice);
    if (isNaN(leasePriceNumber) || leasePriceNumber < 300) {
      alert("Lease price must be at least $300.");
      return;
    }

    const payload = {
      ...form,
      leasePrice: leasePriceNumber,
      roomWidth: Number(form.roomWidth),
      roomDepth: Number(form.roomDepth),
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    };

    try {
      await api.post("/api/v1/owner/accounts/me/subleases", payload);
      navigate("/account/me");
    } catch (error) {
      console.error("Error creating sublease", error);
    }
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-8"
    >
      <h2 className="text-3xl font-semibold text-center">Create Sublease</h2>

      {/* Lease Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label className="label">Lease Name</label>
          <input
            name="leaseName"
            value={form.leaseName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col">
          <label className="label">Address</label>
          <input
            name="leaseAddress"
            value={form.leaseAddress}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col">
          <label className="label">Price (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              name="leasePrice"
              value={form.leasePrice}
              onChange={handleChange}
              placeholder="300+"
              className={`${inputClass} pl-7`}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="label">Description</label>
        <textarea
          name="leaseDescription"
          value={form.leaseDescription}
          onChange={handleChange}
          rows={4}
          className={inputClass}
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="label">Start Date</label>
          <input
            type="date"
            name="leaseStartDate"
            value={form.leaseStartDate}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col">
          <label className="label">End Date</label>
          <input
            type="date"
            name="leaseEndDate"
            value={form.leaseEndDate}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Room Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="label">Number of Room</label>
          <input
            name="numRoom"
            value={form.numRoom}
            onChange={handleChange}
            placeholder="1"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col">
          <label className="label">Number of Bath</label>
          <input
            name="numBath"
            value={form.numBath}
            onChange={handleChange}
            placeholder="1"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col">
          <label className="label">Image URL</label>
          <input
            name="leaseImage"
            value={form.leaseImage}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Room Size */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          ["roomWidth", "Width (ft)"],
          ["roomDepth", "Depth (ft)"],
          ["latitude", "Latitude"],
          ["longitude", "Longitude"],
        ].map(([name, label]) => (
          <div className="flex flex-col" key={name}>
            <label className="label">{label}</label>
            <input
              type="number"
              name={name}
              value={getFormValue(name as keyof typeof form)}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {/* School */}
      <select
        name="leaseSchool"
        multiple
        value={form.leaseSchool}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions, (option) => option.value as Schools);
          setForm((prev) => ({ ...prev, leaseSchool: selected }));
        }}
        className={inputClass + " h-40"} 
      >
        {SchoolsArray.map((school) => (
          <option key={school} value={school}>
            {school}
          </option>
        ))}
      </select>

      {/* Amenities */}
      <div>
        <label className="label mb-2">Amenities</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SubleaseAmenityArray.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center space-x-2 text-sm"
            >
              <input
                type="checkbox"
                checked={form.amenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
              />
              <span>{amenity.replace("_", " ")}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateSubleasePage;