// src/hooks/useUser.ts
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

export const useUser = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get("/user-profiles/me/");
        setUser(data);
      } catch (error: any) {
        if (error.response && error.response.status === 403) {
          console.error("Authorization failed: You do not have access to this resource.");
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUser();
  }, []);

  return { user };
};
