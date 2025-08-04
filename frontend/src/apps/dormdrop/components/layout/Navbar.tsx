import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useUserProfile } from "@/hooks/useUserProfile";

const DormdropNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const location = useLocation();
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const { data: account} = useUserProfile();
  const isLoggedIn = !!account;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfileMenuOpen(false);
    window.location.href = "/"; 
  };

  const getLoginUrl = () => {
    const currentPath = location.pathname + location.search + location.hash;
    return `/login?redirect=${encodeURIComponent(currentPath)}`;
  };

  const navBarClass = `
    w-full fixed top-0 left-0 z-50 transition-all duration-300
    ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}
  `;

  const navBarTextColor = isScrolled ? "text-black" : "text-white";

  return (
    <header className={navBarClass}>
      <div
        className={`max-w-7xl mx-auto px-6 py-4 flex justify-between items-center ${navBarTextColor}`}
      >
        {/* Left Side: Logo */}
        <div className="text-2xl font-bold tracking-tight">
          <Link to="/">Dormdrop</Link>
        </div>

        {/* Center: Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 font-medium"></nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/dormdrop/sublease/new"
            className={`font-semibold py-2 px-4 rounded-full transition-colors
            ${
              isScrolled
                ? "text-primary-actions border-2 hover:bg-blue-50"
                : "text-white border-2 border-white hover:bg-white hover:text-primary-actions"
            }
          `}
          >
            List Your Space
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to={getLoginUrl()}
                className="font-semibold hover:text-primary-actions"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#007AFF] text-white font-semibold py-2 px-5 rounded-full hover:bg-blue-600 transition-colors"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2"
              >
                <img
                  src={account?.profilePicture || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
                <FiChevronDown
                  size={20}
                  className={`transition-transform ${
                    profileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-lg text-black">
                  <div className="p-4 border-b">
                    <p className="font-bold">{account?.username}</p>
                    <p className="text-sm text-gray-500">{account?.email}</p>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/account/me/sublease"
                      className="block px-5 py-2 text-sm hover:bg-gray-100"
                    >
                      My Listings
                    </Link>
                    <Link
                      to="/account/me"
                      className="block px-5 py-2 text-sm hover:bg-gray-100"
                    >
                      Account Settings
                    </Link>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full block px-5 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white text-black absolute top-full left-0 w-full shadow-lg p-6 flex flex-col gap-5">
          <Link
            to="/dormdrop/sublease/new"
            className="bg-[#007AFF] text-white font-semibold py-3 px-5 rounded-full text-center"
          >
            List Your Space
          </Link>
        </div>
      )}
    </header>
  );
};

export default DormdropNavBar;
