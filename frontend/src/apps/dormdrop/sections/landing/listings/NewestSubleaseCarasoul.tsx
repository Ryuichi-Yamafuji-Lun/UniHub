import ResponsiveListingView from "@/apps/dormdrop/components/ui/ResponsiveListingView"; 
import SubleaseCard from "@/apps/dormdrop/components/ui/SubleaseCard";
import SkeletonCard from "@/apps/dormdrop/components/ui/SkeletonCard";
import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";

type Props = {
  subleases: SubleaseResponse[];
};

const NewestSubleaseCarousel = ({ subleases }: Props) => {
  return (
    <section className="px-4 max-w-7xl mx-auto">
      <ResponsiveListingView
        title="Newest Subleases"
        listings={subleases}
        renderCard={(item) => <SubleaseCard key={item.id} sublease={item} />}
        link="/dormdrop/sublease" 
      />
    </section>
  );
};

const NewestSubleaseCarouselSkeleton = () => {
  return (
    <section className="px-4 max-w-7xl mx-auto">
       <div className="w-full px-4 py-10">
        {/* Header Placeholder */}
        <div className="flex justify-between items-center mb-6 animate-pulse">
          <div className="h-8 w-48 bg-gray-300 rounded" />
        </div>
        
        {/* Desktop Skeleton */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)}
        </div>
        
        {/* Mobile Skeleton */}
        <div className="block sm:hidden">
            <SkeletonCard />
            <div className="flex justify-center items-center gap-2 mt-4">
                <div className="h-2 w-2 bg-gray-300 rounded-full" />
                <div className="h-2 w-2 bg-gray-300 rounded-full" />
                <div className="h-2 w-2 bg-gray-300 rounded-full" />
                <div className="h-2 w-2 bg-gray-300 rounded-full" />
            </div>
        </div>
       </div>
    </section>
  );
};

NewestSubleaseCarousel.Skeleton = NewestSubleaseCarouselSkeleton;

export default NewestSubleaseCarousel;