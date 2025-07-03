// TopNavBar.tsx
import { Link, useLocation } from "react-router-dom";
import UniHubLogo from "@/assets/UniHubLogo.png";

interface TopNavBarProps {
  isVisible: boolean;
}

const TopNavBar = ({ isVisible }: TopNavBarProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`w-full bg-white shadow-sm transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <nav className="max-w-screen-2xl mx-auto w-full h-16 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img src={UniHubLogo} alt="UniHub Logo" className="h-12 w-auto" />
        </Link>

        <div className="hidden md:flex space-x-3 text-sm font-medium">
          <Link
            to="/login"
            className={`px-4 py-2 rounded-md transition ${
              isActive("/login") ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-[#084479] text-white px-4 py-2 rounded-md hover:bg-[#06345d] transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default TopNavBar;