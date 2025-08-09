import NavBar from "@/apps/dormdrop/components/layout/DormDropNavbar";
import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";

const DormDropMainLayout = () => {
  return (
    <div className="bg-primary-bg min-h-screen flex flex-col w-full overflow-x-hidden">
      <NavBar />
      <main className="flex-grow pt-20"> 
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default DormDropMainLayout;