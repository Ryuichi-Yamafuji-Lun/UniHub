import { useUserProfile } from "@/hooks/useUserProfile";
import { useMySubleases } from "@/hooks/useMySubleases";

import UserProfileCard from "@/pages/profilepage/section/UserProfileCard";
import MySubleaseCarousel from "@/pages/profilepage/section/MySubleaseCarasoul";

const UserProfilePage = () => {
  const { data: user, loading: userLoading } = useUserProfile();
  const { data: subleases, loading: subleaseLoading } = useMySubleases();

  const isLoading = userLoading || subleaseLoading;

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#fef6e4] text-gray-500">
        Loading your profile...
      </div>
    );
  }

  if (!user) {
    return <div className="w-full h-screen flex items-center justify-center">Failed to load user profile.</div>;
  }

  return (
    <>
      <UserProfileCard account={user} />
      <div className="relative z-20 bg-[#E2E6E6]">
        <MySubleaseCarousel subleases={subleases} />
      </div>
    </>
  );
};

export default UserProfilePage;