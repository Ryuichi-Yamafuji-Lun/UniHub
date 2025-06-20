import { Link } from "react-router-dom";
import HeroImage from "@/apps/dormdrop/assets/dormdrop-hero.png";

const DormDropHero = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center rounded-3xl overflow-hidden"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm z-10 rounded-3xl" />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 py-28 text-left">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
          Subleasing Reimagined
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-white font-medium max-w-xl drop-shadow-sm">
          DormDrop makes it{" "}
          <span className="italic font-semibold">effortless</span> for USC students to find or post trusted subleases.
        </p>

        <div className="mt-8 flex gap-4 flex-wrap">
          <Link
            to="/signup"
            className="px-6 py-3 bg-white text-[#084479] rounded-xl font-semibold hover:bg-[#06345d] hover:text-white not-[]:transition"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 border border-white text-white rounded-xl font-semibold hover:bg-[#084479] hover:text-white transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DormDropHero;