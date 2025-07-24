import { SchoolsArray, type Schools, schoolDisplayNames } from "@/types/enums/Schools";
import type { SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import { SubleaseAmenityArray } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import api from "@/lib/axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CreateSubleasePage = () => {
  const navigate = useNavigate();
  const maxChars = 1000;

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

  const [leaseDescriptionError, setLeaseDescriptionError] = useState("");
  const [schoolSearch, setSchoolSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredSchools = SchoolsArray.filter((school) =>
    school.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  const getFormValue = (key: keyof typeof form) => form[key];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "leaseDescription") {
      if (value.length <= maxChars) {
        setForm((prev) => ({ ...prev, [name]: value }));
        setLeaseDescriptionError("");
      } else {
        setLeaseDescriptionError(`Character limit exceeded! Maximum is ${maxChars} characters.`);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSchoolToggle = (school: Schools) => {
    setForm((prev) => ({
      ...prev,
      leaseSchool: prev.leaseSchool.includes(school)
        ? prev.leaseSchool.filter((s) => s !== school)
        : [...prev.leaseSchool, school],
    }));
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
    const numRoom = Number(form.numRoom);
    const numBath = Number(form.numBath);
    const roomWidth = Number(form.roomWidth);
    const roomDepth = Number(form.roomDepth);
    const leasePriceNumber = Number(form.leasePrice);
    
    if (isNaN(leasePriceNumber) || leasePriceNumber < 300) {
      return alert("Lease price must be at least $300.");
    }

    if (isNaN(numRoom) || numRoom <= 0) {
      return alert("Number of rooms must be greater than 0.");
    }

    if (isNaN(numBath) || numBath <= 0) {
      return alert("Number of baths must be greater than 0.");
    }

    if (isNaN(roomWidth) || roomWidth <= 0 || isNaN(roomDepth) || roomDepth <= 0) {
      return alert("Room width and depth must be greater than 0.");
    }
    
    if (new Date(form.leaseEndDate) < new Date(form.leaseStartDate)) {
      return alert("End date cannot be before start date.");
    }

    if (form.leaseDescription.length > maxChars) {
      return alert(`Lease description must be under ${maxChars} characters.`);
    }

    const payload = {
      ...form,
      leasePrice: leasePriceNumber,
      roomWidth: roomWidth,
      roomDepth: roomDepth,
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-8"
    >
      <h2 className="text-3xl font-semibold text-center">Create Sublease</h2>

      {/* Basic Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="label">Lease Name</label>
          <input name="leaseName" value={form.leaseName} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className="label">Address</label>
          <input name="leaseAddress" value={form.leaseAddress} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className="label">Price (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              name="leasePrice"
              value={form.leasePrice}
              onChange={handleChange}
              required
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
          required
          rows={4}
          className={inputClass}
        />
        <div className="flex justify-between mt-1 text-sm">
          <span className={leaseDescriptionError ? "text-red-600" : "text-gray-600"}>
            {form.leaseDescription.length} / {maxChars} characters
          </span>
          {leaseDescriptionError && (
            <span className="text-red-600 font-semibold">{leaseDescriptionError}</span>
          )}
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">Start Date</label>
          <input type="date" name="leaseStartDate" value={form.leaseStartDate} onChange={handleChange} required className={inputClass} max={form.leaseEndDate || undefined} />
        </div>
        <div>
          <label className="label">End Date</label>
          <input type="date" name="leaseEndDate" value={form.leaseEndDate} onChange={handleChange} required className={inputClass} min={form.leaseStartDate || undefined} />
        </div>
      </div>

      {/* Room Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">Number of Room</label>
          <input name="numRoom" value={form.numRoom} onChange={handleChange} required className={inputClass} min={1} />
        </div>
        <div>
          <label className="label">Number of Bath</label>
          <input name="numBath" value={form.numBath} onChange={handleChange} required className={inputClass} min={1} />
        </div>
        <div>
          <label className="label">Image URL</label>
          <input name="leaseImage" value={form.leaseImage} onChange={handleChange} required className={inputClass} />
        </div>
      </div>

      {/* Room Size */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {["roomWidth", "roomDepth", "latitude", "longitude"].map((key) => (
          <div key={key}>
            <label className="label">{key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</label>
            <input
              type="number"
              name={key}
              value={getFormValue(key as keyof typeof form)}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {/* Schools Section with Chips */}
      <div ref={wrapperRef} className="relative">
        <label className="label mb-2">Select Schools</label>

        {form.leaseSchool.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {form.leaseSchool.map((school) => (
              <div
                key={school}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {schoolDisplayNames[school]}
                <button
                  type="button"
                  onClick={() => handleSchoolToggle(school)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="text"
          placeholder="Search schools..."
          onChange={(e) => {
            setSchoolSearch(e.target.value);
            setDropdownOpen(true);
          }}
          value={schoolSearch}
          className={inputClass}
          onFocus={() => setDropdownOpen(true)}
        />

        {dropdownOpen && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto rounded-md shadow-lg">
            {filteredSchools.length > 0 ? (
              filteredSchools.map((school) => (
                <label
                  key={school}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.leaseSchool.includes(school)}
                    onChange={() => handleSchoolToggle(school)}
                    className="mr-2"
                  />
                  {schoolDisplayNames[school]}
                </label>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No schools found.</div>
            )}
          </div>
        )}
      </div>

      {/* Amenities */}
      <div>
        <label className="label mb-2">Amenities</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SubleaseAmenityArray.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2 text-sm">
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