// src/components/layout/MinimalNavBar.tsx
import { Link } from "react-router-dom";
import UniHubLogo from "@/assets/UniHubLogo.png";

const MinimalNavBar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      <nav className="w-full h-20 px-6 md:px-10 flex items-center justify-start">
        <div className="flex items-center space-x-3 h-full">
          <Link to="/">
            <img src={UniHubLogo} alt="Unihub Logo" className="h-16 w-auto" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default MinimalNavBar;