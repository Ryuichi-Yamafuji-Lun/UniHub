import { Link } from "react-router-dom";
import HeroImage from "@/apps/dormdrop/assets/dormdrop-hero.png";

const DormDropHero = () => {
  return (
    <section className="relative w-full overflow-hidden py-10">
      <div className="relative min-h-[90vh] w-full rounded-[40px] overflow-hidden flex flex-col justify-center md:flex-row items-center">
        {/* Background image */}
        <img
          src={HeroImage}
          alt="USC Subleasing with DormDrop"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-6 py-12 md:py-0 text-white text-center md:text-left space-y-6 md:space-y-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-lg">
            Subleasing Reimagined
          </h1>

          <p className="text-lg sm:text-xl font-medium drop-shadow-md">
            DormDrop makes it{" "}
            <span className="italic font-semibold">effortless</span> for USC students to find or post trusted subleases.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-white text-[#084479] rounded-xl font-semibold hover:bg-[#06345d] hover:text-white transition"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 border border-white text-white rounded-xl font-semibold hover:bg-[#084479] transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DormDropHero;