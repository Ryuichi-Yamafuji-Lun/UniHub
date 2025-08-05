import NavBar from "@/apps/dormdrop/components/layout/DormDropNavbar";
import { Outlet } from "react-router-dom";
// change later look at amazonkindle
const SearchLayout = () => {
  return (
    <div className="bg-primary-bg min-h-screen flex flex-col w-full overflow-x-hidden">
      <NavBar />
      <main className="flex-grow">
        <Outlet /> 
      </main>
    </div>
  );
};

export default SearchLayout;