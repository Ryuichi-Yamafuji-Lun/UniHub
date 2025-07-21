import { useEffect, useState } from "react";
import Carousel from "@/sections/landing/listings/Carousel";
import SubleaseCard from "@/apps/dormdrop/components/ui/SubleaseCard";
import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";
import api from "@/lib/axios";

const MySubleaseCarousel = () => {
  const [subleases, setSubleases] = useState<SubleaseResponse[]>([]);

  useEffect(() => {
    const fetchNewest = async () => {
      try {
        const response = await api.get("api/v1/owner/accounts/me/subleases?limit=4");
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
        title="My Subleases"
        listings={subleases}
        renderCard={(item) => (
          <SubleaseCard key={item.id} sublease={item} />
        )}
        link="/account/me/sublease"
      />
    </section>
  );
};

export default MySubleaseCarousel;