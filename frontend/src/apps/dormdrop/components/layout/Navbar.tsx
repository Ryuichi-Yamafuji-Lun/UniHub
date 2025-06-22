import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Add this icon lib or use Heroicons
import UniHubLogo from "@/assets/UniHubLogo.png";

interface NavBarProps {
  isScrolled: boolean;
}

const NavBar = ({ isScrolled }: NavBarProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="w-full h-20 px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={UniHubLogo} alt="UniHub Logo" className="h-16 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center space-x-2 text-sm font-medium text-gray-800">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-md transition ${
              isActive("/") ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
          >
            Unihub
          </Link>
          <span className="px-3 py-1.5 text-gray-400 cursor-not-allowed">
            CardinalCart (soon)
          </span>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-3 text-sm font-medium">
          <Link
            to="/login?redirect=/dormdrop"
            className={`px-4 py-2 rounded-md transition ${
              isActive("/login") ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
          >
            Login
          </Link>
          <Link
            to="/signup?redirect=/dormdrop"
            className="bg-[#084479] text-white px-4 py-2 rounded-md hover:bg-[#06345d] transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-3">
          <Link to="/" className="block text-sm font-medium text-gray-800">
            Unihub
          </Link>
          <span className="block text-sm text-gray-400">CardinalCart (soon)</span>
          <hr />
          <Link to="/login?redirect=/dormdrop" className="block text-sm text-gray-800">
            Login
          </Link>
          <Link to="/signup?redirect=/dormdrop" className="block text-sm font-semibold text-[#084479]">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;