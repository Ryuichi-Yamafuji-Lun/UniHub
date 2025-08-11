//import HeroBg from "@/apps/dormdrop/assets/dormdrop-hero.png";
//import { FiSearch } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-blue-50 w-full">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center">
        
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Your Campus, <span className="text-blue-600">Connected.</span>
        </h1>

        {/* Subheading */}
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          The all-in-one marketplace created for students, by students. Find subleases, sell furniture, and discover everything you need for university life.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="/dormdrop"
            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-transform hover:scale-105"
          >
            Explore Subleases
          </a>
          {/* <a
            href="#categories"
            className="font-semibold py-3 px-8 text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-transform hover:scale-105"
          >
            Learn More
          </a> */}
        </div>

      </div>
    </section>
  );
}