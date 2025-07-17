import type { ReactNode } from "react";
import NavBar from "@/apps/dormdrop/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {

  return (
    <div className="min-h-screen flex flex-col bg-[#fef6e4]">
      <NavBar />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;