import { Link } from "react-router-dom";
import HeroBg from "@/apps/dormdrop/assets/dormdrop-hero.png";

export default function UniHubHero() {
  return (
    <section className="relative w-full overflow-hidden py-10">
      <div className="relative min-h-[90vh] w-full rounded-[40px] overflow-hidden flex flex-col justify-center md:flex-row items-center">
        {/* Background image */}
        <img
          src={HeroBg}
          alt="Students using UniHub"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Optional overlay if needed */}
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* Content block */}
        <div className="relative z-10 max-w-3xl px-6 py-12 md:py-0 text-white text-center md:text-left space-y-6 md:space-y-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-lg">
            Created by Students. <br />
            For Students.
          </h1>
          <p className="text-lg sm:text-xl font-medium drop-shadow-md">
            UniHub helps students sublease, buy, and sell safely across campus communities — starting with DormDrop.
          </p>
          <div>
            <Link
              to="/dormdrop"
              className="inline-block bg-white text-[#084479] px-6 py-3 rounded-md font-semibold hover:bg-[#084479] hover:text-white transition"
            >
              Explore DormDrop
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
