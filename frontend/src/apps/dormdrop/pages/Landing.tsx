import DormDropLandingHero from "@/apps/dormdrop/sections/landing/Hero";
import NewestSubleaseCarousel from "@/apps/dormdrop/sections/landing/listings/NewestSubleaseCarasoul";

const Landing = () => {
  return (
    <>
      {/* Hero Section */}
      <DormDropLandingHero />

      {/* Listings */}
      <div className="relative z-20 bg-[#E2E6E6]">
        <NewestSubleaseCarousel />
      </div>
    </>
  );
};

export default Landing;
