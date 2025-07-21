import { useEffect, useState } from "react";
import SubleaseCard from "@/apps/dormdrop/components/ui/SubleaseCard";
import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";
import api from "@/lib/axios";

const SubleaseListPage = () => {
  const [subleases, setSubleases] = useState<SubleaseResponse[]>([]);

  useEffect(() => {
    const fetchSubleases = async () => {
      try {
        const response = await api.get("/api/v1/public/subleases/all");
        setSubleases(response.data);
      } catch (err) {
        console.error("Error fetching subleases:", err);
      }
    };

    fetchSubleases();
  }, []);

  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
          🏠 Available Subleases
        </h1>

        {subleases.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No subleases available at the moment.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {subleases.map((sublease) => (
              <div
                key={sublease.id}
                className="transition transform duration-200"
              >
                <SubleaseCard sublease={sublease} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubleaseListPage;