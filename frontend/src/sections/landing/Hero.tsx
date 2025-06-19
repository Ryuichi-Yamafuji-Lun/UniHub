import { Link } from "react-router-dom";
import UniHubLogo from "@/assets/UniHubLogo.png";
import HeroBg from "@/assets/UniHubLogo.png"; // your actual background image here

export default function UniHubHero() {
  return (
    <section
      className="relative bg-cover bg-center rounded-3xl overflow-hidden px-6 md:px-12 lg:px-24 py-20"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-60 backdrop-blur-sm z-0 rounded-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        {/* Text Block */}
        <div className="text-center md:text-left max-w-xl md:w-1/2">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Created by Students. For Students.
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6 font-medium">
            UniHub helps students sublease, buy, and sell safely across campus communities — starting with DormDrop, our trusted subleasing tool.
          </p>
          <Link
            to="/dormdrop"
            className="inline-block bg-[#084479] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#06345d] transition"
          >
            Explore DormDrop
          </Link>
        </div>

        {/* Logo / Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src={UniHubLogo}
            alt="UniHub Logo"
            className="w-64 h-auto object-contain rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
}