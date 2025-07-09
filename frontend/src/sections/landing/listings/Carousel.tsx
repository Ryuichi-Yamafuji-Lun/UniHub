import { useRef } from "react";
import { Link } from "react-router-dom";

type CarouselProps<T> = {
  title: string;
  listings: T[];
  renderCard: (item: T) => React.ReactNode;
  seeAllLink?: string;
};

export default function Carousel<T>({
  title,
  listings,
  renderCard,
  seeAllLink,
}: CarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 260;

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="my-8 px-4 relative">
      {/* Title and optional See All */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        {seeAllLink && (
          <Link
            to={seeAllLink}
            className="text-sm text-blue-600 hover:underline"
          >
            See all
          </Link>
        )}
      </div>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        aria-label="Scroll Left"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        aria-label="Scroll Right"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
      >
        ›
      </button>

      {/* Scrollable Cards Container */}
      <div
        ref={containerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {listings.map((item, index) => (
          <div key={index} className="min-w-[250px] flex-shrink-0 snap-start">
            {renderCard(item)}
          </div>
        ))}
      </div>
    </section>
  );
}