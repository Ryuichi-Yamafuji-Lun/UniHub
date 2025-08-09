import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useUserProfile } from "@/hooks/useUserProfile";

const DormdropLandingNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const location = useLocation();
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const { data: account } = useUserProfile();
  const isLoggedIn = !!account;

  // --- Event Listeners ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close profile menu if click is outside
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
      // Close mobile menu if click is outside
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        // Also check if the menu button itself was clicked to avoid immediate re-opening
        const menuButton = document.getElementById('mobile-menu-button');
        if (menuButton && !menuButton.contains(event.target as Node)) {
          setMenuOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfileMenuOpen(false);
    setMenuOpen(false);
    window.location.reload();
  };

  const getLoginUrl = () => {
    const currentPath = location.pathname + location.search + location.hash;
    if (currentPath.startsWith('/login') || currentPath.startsWith('/signup')) {
      return '/login';
    }
    return `/login?redirect=${encodeURIComponent(currentPath)}`;
  };

  const navBarClass = `
    w-full fixed top-0 left-0 z-50 transition-all duration-300
    ${isScrolled || menuOpen ? "bg-white shadow-md" : "bg-transparent"}
  `;
  const navBarTextColor = isScrolled || menuOpen ? "text-black" : "text-white";

  return (
    <header className={navBarClass} ref={mobileMenuRef}>
      <div className={`mx-auto px-6 py-4 flex justify-between items-center ${navBarTextColor}`}>
        {/* Left Side: Logo */}
        <div className="text-2xl font-bold tracking-tight">
          <Link to="/dormdrop">Dormdrop</Link>
        </div>

        {/* Center: Desktop Links (can be populated later) */}
        <nav className="hidden md:flex items-center gap-6 font-medium"></nav>

        {/* Right Side: Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/dormdrop/sublease/new" className={`font-semibold py-2 px-4 rounded-full transition-colors border-2 ${isScrolled ? "text-primary-actions hover:bg-blue-50" : "text-white border-white hover:bg-white hover:text-primary-actions"}`}>
            List Your Space
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to={getLoginUrl()} className="font-semibold hover:text-primary-actions">Login</Link>
              <Link to="/signup" className="bg-[#007AFF] text-white font-semibold py-2 px-5 rounded-full hover:bg-blue-600 transition-colors">Signup</Link>
            </>
          ) : (
            <div className="relative" ref={profileMenuRef}>
              <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="flex items-center gap-2">
                <img src={account?.profilePicture || `https://ui-avatars.com/api/?name=${account?.firstName}+${account?.lastName}&background=random`} alt="Profile" className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover" />
                <FiChevronDown size={20} className={`transition-transform ${profileMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-lg text-black overflow-hidden">
                  <div className="p-4 border-b">
                    <p className="font-bold truncate">{account?.username}</p>
                    <p className="text-sm text-gray-500 truncate">{account?.email}</p>
                  </div>
                  <div className="py-2">
                    <Link to="/account/me/sublease" className="block px-5 py-2 text-sm hover:bg-gray-100">My Listings</Link>
                    <Link to="/account/me" className="block px-5 py-2 text-sm hover:bg-gray-100">Account Settings</Link>
                  </div>
                  <div className="p-2 border-t">
                    <button onClick={handleLogout} className="w-full text-left block px-5 py-2 text-sm hover:bg-gray-100 rounded-md text-red-600">Logout</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button id="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white text-black absolute top-full left-0 w-full shadow-lg p-6 flex flex-col gap-4 border-t border-gray-200">
          <Link to="/dormdrop/sublease/new" className="border-2 border-primary-actions text-primary-actions font-semibold py-3 px-5 rounded-full text-center hover:bg-blue-50 transition-colors">
            List Your Space
          </Link>
          <hr/>
          {isLoggedIn ? (
            <>
              <div className="flex flex-col items-center gap-2 text-center">
                <img src={account?.profilePicture || `https://ui-avatars.com/api/?name=${account?.firstName}+${account?.lastName}&background=random`} alt="Profile" className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover" />
                <div>
                  <p className="font-bold truncate">{account?.username}</p>
                  <p className="text-sm text-gray-500 truncate">{account?.email}</p>
                </div>
              </div>
              <Link to="/account/me/sublease" className="font-medium text-center hover:text-primary-actions">My Listings</Link>
              <Link to="/account/me" className="font-medium text-center hover:text-primary-actions">Account Settings</Link>
              <button onClick={handleLogout} className="text-center font-medium text-red-600 hover:text-red-800">Logout</button>
            </>
          ) : (
            <>
              <Link to={getLoginUrl()} className="font-medium text-center hover:text-primary-actions">Login</Link>
              <Link to="/signup" className="bg-[#007AFF] text-white font-semibold py-3 px-5 rounded-full text-center hover:bg-blue-600 transition-colors">
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default DormdropLandingNavBar;