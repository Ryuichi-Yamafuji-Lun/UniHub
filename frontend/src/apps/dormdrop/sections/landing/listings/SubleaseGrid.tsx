import { Link } from "react-router-dom";

type SubleaseGridProps<T> = {
  title: string;
  listings: T[];
  renderCard: (item: T) => React.ReactNode;
  link?: string;
};

export default function SubleaseGrid<T>({
  title,
  listings,
  renderCard,
  link,
}: SubleaseGridProps<T>) {
  // show only first 4 items
  const visibleListings = listings.slice(0, 4);

  return (
    <section className="relative w-full px-4 py-10 hidden sm:block">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {link ? (
          <Link
            to={link}
            className="flex items-center gap-1 text-2xl font-bold text-[#1E1E1E] hover:underline group transition"
          >
            {title}
          </Link>
        ) : (
          <h2 className="text-2xl font-semibold text-[#1E1E1E]">{title}</h2>
        )}
      </div>

      {/* Cards */}
      {visibleListings.length === 0 ? (
        <div className="w-full py-12 text-center text-gray-500 text-base border border-dashed border-gray-300 rounded-md bg-gray-50">
          No listings available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleListings.map((item, idx) => (
            <div key={idx}>{renderCard(item)}</div>
          ))}
        </div>
      )}
    </section>
  );
}