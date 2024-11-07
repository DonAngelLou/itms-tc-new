// src/lib/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Update base URL if necessary
  withCredentials: true,  // Important to include credentials
});

// Function to fetch and set CSRF token
export const fetchCsrfToken = async () => {
  try {
    const response = await axiosInstance.get('/csrf/');
    const csrfToken = response.data.csrfToken;
    axiosInstance.defaults.headers['X-CSRFToken'] = csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error;
  }
};

// Fetch CSRF token on initial load
fetchCsrfToken();

export default axiosInstance;
