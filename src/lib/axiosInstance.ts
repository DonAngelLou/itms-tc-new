// src/lib/axiosInstance.ts

// Define a mock "axios" instance with methods that mimic real HTTP requests

const mockResponse = (data: any, delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), delay));

// Mock API responses for demonstration
const mockData = {
  csrfToken: "mockCsrfToken123",
  login: { token: "mockToken123" },
  logout: { success: true },
  checkAuth: { isAuthenticated: true, user: { username: "mockUser", role: "admin" } },
  dashboardStatistics: { totalTrips: 100, totalRevenue: 50000, activeBookings: 30 },
  recentBookings: [
    { id: "1", status: "confirmed", tripId: "T1", passengerName: "John Doe" },
    { id: "2", status: "pending", tripId: "T2", passengerName: "Jane Smith" },
  ],
  // Add other mock data as needed
};

// Mock axios methods
const axiosInstance = {
  get: (url: string) => {
    console.log(`Mock GET request to: ${url}`);
    switch (url) {
      case "/csrf/":
        return mockResponse({ csrfToken: mockData.csrfToken });
      case "/check-auth/":
        return mockResponse(mockData.checkAuth);
      case "/dashboard-statistics/":
        return mockResponse(mockData.dashboardStatistics);
      case "/bookings/recent/":
        return mockResponse({ recent_bookings: mockData.recentBookings });
      // Add cases for other GET endpoints if needed
      default:
        return mockResponse({});
    }
  },

  post: (url: string, data?: any) => {
    console.log(`Mock POST request to: ${url}`, data);
    switch (url) {
      case "/auth/login/":
        return mockResponse(mockData.login);
      case "/logout/":
        return mockResponse(mockData.logout);
      // Add cases for other POST endpoints if needed
      default:
        return mockResponse({});
    }
  },

  patch: (url: string, data?: any) => {
    console.log(`Mock PATCH request to: ${url}`, data);
    return mockResponse({});
  },

  delete: (url: string) => {
    console.log(`Mock DELETE request to: ${url}`);
    return mockResponse({ success: true });
  },
};

// Mock CSRF fetch function, no longer needed but kept for compatibility
export const fetchCsrfToken = async () => {
  console.log("Mock fetch CSRF token");
  return mockResponse({ csrfToken: mockData.csrfToken });
};

// Export the mock axios instance
export default axiosInstance;
