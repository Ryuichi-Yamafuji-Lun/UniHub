import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import type { SubleaseCreateDTO } from "@/apps/dormdrop/types/Sublease";
import { SchoolsArray } from "@/apps/dormdrop/types/enums/Schools";
import { SubleaseAmenityArray } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import type { SubleaseAmenity} from "@/apps/dormdrop/types/enums/SubleaseAmenity";

const CreateSubleasePage = () => {
  const [form, setForm] = useState<SubleaseCreateDTO>({
    leaseName: "",
    leaseAddress: "",
    leasePrice: 0,
    leaseDescription: "",
    leaseStartDate: "",
    leaseEndDate: "",
    leaseImage: "",
    roomType: "",
    roomWidth: 0,
    roomDepth: 0,
    leaseSchool: "USC",
    latitude: 0,
    longitude: 0,
    amenities: [],
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "leasePrice" || name === "roomWidth" || name === "roomDepth" || name === "latitude" || name === "longitude"
        ? Number(value)
        : value,
    }));
  };

  const handleAmenityChange = (amenity: SubleaseAmenity) => {
    setForm(prev => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/v1/owner/accounts/me/subleases", form);
      navigate("/account/me");
    } catch (error) {
      console.error("Error creating sublease", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-8">

    <h2 className="text-3xl font-semibold text-center">Create Sublease</h2>

    {/* SECTION 1: Lease Info */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Lease Name</label>
        <input name="leaseName" value={form.leaseName} onChange={handleChange} className="input" />
        </div>
        <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Address</label>
        <input name="leaseAddress" value={form.leaseAddress} onChange={handleChange} className="input" />
        </div>
        <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
        <input type="number" name="leasePrice" value={form.leasePrice} onChange={handleChange} className="input" />
        </div>
    </div>

    {/* SECTION 2: Description */}
    <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
        <textarea name="leaseDescription" value={form.leaseDescription} onChange={handleChange} rows={4} className="input w-full" />
    </div>

    {/* SECTION 3: Dates */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
        <input type="date" name="leaseStartDate" value={form.leaseStartDate} onChange={handleChange} className="input" />
        </div>
        <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
        <input type="date" name="leaseEndDate" value={form.leaseEndDate} onChange={handleChange} className="input" />
        </div>
    </div>

    {/* SECTION 4: Room Details */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Room Type</label>
        <input name="roomType" value={form.roomType} onChange={handleChange} placeholder="e.g. Single, Double" className="input" />
        </div>
        <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input name="leaseImage" value={form.leaseImage} onChange={handleChange} className="input" />
        </div>
    </div>

    {/* SECTION 5: Room Size */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Width (ft)</label>
        <input type="number" name="roomWidth" value={form.roomWidth} onChange={handleChange} className="input" />
        </div>
        <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Depth (ft)</label>
        <input type="number" name="roomDepth" value={form.roomDepth} onChange={handleChange} className="input" />
        </div>
        <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Latitude</label>
        <input type="number" name="latitude" value={form.latitude} onChange={handleChange} className="input" />
        </div>
        <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Longitude</label>
        <input type="number" name="longitude" value={form.longitude} onChange={handleChange} className="input" />
        </div>
    </div>

    {/* SECTION 6: School */}
    <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">School</label>
        <select name="leaseSchool" value={form.leaseSchool} onChange={handleChange} className="input w-full">
        {SchoolsArray.map((school) => (
            <option key={school} value={school}>{school}</option>
        ))}
        </select>
    </div>

    {/* SECTION 7: Amenities */}
    <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Amenities</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {SubleaseAmenityArray.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
            <input
                type="checkbox"
                checked={form.amenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
            />
            <span className="text-sm">{amenity.replace('_', ' ')}</span>
            </label>
        ))}
        </div>
    </div>

    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Submit
    </button>
    </form>


  );
};

export default CreateSubleasePage;