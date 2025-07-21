import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/axios";
import { School, Star, CalendarDays } from "lucide-react";
import type { UserAccount } from "@/types/UserAccount";

const PublicProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [account, setAccount] = useState<UserAccount | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/api/v2/user/account/${userId}`);
        setAccount(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        setAccount(null);
      }
    };

    if (userId) fetchProfile();
  }, [userId]);

  if (!account) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const averageRating =
    account.sumOfRatings && account.numberOfRatings
      ? (account.sumOfRatings / account.numberOfRatings).toFixed(1)
      : "5.0";

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8 flex flex-col sm:flex-row gap-8 items-center">

        {/* Left column: profile picture and username */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={account.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-sm"
          />
          <h2 className="text-xl font-semibold text-gray-900">@{account.username}</h2>
        </div>

        {/* Right column: other details */}
        <div className="flex-1 space-y-2 text-gray-700 text-sm">

          <div className="flex items-center gap-2">
            <School size={16} className="text-gray-500" />
            <span className="font-medium w-20">School:</span>
            <span>{account.school}</span>
          </div>

          <div className="flex items-center gap-2">
            <Star size={16} className="text-yellow-500" />
            <span className="font-medium w-20">Rating:</span>
            <span>{averageRating} ★</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-gray-500" />
            <span className="font-medium w-20">Joined:</span>
            <span>
              {account.createdAt && new Date(account.createdAt).toLocaleDateString()}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;