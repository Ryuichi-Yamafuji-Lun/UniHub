import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/axios";
import {
  SchoolsArray,
  type Schools,
  schoolDisplayNames,
} from "@/apps/dormdrop/types/enums/Schools";
import {
  SubleaseAmenityArray,
  type SubleaseAmenity,
} from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import type { SubleaseUpdateDTO } from "@/apps/dormdrop/types/Sublease";

const UpdateSubleasePage = () => {
  const { subleaseId: id } = useParams();
  const navigate = useNavigate();
  const maxChars = 1000;

  const [form, setForm] = useState<SubleaseUpdateDTO>({
    leaseName: "",
    leaseAddress: "",
    leasePrice: 0,
    leaseDescription: "",
    leaseStartDate: "",
    leaseEndDate: "",
    leaseImage: "",
    numRoom: 0,
    numBath: 0,
    roomWidth: 0,
    roomDepth: 0,
    leaseSchool: [],
    latitude: 0,
    longitude: 0,
    amenities: [],
  });

  const [leaseDescriptionError, setLeaseDescriptionError] = useState("");
  const [schoolSearch, setSchoolSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredSchools = SchoolsArray.filter((school) =>
    school.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  useEffect(() => {
    const fetchSublease = async () => {
      try {
        const res = await api.get(`/api/v1/public/subleases/${id}`);
        const data = res.data;

        setForm({
          leaseName: data.leaseName ?? "",
          leaseAddress: data.leaseAddress ?? "",
          leasePrice: data.leasePrice ?? 0,
          leaseDescription: data.leaseDescription ?? "",
          leaseStartDate: data.leaseStartDate ?? "",
          leaseEndDate: data.leaseEndDate ?? "",
          leaseImage: data.leaseImage ?? "",
          numRoom: data.numRoom ?? 0,
          numBath: data.numBath ?? 0,
          roomWidth: data.roomWidth ?? 0,
          roomDepth: data.roomDepth ?? 0,
          leaseSchool: data.school ?? [],
          latitude: data.latitude ?? 0,
          longitude: data.longitude ?? 0,
          amenities: data.amenities ?? [],
        });
      } catch (error) {
        console.error("Error fetching sublease", error);
      }
    };
    fetchSublease();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        setLeaseDescriptionError(
          `Character limit exceeded! Maximum is ${maxChars} characters.`
        );
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: ["leasePrice", "roomWidth", "roomDepth", "latitude", "longitude", "numRoom", "numBath"].includes(name)
          ? Number(value)
          : value,
      }));
    }
  };

  const handleSchoolToggle = (school: Schools) => {
    setForm((prev) => ({
      ...prev,
      leaseSchool: (prev.leaseSchool ?? []).includes(school)
        ? (prev.leaseSchool ?? []).filter((s) => s !== school)
        : [...(prev.leaseSchool ?? []), school],
    }));
  };

  const handleAmenityChange = (amenity: SubleaseAmenity) => {
    setForm((prev) => {
      const exists = (prev.amenities ?? []).includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? (prev.amenities ?? []).filter((a) => a !== amenity)
          : [...(prev.amenities ?? []), amenity],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if ((form.leasePrice ?? 0) < 300) {
      alert("Lease price must be at least $300.");
      return;
    }
    if ((form.leaseDescription ?? "").length > maxChars) {
      alert(`Lease description must be under ${maxChars} characters.`);
      return;
    }

    try {
      await api.put(`/api/v1/owner/accounts/me/subleases/${id}`, form);
      navigate("/account/me");
    } catch (error) {
      console.error("Error updating sublease", error);
    }
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-8"
    >
      <h2 className="text-3xl font-semibold text-center">Update Sublease</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="label">Lease Name</label>
          <input
            name="leaseName"
            value={form.leaseName ?? ""}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className="label">Address</label>
          <input
            name="leaseAddress"
            value={form.leaseAddress ?? ""}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className="label">Price (USD)</label>
          <input
            type="number"
            name="leasePrice"
            value={form.leasePrice ?? ""}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="label">Description</label>
        <textarea
          name="leaseDescription"
          value={form.leaseDescription ?? ""}
          onChange={handleChange}
          rows={4}
          className={inputClass}
        />
        <div className="flex justify-between mt-1 text-sm">
          <span className={leaseDescriptionError ? "text-red-600" : "text-gray-600"}>
            {(form.leaseDescription ?? "").length} / {maxChars} characters
          </span>
          {leaseDescriptionError && (
            <span className="text-red-600 font-semibold">{leaseDescriptionError}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">Start Date</label>
          <input
            type="date"
            name="leaseStartDate"
            value={form.leaseStartDate ?? ""}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className="label">End Date</label>
          <input
            type="date"
            name="leaseEndDate"
            value={form.leaseEndDate ?? ""}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          ["roomWidth", "Width (ft)"],
          ["roomDepth", "Depth (ft)"],
          ["latitude", "Latitude"],
          ["longitude", "Longitude"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="label">{label}</label>
            <input
              type="number"
              name={name}
              value={form[name as keyof typeof form] ?? ""}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="label">Image URL</label>
        <input
          name="leaseImage"
          value={form.leaseImage ?? ""}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div ref={wrapperRef} className="relative">
        <label className="label mb-2">Select Schools</label>
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
                <label key={school} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(form.leaseSchool ?? []).includes(school)}
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
        {(form.leaseSchool ?? []).length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {(form.leaseSchool ?? []).map((school) => (
              <span
                key={school}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {schoolDisplayNames[school]}
                <button
                  type="button"
                  onClick={() => handleSchoolToggle(school)}
                  className="ml-2 text-blue-600 hover:text-blue-900 font-bold"
                  aria-label={`Remove ${schoolDisplayNames[school]}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="label mb-2">Amenities</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SubleaseAmenityArray.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={(form.amenities ?? []).includes(amenity)}
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
        Update Sublease
      </button>
    </form>
  );
};

export default UpdateSubleasePage;