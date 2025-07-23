import Carousel from "@/sections/landing/listings/Carousel";
import SubleaseCard from "@/apps/dormdrop/components/ui/SubleaseCard";
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

export default NewestSubleaseCarousel;