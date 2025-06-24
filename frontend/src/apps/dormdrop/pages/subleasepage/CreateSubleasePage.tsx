import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";

const CreateSubleasePage = () => {
  const [form, setForm] = useState({
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
    amenities: [] as string[],
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Create Sublease</h2>
      <input name="leaseName" placeholder="Lease Name" value={form.leaseName} onChange={handleChange} className="input" />
      <input name="leaseAddress" placeholder="Address" value={form.leaseAddress} onChange={handleChange} className="input" />
      <input name="leasePrice" type="number" placeholder="Price" value={form.leasePrice} onChange={handleChange} className="input" />
      <textarea name="leaseDescription" placeholder="Description" value={form.leaseDescription} onChange={handleChange} className="textarea" />
      <input name="leaseStartDate" type="date" value={form.leaseStartDate} onChange={handleChange} className="input" />
      <input name="leaseEndDate" type="date" value={form.leaseEndDate} onChange={handleChange} className="input" />
      <input name="leaseImage" placeholder="Image URL" value={form.leaseImage} onChange={handleChange} className="input" />
      <input name="roomType" placeholder="Room Type" value={form.roomType} onChange={handleChange} className="input" />
      <input name="roomWidth" type="number" placeholder="Width (ft)" value={form.roomWidth} onChange={handleChange} className="input" />
      <input name="roomDepth" type="number" placeholder="Depth (ft)" value={form.roomDepth} onChange={handleChange} className="input" />
      <button type="submit" className="btn">Submit</button>
    </form>
  );
};

export default CreateSubleasePage;