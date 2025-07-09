import Hero from "@/sections/landing/Hero"; 
import NewestSubleaseCarousel from "@/sections/landing/listings/NewestSubleaseCarasoul";

const Landing = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      {/* Listings */}

      <div className="-mt-30 relative z-20">
        <NewestSubleaseCarousel />
      </div>
    </>
  );
};

export default Landing;