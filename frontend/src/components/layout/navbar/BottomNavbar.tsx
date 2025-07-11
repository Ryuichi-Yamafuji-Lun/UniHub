import { Link, useLocation } from "react-router-dom";

interface BottomNavBarProps {
  isVisible: boolean;
}

const BottomNavBar = ({ isVisible }: BottomNavBarProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`w-full bg-[#222F3E] shadow-sm transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <nav className="w-full flex justify-center space-x-6 py-2 text-sm font-medium text-white px-6 md:px-10">
        <Link
          to="/dormdrop"
          className={`transition ${
            isActive("/dormdrop")
              ? "text-white font-semibold underline"
              : "hover:text-gray-300"
          }`}
        >
          Sublease
        </Link>
        <span className="text-gray-300 cursor-not-allowed">
          Textbooks (soon)
        </span>
        <span className="text-gray-300 cursor-not-allowed">
          Tutoring (soon)
        </span>
      </nav>
    </div>
  );
};

export default BottomNavBar;