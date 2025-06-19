import { Link, useLocation } from "react-router-dom";
import UniHubLogo from "@/assets/UniHubLogo.png";

interface NavBarProps {
  isScrolled: boolean;
}

const NavBar = ({ isScrolled }: NavBarProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <nav className="w-full h-20 px-6 md:px-10 flex items-center justify-between">
        {/* LEFT: Logo */}
        <div className="flex-1">
          <Link to="/" className="flex items-center space-x-3">
            <img src={UniHubLogo} alt="Unihub Logo" className="h-16 w-auto" />
          </Link>
        </div>

        {/* CENTER: Navigation */}
        <div className="flex-1 flex justify-center space-x-2 text-sm font-medium text-gray-800">
          <Link
            to="/about"
            className={`px-3 py-1.5 rounded-md transition ${
              isActive("/about") ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
          >
            UniHub
          </Link>
          <Link
            to="#"
            className="px-3 py-1.5 rounded-md text-gray-400 cursor-not-allowed"
          >
            CardinalCart (soon)
          </Link>
        </div>

        {/* RIGHT: Auth Buttons */}
        <div className="flex-1 flex justify-end items-center space-x-3 text-sm font-medium">
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
    </header>
  );
};

export default NavBar;