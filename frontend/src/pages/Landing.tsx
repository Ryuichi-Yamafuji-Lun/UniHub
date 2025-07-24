import { useNewestSubleases } from "@/hooks/useNewestSubleases";
import Hero from "@/sections/landing/Hero";
import NewestSubleaseCarousel from "@/sections/landing/listings/NewestSubleaseCarasoul";

const Landing = () => {
  const { data: subleases, loading } = useNewestSubleases();

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Listings */}
      <div className="relative z-20 bg-[#E2E6E6]">
        {loading ? (
          // Use the correct skeleton component that you built
          <NewestSubleaseCarousel.Skeleton />
        ) : (
          <NewestSubleaseCarousel subleases={subleases} />
        )}
      </div>
    </>
  );
};

export default Landing;