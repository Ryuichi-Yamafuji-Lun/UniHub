import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/axios";

interface SubleaseForm {
  leaseName: string;
  leaseAddress: string;
  leasePrice: number;
  leaseDescription: string;
  leaseStartDate: string;
  leaseEndDate: string;
  leaseImage: string;
  roomType: string;
  roomWidth: number;
  roomDepth: number;
}

const UpdateSubleasePage = () => {
  const { subleaseId: id } = useParams();
  const [form, setForm] = useState<SubleaseForm | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSublease = async () => {
      const res = await api.get(`/api/v1/public/subleases/${id}`);
      setForm(res.data);
    };
    fetchSublease();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => prev ? { ...prev, [name]: name.includes("Price") || name.includes("Width") || name.includes("Depth") ? Number(value) : value } : prev);
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
      <button type="submit" className="btn">Update</button>
    </form>
  );
};

export default UpdateSubleasePage;