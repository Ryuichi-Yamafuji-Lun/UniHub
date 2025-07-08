import { Link } from "react-router-dom";
import HeroBg from "@/apps/dormdrop/assets/dormdrop-hero.png"; // Make sure it's more "banner-style"

export default function UniHubHero() {
  return (
    <section className="relative w-full bg-[#fdf5f0] overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 py-12">
        
        {/* Text Content */}
        <div className="max-w-xl space-y-6 md:space-y-8 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111] leading-tight">
            Created by Students. <br /> For Students.
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            UniHub helps students sublease, buy, and sell safely across campus communities — starting with DormDrop.
          </p>
          <div>
            <Link
              to="/dormdrop"
              className="inline-block bg-[#084479] text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-[#084479] border border-[#084479] transition"
            >
              Explore DormDrop
            </Link>
          </div>
        </div>

        {/* Image Content */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <img
            src={HeroBg}
            alt="Students using UniHub"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}