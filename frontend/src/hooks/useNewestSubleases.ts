import { useEffect, useState } from "react";
import api from "@/lib/axios";
import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";

export const useNewestSubleases = () => {
  const [data, setData] = useState<SubleaseResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/api/v1/public/subleases/newest?limit=8");
        setData(res.data ?? []);
      } catch (error) {
        console.error("Error fetching newest subleases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { data, loading };
};