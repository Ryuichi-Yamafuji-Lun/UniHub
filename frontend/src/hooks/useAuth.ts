import { useEffect, useState } from "react";
import api from "@/lib/axios"; 

export function useAuth() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/v2/user/account/me");
        setUser(res.data);
      } catch (error) {
        console.log("Failed to authenitcate:", error);
        setUser(null);
      } finally {
        setChecked(true);
      }
    };

    checkAuth();
  }, []);

  return { user, checked, isLoggedIn: !!user };
}