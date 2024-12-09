"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import api from "@/lib/api";
import { setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const login = useCallback(async (username: string, password: string) => {
    const response = await api.post("/login/", { username, password });
    setUser(response.data);

    // Set the `isAuthenticated` cookie
    setCookie(null, "isAuthenticated", "true", { path: "/", maxAge: 7 * 24 * 60 * 60 });
    localStorage.setItem("authToken", response.data.token);

    router.replace("/dashboard");
  }, [router]);

  const logout = useCallback(async () => {
    try {
      await api.post("/logout/");
    } catch (error) {
      console.error("Error during logout:", error); // Log error but continue clearing session
    } finally {
      setUser(null);
      destroyCookie(null, "isAuthenticated", { path: "/" });
      localStorage.removeItem("authToken");

      router.replace("/login");
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
