import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - scrollY) > 10) {
        setScrollDirection(currentScrollY > scrollY ? "down" : "up");
        setScrollY(currentScrollY);
      }
    };

    const token = localStorage.getItem("token"); // or sessionStorage / cookies
    setIsLoggedIn(!!token);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove auth token
    setIsLoggedIn(false);
    navigate("/"); // redirect to home
  };

  return (
    <header className="w-full z-50 sticky top-0 left-0">
      {/* Top Black Nav */}
      <div
        className={`bg-black text-white px-4 py-3 flex items-center justify-between gap-4 flex-wrap transition-transform duration-300 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Left: Logo */}
        <div className="flex items-center space-x-4 px-2">
          <Link to="/" className="text-white text-2xl font-bold tracking-tight">
            Unihub
          </Link>
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

        {/* Right: Auth */}
        <div className="flex items-center space-x-6 text-sm min-w-fit">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:underline whitespace-nowrap">
                Login
              </Link>
              <Link to="/signup" className="hover:underline whitespace-nowrap">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/account/me" className="hover:underline flex items-center space-x-1">
                <FiUser />
                <span>Account</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hover:underline whitespace-nowrap text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bottom Categories */}
      <div
        className={`bg-[#fef6e4] px-6 py-2 flex space-x-6 text-sm font-medium text-black overflow-x-auto transition-opacity duration-300 ${
          scrollY <= 10 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link to="/" className="hover:underline">
          Home
        </Link>
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