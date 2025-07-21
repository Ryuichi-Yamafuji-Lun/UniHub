// pages/UserProfilePage.tsx
import UserProfileCard from "@/pages/profilepage/section/UserProfileCard";
import MySubleaseCarousel from "./section/MySubleaseCarasoul";


const UserProfilePage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <UserProfileCard />
      <MySubleaseCarousel />
    </div>
  );
};

export default UserProfilePage;