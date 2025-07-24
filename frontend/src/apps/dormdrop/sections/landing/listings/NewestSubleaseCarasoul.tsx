import Carousel from "@/apps/dormdrop/sections/landing/listings/Carousel";
import SubleaseCard from "@/apps/dormdrop/components/ui/SubleaseCard";
import SkeletonCard from "@/apps/dormdrop/components/ui/SkeletonCard";
import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";

type Props = {
  subleases: SubleaseResponse[];
};

const NewestSubleaseCarousel = ({ subleases }: Props) => {
  return (
    <section className="px-4 max-w-7xl mx-auto">
      <Carousel
        title="Newest Subleases"
        listings={subleases}
        renderCard={(item) => <SubleaseCard key={item.id} sublease={item} />}
        link="/dormdrop/sublease"
      />
    </section>
  );
};

// Skeleton Component for the Carousel
const NewestSubleaseCarouselSkeleton = () => {
  return (
    <section className="px-4 max-w-7xl mx-auto">
      <div className="relative w-full px-4 py-10">
        {/* Header Placeholder */}
        <div className="flex justify-between items-center mb-4 animate-pulse">
          <div className="h-7 w-48 bg-gray-300 rounded" />
          <div className="flex gap-2">
            <div className="bg-gray-300 rounded-full w-9 h-9" />
            <div className="bg-gray-300 rounded-full w-9 h-9" />
          </div>
        </div>

        {/* Cards Placeholder */}
        <div className="flex gap-2 overflow-x-hidden">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="w-[250px] flex-shrink-0 snap-start">
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

NewestSubleaseCarousel.Skeleton = NewestSubleaseCarouselSkeleton;

export default NewestSubleaseCarousel;