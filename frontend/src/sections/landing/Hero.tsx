import HeroBg from "@/apps/dormdrop/assets/dormdrop-hero.png";

export default function HeroSection() {
  return (
    <section className="bg-[#fef6e4] w-full py-5 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
            Created For Students <br /> By Students
          </h1>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src={HeroBg}
            alt="Student on laptop"
            className="w-full max-w-md mx-auto md:mx-0 object-contain rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}