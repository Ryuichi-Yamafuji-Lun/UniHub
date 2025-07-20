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
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          Available Subleases
        </h1>

        <div
          className="grid gap-8 justify-center sm:justify-start"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            alignItems: "stretch",
          }}
        >
          {subleases.map((sublease) => (
            <SubleaseCard key={sublease.id} sublease={sublease} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubleaseListPage;