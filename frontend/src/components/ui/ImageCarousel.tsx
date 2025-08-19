import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
  images: string[];
  altText: string;
}

export const ImageCarousel: React.FC<Props> = ({ images, altText }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div className="relative flex-grow-0 flex-shrink-0 w-full" key={index}>
              <img
                src={src}
                alt={`${altText} - ${index + 1}`}
                className="w-full h-80 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white focus:outline-none"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white focus:outline-none"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};