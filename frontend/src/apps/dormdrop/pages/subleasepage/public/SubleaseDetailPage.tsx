import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";
import api from "@/lib/axios";
// import { Heart, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { UserAccount } from "@/types/UserAccount";

const SubleaseDetailPage = () => {
  const { id } = useParams();
  const [sublease, setSublease] = useState<SubleaseResponse | null>(null);
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/v1/public/subleases/${id}`);
        setSublease(res.data);

        const account_res = await api.get("/api/v2/user/account/me");
        setAccount(account_res.data);
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
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Title Row */}
      <div className="flex justify-between items-start mb-1">
        <h1 className="text-3xl font-bold text-gray-900 text-left">{sublease.leaseName}</h1>
        <div className="flex gap-4">
          {account && sublease && account.id === sublease.ownerId && (
            <Link
              to={`/dormdrop/sublease/${sublease.id}/edit`}
              className="inline-block bg-[#084479] text-white px-4 py-2 rounded-lg hover:bg-[#06345d] text-sm font-semibold"
            >
              Edit Sublease
            </Link>
          )}
          {/* <button className="flex hover:text-black hover:bg-gray-400flex items-center gap-1 text-sm text-gray-700 hover:bg-gray-100 hover:shadow px-3 py-2 rounded-lg transition">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="flex hover:text-black hover:bg-gray-400flex items-center gap-1 text-sm text-gray-700 hover:bg-gray-100 hover:shadow px-3 py-2 rounded-lg transition">
            <Heart className="w-4 h-4" /> Save
          </button> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <img
          src={sublease.leaseImage}
          alt={sublease.leaseName}
          className="w-full h-64 object-cover rounded-lg md:col-span-2"
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

      <div className="mt-10 flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/3 space-y-8 text-left">
          <div>
            <p className="text-2xl font-bold text-gray-900 mt-2">Sublease at {sublease.leaseAddress}</p>
            <p>{sublease.numRoom} bedrooms · {sublease.numBath} bath</p>

          </div>
          <div className="w-full border-t border-gray-300 my-6"/>
          <div>
            <h2 className="text-xl font-semibold">Preferred Universities</h2>
            <ul className="flex flex-wrap gap-2 mt-2 text-sm text-gray-700">
              {Array.from(sublease.school).map((school) => (
                <li
                  key={school}
                  className="px-3 py-1 border rounded-full bg-gray-50 capitalize"
                >
                  {school}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full border-t border-gray-300 my-6"/>
          <div>
            <p className="text-gray-700 mt-2">{sublease.leaseDescription}</p>
          </div>
          <div className="w-full border-t border-gray-300 my-6"/>
          <div>
            <h2 className="text-xl font-semibold">Lease Info</h2>
            <ul className="text-gray-700 mt-2 space-y-1 text-sm">
              <li>
                Dates: {new Date(sublease.leaseStartDate).toLocaleDateString()} → {new Date(sublease.leaseEndDate).toLocaleDateString()}
              </li>
              <li>Price: ${sublease.leasePrice}/month</li>
              <li>Room Type: {sublease.numRoom} bedrooms · {sublease.numBath} bath</li>
              <li>Dimensions: {sublease.roomWidth}ft x {sublease.roomDepth}ft</li>
            </ul>
          </div>
          <div className="w-full border-t border-gray-300 my-6"/>
          <div>
            <h2 className="text-xl font-semibold">What this place offers</h2>
            <ul className="flex flex-wrap gap-2 mt-2 text-sm text-gray-700">
              {Array.from(sublease.amenities).map((amenity) => (
                <li
                  key={amenity}
                  className="px-3 py-1 border rounded-full bg-gray-50 capitalize"
                >
                  {amenity.replace(/_/g, " ").toLowerCase()}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:w-1/3 relative">
          <div className="sticky top-28 border rounded-lg shadow-sm p-6 space-y-6">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                ${sublease.leasePrice}
              </div>
              <p className="text-sm text-gray-500">per month</p>
            </div>

            <Link
              to={`/account/${sublease.ownerId}`}
              className="flex items-center gap-4 hover:bg-gray-50 p-3 rounded-lg transition"
            >
              <img
                src={sublease.ownerProfilePicture || "/default-profile.png"}
                alt={sublease.ownerUsername}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-md font-medium text-gray-900">{sublease.ownerUsername}</p>
                <p className="text-sm text-yellow-600">
                  ⭐ {sublease.numberOfRatings && sublease.numberOfRatings > 0
                    ? (sublease.sumOfRatings! / sublease.numberOfRatings!).toFixed(1)
                    : "5.0"} ({sublease.numberOfRatings || 1})
                </p>
              </div>
            </Link>

            <button className="w-full bg-[#084479] text-white py-3 rounded-lg hover:bg-[#06345d] text-sm font-semibold">
              Contact Subleaser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubleaseDetailPage;