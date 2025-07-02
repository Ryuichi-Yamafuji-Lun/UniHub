// NavBar.tsx - Combines Top and Bottom Nav with scroll logic
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
        // scrolling down
        setShowTop(false);
        setShowBottom(false);
      } else if (currentScroll < lastScrollY && currentScroll > 100) {
        // scrolling up
        setShowTop(true);
        setShowBottom(false);
      } else if (currentScroll <= 100) {
        // top of page
        setShowTop(true);
        setShowBottom(true);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="sticky top-0 z-50 w-full">
      <TopNavBar isVisible={showTop} />
      <BottomNavBar isVisible={showBottom} />
    </div>
  );
};

export default NavBar;