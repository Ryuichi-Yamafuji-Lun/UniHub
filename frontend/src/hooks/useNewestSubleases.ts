import { useEffect, useState } from "react";
import api from "@/lib/axios";
import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";

export const useNewestSubleases = () => {
  const [data, setData] = useState<SubleaseResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const startTime = Date.now();

      try {
        const res = await api.get("/api/v1/public/subleases/newest?limit=8");
        setData(res.data ?? []);
      } catch (error) {
        console.error("Error fetching newest subleases:", error);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const minDuration = 1000; 
        const remainingTime = minDuration - elapsedTime;

        if (remainingTime > 0) {
          setTimeout(() => {
            setLoading(false);
          }, remainingTime);
        } else {
          setLoading(false);
        }
      }
    };

    fetch();
  }, []);

  return { data, loading };
};