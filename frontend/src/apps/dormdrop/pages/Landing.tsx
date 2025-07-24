import { useNewestSubleases } from "@/apps/dormdrop/hooks/useNewestSubleases";
import DormDropLandingHero from "@/apps/dormdrop/sections/landing/Hero";
import NewestSubleaseCarousel from "@/apps/dormdrop/sections/landing/listings/NewestSubleaseCarasoul"; 

const Landing = () => {
  const { data: subleases, loading } = useNewestSubleases();

  return (
    <>
      {/* Hero Section */}
      <DormDropLandingHero />

      {/* Listings */}
      <div className="relative z-20 bg-[#E2E6E6]">
        {loading ? (
          <NewestSubleaseCarousel.Skeleton />
        ) : (
          <NewestSubleaseCarousel subleases={subleases} />
        )}
      </div>
    </>
  );
};

export default Landing;