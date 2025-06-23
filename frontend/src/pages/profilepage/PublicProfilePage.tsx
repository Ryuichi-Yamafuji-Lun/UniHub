import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface PublicAccount {
  id: number;
  username: string;
  profilePicture?: string;
  email: string;
  sumOfRatings: number;
  numberOfRatings: number;
}

const PublicAccountProfile = () => {
  const { ownerId } = useParams();
  const [account, setAccount] = useState<PublicAccount | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await api.get(`/api/v2/user/account/${ownerId}`);
        setAccount(res.data);
      } catch (err) {
        console.error("Failed to fetch account:", err);
        setError("Failed to load user profile. Please try again later.");
      }
    };

    fetchAccount();
  }, [ownerId]);

  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;
  if (!account) return <p className="text-center mt-20">Loading...</p>;

  const averageRating = (
    account.sumOfRatings / account.numberOfRatings
  ).toFixed(2);

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Meet your host
      </h2>

      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-gray-200">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={account.profilePicture || "/default-avatar.png"}
            alt={account.username}
            className="w-24 h-24 rounded-full object-cover border"
          />
          {/* Optional Verified Badge */}
          <span className="absolute bottom-0 right-0 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
            ✓
          </span>
        </div>

        {/* Host Info */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-gray-900">{account.username}</h3>
          <p className="text-sm text-gray-500 mb-3">Sublease Host</p>

          <div className="flex justify-center sm:justify-start gap-6 text-sm">
            <div className="text-center">
              <p className="font-semibold text-gray-800">
                {account.numberOfRatings}
              </p>
              <p className="text-gray-500">Reviews</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-yellow-600">{averageRating} ⭐</p>
              <p className="text-gray-500">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Language Line */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mt-6 justify-center sm:justify-start">
        <span className="text-xl">🌐</span>
        <span>Speaks English</span>
      </div>
    </div>
  );
};

export default PublicAccountProfile;