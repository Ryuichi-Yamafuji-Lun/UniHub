import { useEffect, useState } from "react";
import api from "@/lib/axios";
import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";

export const useMySubleases = () => {
  const [data, setData] = useState<SubleaseResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("api/v1/owner/accounts/me/subleases?limit=4");
        setData(res.data ?? []);
      } catch (error) {
        console.error("Error fetching subleases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { data, loading };
};