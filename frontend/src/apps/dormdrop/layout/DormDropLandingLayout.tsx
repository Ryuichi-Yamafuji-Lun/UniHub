import NavBar from "@/apps/dormdrop/components/layout/DormDropLandingNavBar";
import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";
// change later look at amazonkindle
const DormDropLandingLayout = () => {
  return (
    <div className="bg-primary-bg min-h-screen flex flex-col w-full overflow-x-hidden">
      <NavBar />
      <main className="flex-grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default DormDropLandingLayout;