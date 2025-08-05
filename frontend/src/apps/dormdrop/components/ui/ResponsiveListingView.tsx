import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

type ResponsiveListingViewProps<T> = {
  title: string;
  listings: T[];
  renderCard: (item: T) => React.ReactNode;
  link?: string;
};

export default function ResponsiveListingView<T>({
  title,
  listings,
  renderCard,
  link,
}: ResponsiveListingViewProps<T>) {
  // We'll show a max of 4 listings in this component
  const visibleListings = listings.slice(0, 4);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to handle dot clicks
  const handleDotClick = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[index] as HTMLElement;
    if (card) {
      container.scrollTo({
        left: card.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  // Effect to update active dot on scroll (for user swiping)
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const newIndex = Math.round(scrollLeft / offsetWidth);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };
    const element = scrollRef.current;
    element?.addEventListener("scroll", handleScroll, { passive: true });
    return () => element?.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  return (
    <section className="w-full px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1E1E1E]">
          {link ? <Link to={link} className="hover:underline">{title}</Link> : title}
        </h2>
      </div>
      
      {/* --- Desktop: Responsive Grid (Hidden on mobile) --- */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleListings.map((item, idx) => (
          <div key={idx}>{renderCard(item)}</div>
        ))}
      </div>

      {/* --- Mobile: Carousel (Visible only on mobile) --- */}
      <div className="block sm:hidden">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {visibleListings.map((item, idx) => (
            <div
              key={idx}
              className="w-full flex-shrink-0 snap-center"
            >
              {renderCard(item)}
            </div>
          ))}
        </div>
        
        {/* Dot Indicators */}
        {visibleListings.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            {visibleListings.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 w-2 rounded-full transition-colors ${
                  activeIndex === idx ? 'bg-[#007AFF]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Empty State */}
      {visibleListings.length === 0 && (
         <div className="w-full py-12 text-center text-gray-500 text-base border border-dashed border-gray-300 rounded-md bg-gray-50">
           No listings available right now.
         </div>
      )}
    </section>
  );
}