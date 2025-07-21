import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubleaseCard from "@/apps/dormdrop/components/ui/SubleaseCard";
import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";
import api from "@/lib/axios";

const MySubleaseListingPage = () => {
  const [subleases, setSubleases] = useState<SubleaseResponse[]>([]);

  useEffect(() => {
    const fetchSubleases = async () => {
      try {
        const response = await api.get("api/v1/owner/accounts/me/subleases");
        setSubleases(response.data);
      } catch (err) {
        console.error("Error fetching subleases:", err);
      }
    };
    fetchSubleases();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          My Subleases
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
            <div key={sublease.id} className="relative">
              <SubleaseCard sublease={sublease} />
            </div>
          ))}
        </div>
      </div>
      {/* Floating Create Button */}
      <Link
        to="/dormdrop/sublease/new"
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg text-2xl flex items-center justify-center"
        aria-label="Create Sublease"
      >
        +
      </Link>
    </div>
  );
};

export default MySubleaseListingPage;