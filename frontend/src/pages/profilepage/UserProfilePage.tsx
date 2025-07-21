// pages/UserProfilePage.tsx
import UserProfileCard from "@/pages/profilepage/section/UserProfileCard";
import MySubleaseCarousel from "./section/MySubleaseCarasoul";

const UserProfilePage = () => {
  return (
    <>
      <UserProfileCard />
      <div className="relative z-20 bg-[#E2E6E6]">
        <MySubleaseCarousel />
      </div>
    </>
  );
};

export default UserProfilePage;