import { useEffect, useState } from "react";
import api from "@/lib/axios";
import type { UserAccount } from "@/types/UserAccount";

export const useUserProfile = () => {
  const [data, setData] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/api/v2/user/account/me");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { data, loading };
};