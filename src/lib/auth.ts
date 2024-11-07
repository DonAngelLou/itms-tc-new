// src/lib/auth.ts
import axiosInstance from './axiosInstance';

export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/login/', { username, password });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;  // Rethrow to handle it in the frontend
  }
};
