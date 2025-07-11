import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps<T> = {
  title: string;
  listings: T[];
  renderCard: (item: T) => React.ReactNode;
  link?: string;
};

export default function Carousel<T>({
  title,
  listings,
  renderCard,
  link,
}: CarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const scrollAmount = 340;
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full px-6 py-8">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        {link ? (
          <Link to={link} className="flex items-center gap-1 group">
            <h2 className="text-2xl font-bold">
              {title}
            </h2>
            <ChevronRight className="w-5 h-5" strokeWidth={3} />
          </Link>
        ) : (
          <h2 className="text-2xl font-semibold">{title}</h2>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="bg-white shadow p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-white shadow p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 scrollbar-hide"
      >
        {listings.map((item, idx) => (
          <div
            key={idx}
            className="min-w-[300px] max-w-[300px] flex-shrink-0 snap-start"
          >
            {renderCard(item)}
          </div>
        ))}
      </div>
    </section>
  );
}