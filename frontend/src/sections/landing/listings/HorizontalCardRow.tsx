import { Link } from "react-router-dom";

type HorizontalCardRowProps<T> = {
  title: string;
  listings: T[];
  renderCard: (item: T) => React.ReactNode;
  seeAllLink?: string;
};

export default function HorizontalCardRow<T>({
  title,
  listings,
  renderCard,
  seeAllLink,
}: HorizontalCardRowProps<T>) {
  return (
    <section className="my-8 px-4">
      {/* Row Title and Optional See All Link */}
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

      {/* Horizontal Scrollable Cards */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {listings.map((item, index) => (
          <div key={index} className="min-w-[250px] flex-shrink-0">
            {renderCard(item)}
          </div>
        ))}
      </div>
    </section>
  );
}