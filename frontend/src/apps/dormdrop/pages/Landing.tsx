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
          <section className="px-4 max-w-7xl mx-auto py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-64 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </section>
        ) : (
          <NewestSubleaseCarousel subleases={subleases} />
        )}
      </div>
    </>
  );
};

export default Landing;