import { useState, useEffect} from "react";
import type { ReactNode } from "react";
import NavBar from "@/apps/dormdrop/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar isScrolled={isScrolled} />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;