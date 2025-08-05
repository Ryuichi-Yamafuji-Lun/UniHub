import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SubleaseCarouselMobileProps<T> = {
  title: string;
  listings: T[];
  renderCard: (item: T) => React.ReactNode;
  link?: string;
};

export default function SubleaseCarouselMobile<T>({
  title,
  listings,
  renderCard,
  link,
}: SubleaseCarouselMobileProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.querySelector("[data-card]") as HTMLElement;
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = parseInt(getComputedStyle(container).gap || "0", 10);
    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full px-4 py-10 sm:hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        {link ? (
          <Link
            to={link}
            className="flex items-center gap-1 text-xl font-bold text-[#1E1E1E] hover:underline group transition"
          >
            {title}
          </Link>
        ) : (
          <h2 className="text-xl font-semibold text-[#1E1E1E]">{title}</h2>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="bg-white border border-gray-200 shadow p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-white border border-gray-200 shadow p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards */}
      {listings.length === 0 ? (
        <div className="w-full py-10 text-center text-gray-500 text-base border border-dashed border-gray-300 rounded-md bg-gray-50">
          No listings available right now.
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {listings.map((item, idx) => (
            <div
              key={idx}
              data-card
              className="min-w-[90%] max-w-[90%] flex-shrink-0 snap-center"
            >
              {renderCard(item)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}