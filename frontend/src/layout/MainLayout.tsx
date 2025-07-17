// MainLayout.tsx
import type { ReactNode } from "react";
import NavBar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="bg-[#fef6e4] min-h-screen flex flex-col w-full overflow-x-hidden">
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;