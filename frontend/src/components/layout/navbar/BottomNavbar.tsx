// BottomNavBar.tsx
import { Link, useLocation } from "react-router-dom";

interface BottomNavBarProps {
  isVisible: boolean;
}

const BottomNavBar = ({ isVisible }: BottomNavBarProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`w-full bg-gray-50 border-t border-gray-200 shadow-sm transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <nav className="w-full flex justify-center space-x-6 py-2 text-sm font-medium text-gray-700 px-6 md:px-10">
        <Link
          to="/dormdrop"
          className={`hover:text-[#084479] transition ${
            isActive("/dormdrop") ? "text-[#084479] font-semibold" : ""
          }`}
        >
          Sublease
        </Link>
        <span className="text-gray-400 cursor-not-allowed">Textbooks (soon)</span>
        <span className="text-gray-400 cursor-not-allowed">Tutoring (soon)</span>
      </nav>
    </div>
  );
};

export default BottomNavBar;