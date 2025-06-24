import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/axios";

interface UserAccount {
  username: string;
  email: string;
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
}

const UserProfilePage = () => {
  const [account, setAccount] = useState<UserAccount | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get("/api/v2/user/account/me");
      setAccount(res.data);
    };

    fetchProfile();
  }, []);

  if (!account) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <img
        src={account.profilePicture || "/default-avatar.png"}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto object-cover"
      />
      <h2 className="text-2xl font-bold mt-4">{account.username}</h2>

      {(account.firstName || account.lastName) && (
        <p className="text-md text-gray-700">
          {account.firstName} {account.lastName}
        </p>
      )}

      <p className="text-gray-500">{account.email}</p>

      <Link
        to="/account/edit"
        className="inline-block mt-6 px-4 py-2 text-white bg-[#084479] rounded-md hover:bg-[#06345d]"
      >
        Edit Profile
      </Link>
    </div>
  );
};

export default UserProfilePage;