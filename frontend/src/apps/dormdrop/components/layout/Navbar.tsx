import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser, FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const NavBar = () => {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubleaseOpen, setIsSubleaseOpen] = useState(false);
  const navigate = useNavigate();
  const subleaseMenuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - scrollY) > 10) {
        setScrollDirection(currentScrollY > scrollY ? "down" : "up");
        setScrollY(currentScrollY);
      }
    };

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subleaseMenuRef.current &&
        !subleaseMenuRef.current.contains(event.target as Node)
      ) {
        setIsSubleaseOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Helper function to get login URL with current page as redirect
  const getLoginUrl = () => {
    const currentPath = location.pathname + location.search + location.hash;
    return `/login?redirect=${encodeURIComponent(currentPath)}`;
  };

  return (
    <header className="w-full z-50 sticky top-0 left-0">
      <div
        className={`transition-transform duration-300 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Top Bar */}
        <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">
            <Link to="/">Unihub</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            {!isLoggedIn ? (
              <>
                <Link to={getLoginUrl()} className="hover:underline whitespace-nowrap">Login</Link>
                <Link to="/signup" className="hover:underline whitespace-nowrap">Signup</Link>
              </>
            ) : (
              <>
                <Link to="/account/me" className="hover:underline flex items-center space-x-1">
                  <FiUser />
                  <span>Account</span>
                </Link>
                <button onClick={handleLogout} className="hover:underline text-left whitespace-nowrap">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="bg-black text-white flex flex-col px-4 py-4 space-y-3 md:hidden">
            {!isLoggedIn ? (
              <>
                <Link to={getLoginUrl()} onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
              </>
            ) : (
              <>
                <Link to="/account/me" onClick={() => setMenuOpen(false)}>Account</Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
              </>
            )}
            <hr className="border-gray-600 my-2" />

            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline">Home</Link>

            <div>
              <p className="font-semibold text-gray-400 mt-2 mb-1">Sublease</p>
              <div className="flex flex-col space-y-3">
                <Link to="/dormdrop" onClick={() => setMenuOpen(false)} className="hover:underline">DormDrop</Link>
                <Link to="/dormdrop/sublease" onClick={() => setMenuOpen(false)} className="hover:underline">Search Subleases</Link>
                <Link to="/account/me/sublease" onClick={() => setMenuOpen(false)} className="hover:underline">My Subleases</Link>
                <Link to="/dormdrop/sublease/new" onClick={() => setMenuOpen(false)} className="hover:underline">Create Sublease</Link>
              </div>
            </div>

            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline mt-2">Furniture (soon)</Link>
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline">Books (soon)</Link>
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline">Tutoring (soon)</Link>
          </div>
        )}
      </div>

      {/* Bottom Links */}
      <div
        className={`bg-[#fef6e4] px-6 py-2 text-sm font-medium text-black transition-opacity duration-300 hidden md:flex ${
          scrollY <= 10 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ position: "relative", zIndex: 50, gap: "1.5rem" }}
      >
        <Link to="/" className="hover:underline">Home</Link>

        {/* Sublease Dropdown */}
        <div className="relative" ref={subleaseMenuRef}>
          <button
            onClick={() => setIsSubleaseOpen(!isSubleaseOpen)}
            className="hover:underline flex items-center gap-1"
            aria-haspopup="true"
            aria-expanded={isSubleaseOpen}
          >
            Sublease
            <FiChevronDown
              className={`transition-transform duration-200 ${
                isSubleaseOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          <div
            className={`absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg transition-all duration-200 origin-top transform ${
              isSubleaseOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <Link
              to="/dormdrop"
              onClick={() => setIsSubleaseOpen(false)}
              className="block px-5 py-2 text-sm text-gray-700 hover:bg-[#fef6e4] hover:text-black rounded-md"
            >
              DormDrop
            </Link>
            <Link
              to="/dormdrop/sublease"
              onClick={() => setIsSubleaseOpen(false)}
              className="block px-5 py-2 text-sm text-gray-700 hover:bg-[#fef6e4] hover:text-black rounded-md"
            >
              Search Subleases
            </Link>
            <Link
              to="/account/me/sublease"
              onClick={() => setIsSubleaseOpen(false)}
              className="block px-5 py-2 text-sm text-gray-700 hover:bg-[#fef6e4] hover:text-black rounded-md"
            >
              My Subleases
            </Link>
            <Link
              to="/dormdrop/sublease/new"
              onClick={() => setIsSubleaseOpen(false)}
              className="block px-5 py-2 text-sm text-gray-700 hover:bg-[#fef6e4] hover:text-black rounded-md"
            >
              Create Sublease
            </Link>
          </div>
        </div>

        {/* <Link to="/" className="hover:underline">Furniture (soon)</Link>
        <Link to="/" className="hover:underline">Books (soon)</Link>
        <Link to="/" className="hover:underline">Tutoring (soon)</Link> */}
      </div>
    </header>
  );
};

export default NavBar;