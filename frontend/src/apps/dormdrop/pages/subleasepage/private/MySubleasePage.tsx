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
    <div className="bg-primary-bg min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
          📋 My Subleases
        </h1>

        {subleases.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-8">
            You haven’t listed any subleases yet.
            <br />
            <Link
              to="/dormdrop/sublease/new"
              className="text-blue-600 hover:underline font-medium"
            >
              Create one now
            </Link>
            .
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subleases.map((sublease) => (
              <div
                key={sublease.id}
                className="w-full flex justify-center sm:block"
              >
                <SubleaseCard sublease={sublease} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Create Button */}
      <Link
        to="/dormdrop/sublease/new"
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl text-3xl flex items-center justify-center transition-transform hover:scale-110"
        aria-label="Create Sublease"
      >
        +
      </Link>
    </div>
  );
};

export default MySubleaseListingPage;