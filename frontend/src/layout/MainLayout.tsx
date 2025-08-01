import NavBar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
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

export default MainLayout;