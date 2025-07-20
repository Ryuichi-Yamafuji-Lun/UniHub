import { useEffect, useState } from "react";
import Carousel from "@/sections/landing/listings/Carousel";
import SubleaseCard from "@/apps/dormdrop/components/ui/SubleaseCard";
import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";
import api from "@/lib/axios";

const NewestSubleaseCarousel = () => {
  const [subleases, setSubleases] = useState<SubleaseResponse[]>([]);

  useEffect(() => {
    const fetchNewest = async () => {
      try {
        const response = await api.get("/api/v1/public/subleases/newest?limit=8");
        setSubleases(response.data ?? []);
      } catch (error) {
        console.error("Failed to fetch newest subleases:", error);
        setSubleases([]);
      }
    };

    fetchNewest();
  }, []);

  return (
    <section className="px-4 max-w-7xl mx-auto">
      <Carousel
        title="Newest Subleases"
        listings={subleases}
        renderCard={(item) => (
          <SubleaseCard key={item.id} sublease={item} />
        )}
        link="/dormdrop/listings"
      />
    </section>
  );
};

export default NewestSubleaseCarousel;