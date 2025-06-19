import About from "@/sections/landing/About";
import Hero from "@/sections/landing/Hero"; 
import Products from "@/sections/landing/Product";
import WhyUnihub from "@/sections/landing/WhyUniHub";

const Landing = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      {/* Products Section */}
      <Products />
      {/* WhyUnihub Section */}
      <WhyUnihub />
      {/* About Section */}
      <About />
    </>
  );
};

export default Landing;