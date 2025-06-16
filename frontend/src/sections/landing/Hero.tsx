import { Link } from "react-router-dom";
import UniHubLogo from "@/assets/UniHubLogo.png";

export default function Hero() {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        {/* Text Block */}
        <div className="text-center md:text-left max-w-xl md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Created by Students. For Students.
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            UniHub helps students sublease, buy, and sell safely across campus communities — starting with DormDrop, our trusted subleasing tool.
          </p>
          <Link
            to="/dormdrop"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Explore DormDrop
          </Link>
        </div>

        {/* UniHub Logo */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src={UniHubLogo}
            alt="Unihub Logo"
            className="w-64 h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}