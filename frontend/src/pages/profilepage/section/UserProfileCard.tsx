import { Mail, School, Star, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import type { UserAccount } from "@/types/UserAccount";

type Props = {
  account: UserAccount;
};

const UserProfileCard = ({ account }: Props) => {
  const fullName = `${account.firstName ?? ""} ${account.lastName ?? ""}`.trim();
  const averageRating =
    account.sumOfRatings && account.numberOfRatings
      ? (account.sumOfRatings / account.numberOfRatings).toFixed(1)
      : "5.0";

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8 relative flex flex-col sm:flex-row gap-8 items-center">
        <Link
          to="/account/me/edit"
          className="absolute top-4 right-4 px-4 py-1.5 text-sm font-medium bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
        >
          Edit Profile
        </Link>

        <div className="flex flex-col items-center gap-3">
          <img
            src={account.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-sm"
          />
          <h1 className="text-2xl font-bold text-gray-900">
            {fullName || "Unnamed User"}
          </h1>
          <p className="text-gray-500 text-sm">@{account.username}</p>
        </div>

        <div className="flex-1 space-y-4 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-gray-500" />
            <span className="font-medium w-20">Email:</span>
            <span>{account.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <School size={16} className="text-gray-500" />
            <span className="font-medium w-20">School:</span>
            <span>{account.school || "N/A"}</span>
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
              {account.createdAt &&
                new Date(account.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;