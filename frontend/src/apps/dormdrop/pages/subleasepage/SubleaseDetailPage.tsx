import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";
import api from "@/lib/axios";

const SubleaseDetailPage = () => {
  const { id } = useParams();
  const [sublease, setSublease] = useState<SubleaseResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/v1/public/subleases/${id}`);
        setSublease(res.data);
      } catch (err) {
        console.error("Failed to fetch sublease:", err);
        setError("Failed to load sublease. Please try again.");
      }
    };

    fetchData();
  }, [id]);

  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;
  if (!sublease) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">{sublease.leaseName}</h1>
      <p className="text-gray-600 text-sm mt-1">{sublease.leaseAddress}</p>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <img
          src={sublease.leaseImage}
          alt={sublease.leaseName}
          className="w-full h-64 object-cover rounded-lg col-span-2"
        />
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src={sublease.leaseImage}
              alt={`${sublease.leaseName}-${i}`}
              className="w-full h-32 object-cover rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Description & Details */}
      <div className="mt-10 flex flex-col md:flex-row gap-10">
        <div className="md:w-2/3 space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-700 mt-2">{sublease.leaseDescription}</p>
          </div>

          {/* Lease Info */}
          <div>
            <h2 className="text-xl font-semibold">Lease Info</h2>
            <p className="text-gray-700 mt-1">
              {new Date(sublease.leaseStartDate).toLocaleDateString()} →{" "}
              {new Date(sublease.leaseEndDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700">Price: ${sublease.leasePrice}/month</p>
            <p className="text-gray-700">Room Type: {sublease.roomType}</p>
            <p className="text-gray-700">
              Dimensions: {sublease.roomWidth}ft x {sublease.roomDepth}ft
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold">Amenities</h2>
            <ul className="flex flex-wrap gap-2 mt-2 text-sm text-gray-700">
              {Array.from(sublease.amenities).map((a) => (
                <li
                  key={a}
                  className="px-3 py-1 border rounded-full bg-gray-50 capitalize"
                >
                  {a.replace(/_/g, " ").toLowerCase()}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/3 p-4 border rounded-lg shadow-sm">
          <div className="text-2xl font-bold">${sublease.leasePrice}</div>
          <p className="text-sm text-gray-600 mb-4">per month</p>

          <button className="w-full mt-2 bg-[#084479] text-white py-2 rounded-lg hover:bg-[#06345d]">
            Contact Subleaser
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubleaseDetailPage;