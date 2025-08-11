import { useNewestSubleases } from "@/hooks/useNewestSubleases";
import Hero from "@/sections/landing/Hero";
import Product from "@/sections/landing/Product";
import About from "@/sections/landing/About";
import NewestSubleaseCarousel from "@/sections/landing/listings/NewestSubleaseCarasoul";

const Landing = () => {
  const { data: subleases, loading } = useNewestSubleases();

  return (
    <div className="bg-gray-50">
      <Hero />
      <Product />

      {/* Featured Listings Section */}
      <div className="bg-white">
        {loading ? (
          <NewestSubleaseCarousel.Skeleton />
        ) : (
          <NewestSubleaseCarousel subleases={subleases} />
        )}
      </div>
      
      <About />
    </div>
  );
};

export default Landing;