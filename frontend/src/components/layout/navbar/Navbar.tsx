// NavBar.tsx
import { useEffect, useState } from "react";
import TopNavBar from "@/components/layout/navbar/TopNavbar";
import BottomNavBar from "@/components/layout/navbar/BottomNavbar";

const NavBar = () => {
  const [showTop, setShowTop] = useState(true);
  const [showBottom, setShowBottom] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 100) {
        setShowTop(false);
        setShowBottom(false);
      } else if (currentScroll < lastScrollY && currentScroll > 100) {
        setShowTop(true);
        setShowBottom(false);
      } else if (currentScroll <= 100) {
        setShowTop(true);
        setShowBottom(true);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <TopNavBar isVisible={showTop} />
      <BottomNavBar isVisible={showBottom} />
    </header>
  );
};

export default NavBar;