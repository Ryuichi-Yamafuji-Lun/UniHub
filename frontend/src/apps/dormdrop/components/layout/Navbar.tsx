import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMenu, FiX } from "react-icons/fi";

const NavBar = () => {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="w-full z-50 sticky top-0 left-0">
      {/* Sticky container with top nav + mobile menu */}
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

          {/* Desktop Auth Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="hover:underline whitespace-nowrap">Login</Link>
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

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="bg-black text-white flex flex-col px-4 py-4 space-y-3 md:hidden">
            {/* Auth Links */}
            {!isLoggedIn ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
              </>
            ) : (
              <>
                <Link to="/account/me" onClick={() => setMenuOpen(false)}>Account</Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
              </>
            )}

            <hr className="border-gray-600 my-2" />

            {/* Category Links */}
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline">Home</Link>
            <Link to="/dormdrop" onClick={() => setMenuOpen(false)} className="hover:underline">Sublease</Link>
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline">Furniture (soon)</Link>
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline">Books (soon)</Link>
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline">Tutoring (soon)</Link>
          </div>
        )}
      </div>

      {/* Bottom Category Links (Desktop Only) */}
      <div
        className={`bg-[#fef6e4] px-6 py-2 space-x-6 text-sm font-medium text-black overflow-x-auto transition-opacity duration-300 hidden md:flex ${
          scrollY <= 10 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/dormdrop" className="hover:underline">Sublease</Link>
        <Link to="/" className="hover:underline">Furniture (soon)</Link>
        <Link to="/" className="hover:underline">Books (soon)</Link>
        <Link to="/" className="hover:underline">Tutoring (soon)</Link>
      </div>
    </header>
  );
};

export default NavBar;