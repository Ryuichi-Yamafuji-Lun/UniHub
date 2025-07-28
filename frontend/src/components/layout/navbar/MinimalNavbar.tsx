import { Link } from "react-router-dom";
import UniHubLogo from "@/assets/UniHubLogo.png";

const MinimalNavBar = () => {
  return (
    <header className="w-full z-50 fixed top-0 left-0">
      <div className="px-6 py-3 flex items-center justify-start h-20">
        <Link to="/" className="flex items-center space-x-3 h-full">
          <img src={UniHubLogo} alt="UniHub Logo" className="h-12 w-auto object-contain" />
        </Link>
      </div>
    </header>
  );
};

export default MinimalNavBar;