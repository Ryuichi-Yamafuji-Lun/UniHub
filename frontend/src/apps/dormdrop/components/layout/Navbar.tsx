import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiUser } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header className="w-full z-50">
      {/* Top Black Nav */}
      <div className="bg-black text-white px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        {/* Left: Hamburger */}
        <div className="flex items-center space-x-4">
          <button className="text-white text-2xl block">
            <FiMenu />
          </button>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl w-full">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm" />
            <input
              type="text"
              placeholder="Subleases"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111] text-white pl-10 pr-4 py-2 rounded-md border border-transparent focus:outline-none focus:border-blue-500 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right: Auth & Cart */}
        <div className="flex items-center space-x-6 text-sm min-w-fit">
          <Link to="/login" className="hover:underline whitespace-nowrap">
            Login
          </Link>
          <Link to="/account" className="hover:underline flex items-center space-x-1">
            <FiUser />
            <span>Account</span>
          </Link>
        </div>
      </div>

      {/* Bottom Categories */}
      <div className="bg-[#fef6e4] px-6 py-2 flex space-x-6 text-sm font-medium text-black overflow-x-auto">
        <Link to="/dormdrop" className="hover:underline">
          Sublease
        </Link>
        <Link to="/" className="hover:underline">
          Furniture (soon)
        </Link>
        <Link to="/" className="hover:underline">
          Books (soon)
        </Link>
        <Link to="/" className="hover:underline">
          Tutoring (soon)
        </Link>
      </div>
    </header>
  );
};

export default NavBar;