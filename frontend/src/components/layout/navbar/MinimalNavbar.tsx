// src/components/layout/MinimalNavBar.tsx
import { Link } from "react-router-dom";
import UniHubLogo from "@/assets/UniHubLogo.png";

const MinimalNavBar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50">
      <nav className="px-4 py-3 flex items-center justify-start h-[64px]">
        <Link to="/" className="flex items-center space-x-3">
          <img src={UniHubLogo} alt="Unihub Logo" className="h-16 w-auto" />
        </Link>
      </nav>
    </header>
  );
};

export default MinimalNavBar;