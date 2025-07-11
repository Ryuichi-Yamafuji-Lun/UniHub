import HeroBg from "@/apps/dormdrop/assets/dormdrop-hero.png";

export default function HeroSection() {
  return (
    <section className="relative bg-[#0B4B86] text-white h-[600px] overflow-hidden pb-[200px]">
      {/* Top Centered Content */}
      <div className="pt-24 flex justify-center relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-x-6 max-w-5xl px-6">
          {/* Text */}
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">
              Created For Students
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold">
              By Students
            </h2>
          </div>

          {/* Image */}
          <div className="mt-6 md:mt-0">
            <img
              src={HeroBg}
              alt="Hero graphic"
              className="w-[220px] md:w-[300px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bottom fade (fades into white) */}
      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-b from-transparent to-[#E2E6E6] z-0" />
    </section>
  );
}