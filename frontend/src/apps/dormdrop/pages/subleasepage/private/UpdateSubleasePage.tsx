import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/axios";
import { SchoolsArray } from "@/apps/dormdrop/types/enums/Schools";
import { SubleaseAmenityArray } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import type { SubleaseUpdateDTO } from "@/apps/dormdrop/types/Sublease";
import type { SubleaseAmenity} from "@/apps/dormdrop/types/enums/SubleaseAmenity";

const UpdateSubleasePage = () => {
  const { subleaseId: id } = useParams();
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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSublease = async () => {
      const res = await api.get(`/api/v1/public/subleases/${id}`);
      setForm(res.data);
    };
    fetchSublease();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ["leasePrice", "roomWidth", "roomDepth", "latitude", "longitude"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleAmenityChange = (amenity: SubleaseAmenity) => {
    setForm((prev) => {
      const currentAmenities = prev.amenities ?? [];
      const exists = currentAmenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? currentAmenities.filter((a) => a !== amenity)
          : [...currentAmenities, amenity],
      };
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/api/v1/owner/accounts/me/subleases/${id}`, form);
      navigate("/account/me");
    } catch (error) {
      console.error("Error updating sublease", error);
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Update Sublease</h2>
      <input name="leaseName" value={form.leaseName} onChange={handleChange} className="input" />
      <input name="leaseAddress" value={form.leaseAddress} onChange={handleChange} className="input" />
      <input name="leasePrice" type="number" value={form.leasePrice} onChange={handleChange} className="input" />
      <textarea name="leaseDescription" value={form.leaseDescription} onChange={handleChange} className="textarea" />
      <input name="leaseStartDate" type="date" value={form.leaseStartDate} onChange={handleChange} className="input" />
      <input name="leaseEndDate" type="date" value={form.leaseEndDate} onChange={handleChange} className="input" />
      <input name="leaseImage" value={form.leaseImage} onChange={handleChange} className="input" />
      <input name="numRoom" value={form.numRoom} onChange={handleChange} className="input" />
      <input name="numBath" value={form.numBath} onChange={handleChange} className="input" />
      <input name="roomWidth" type="number" value={form.roomWidth} onChange={handleChange} className="input" />
      <input name="roomDepth" type="number" value={form.roomDepth} onChange={handleChange} className="input" />

      <select name="leaseSchool" value={form.leaseSchool} onChange={handleChange} className="input">
        {SchoolsArray.map(school => (
          <option key={school} value={school}>{school}</option>
        ))}
      </select>

      <input name="latitude" type="number" value={form.latitude} onChange={handleChange} className="input" />
      <input name="longitude" type="number" value={form.longitude} onChange={handleChange} className="input" />

      <div>
        <label className="block font-semibold mb-1">Amenities</label>
        <div className="grid grid-cols-2 gap-2">
          {SubleaseAmenityArray.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={(form.amenities ?? []).includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="btn">Update</button>
    </form>
  );
};

export default UpdateSubleasePage;