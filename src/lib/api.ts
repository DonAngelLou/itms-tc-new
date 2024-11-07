// src/lib/api.ts

import axiosInstance from './axiosInstance';
import { Trip, Booking, FeedbackData, SupportData, DriverData, Violation, Vehicle, Notification, UserProfile, MaintenanceData } from '@/types/apiTypes';

// Auth APIs
export const login = async (username: string, password: string) => {
  const response = await axiosInstance.post("/auth/login/", { username, password });
  return response.data;
};

export const logout = async () => {
  await axiosInstance.post("/logout/");
  localStorage.removeItem("authToken");
};

export const checkAuth = async () => {
  const response = await axiosInstance.get("/check-auth/");
  return response.data;
};

// Dashboard APIs
export const getDashboardStatistics = async () => {
  const response = await axiosInstance.get("dashboard-statistics/");
  return response.data;
};

export const getRecentBookings = async () => {
  const response = await axiosInstance.get("bookings/recent/");
  return response.data.recent_bookings;
};

// Bookings APIs
export const getBookings = async () => {
  const response = await axiosInstance.get("bookings/");
  return response.data;
};

export const getBookingDetails = async (bookingId: string) => {
  const response = await axiosInstance.get(`bookings/${bookingId}/`);
  return response.data;
};

export const createBooking = async (data: Booking) => {
  const response = await axiosInstance.post("bookings/", data);
  return response.data;
};

export const updateBookingStatus = async (bookingId: string, status: string) => {
  const response = await axiosInstance.patch(`bookings/${bookingId}/`, { status });
  return response.data;
};

export const deleteBooking = async (bookingId: string) => {
  const response = await axiosInstance.delete(`/bookings/${bookingId}/`);
  return response.data;
};

// Drivers APIs
export const fetchDrivers = async () => {
  const response = await axiosInstance.get("/drivers/");
  return response.data;
};

export const getDriverDetails = async (driverId: string) => {
  const response = await axiosInstance.get(`/drivers/${driverId}/`);
  return response.data;
};

export const createDriver = async (data: { name: string; license_number: string }) => {
  const response = await axiosInstance.post("/drivers/", data);
  return response.data;
};

export const updateDriver = async (driverId: string, data: { name?: string; license_number?: string }) => {
  const response = await axiosInstance.patch(`/drivers/${driverId}/`, data);
  return response.data;
};

export const deleteDriver = async (driverId: string) => {
  const response = await axiosInstance.delete(`/drivers/${driverId}/`);
  return response.data;
};

export const updateNFC = async (driverId: number) => {
  const response = await axiosInstance.post(`/drivers/${driverId}/nfc-tap/`);
  return response.data;
};

// Vehicles APIs
export const fetchVehicles = async () => {
  const response = await axiosInstance.get("vehicles/");
  return response.data;
};

export const getVehicleDetails = async (vehicleId: number) => {
  const response = await axiosInstance.get(`vehicles/${vehicleId}/`);
  return response.data;
};

export const createVehicle = async (data: {
  vehicle_type: string;
  model_name: string;
  year: number;
  plate_number: string;
  color: string;
  capacity: number;
  status: string;
}) => {
  const response = await axiosInstance.post("vehicles/", data);
  return response.data;
};

export const updateVehicle = async (vehicleId: string, data: { vehicle_type?: string; capacity?: number; plate_number?: string }) => {
  const response = await axiosInstance.patch(`vehicles/${vehicleId}/`, data);
  return response.data;
};

export const updateVehicleStatus = async (vehicleId: number, status: string) => {
  const response = await axiosInstance.patch(`vehicles/${vehicleId}/status/`, { status });
  return response.data;
};

export const deleteVehicle = async (vehicleId: string) => {
  const response = await axiosInstance.delete(`vehicles/${vehicleId}/`);
  return response.data;
};

export const fetchVehicleViolations = async (vehicleId: number) => {
  const response = await axiosInstance.get(`vehicles/${vehicleId}/violations/`);
  return response.data;
};

// Trips APIs
export const fetchTrips = async () => {
  const response = await axiosInstance.get("trips/");
  return response.data;
};

export const getTripDetails = async (tripId: string) => {
  const response = await axiosInstance.get(`trips/${tripId}/`);
  return response.data;
};

export const createTrip = async (data: {
  destination: string;
  vehicle: string;
  driver: string;
  departure_time: string;
  price: number;
  is_package: boolean;
  delivery_type: string;
}) => {
  const response = await axiosInstance.post("trips/", data);
  return response.data;
};

export const updateTrip = async (tripId: string, data: {
  destination?: string;
  vehicle?: string;
  driver?: string;
  departure_time?: string;
  price?: number;
  is_package?: boolean;
  delivery_type?: string;
}) => {
  const response = await axiosInstance.patch(`trips/${tripId}/`, data);
  return response.data;
};

export const deleteTrip = async (tripId: string) => {
  const response = await axiosInstance.delete(`trips/${tripId}/`);
  return response.data;
};

// Notifications APIs
export const getNotifications = async () => {
  const response = await axiosInstance.get("notifications/");
  return response.data;
};

export const markNotificationsSeen = async (ids: number[]) => {
  const response = await axiosInstance.patch("notifications/mark-seen/", { notification_ids: ids });
  return response.data;
};

// Reports and Analytics APIs
export const getAnalyticsData = async () => {
  const response = await axiosInstance.get("dashboard-statistics/");
  return response.data;
};

export const getAdvancedAnalyticsData = async () => {
  const response = await axiosInstance.get("advanced-analytics/");
  return response.data;
};

export const exportCsvReport = async () => {
  const response = await axiosInstance.get("/reports/export/csv/", {
    responseType: "blob",
  });
  return response.data;
};

export const exportPdfReport = async () => {
  const response = await axiosInstance.get("/export-pdf-report/", {
    responseType: "blob",
  });
  return response.data;
};

// Feedback APIs
export const submitFeedback = async (vehicleId: number, feedbackData: FeedbackData) => {
  const response = await axiosInstance.post(`feedback/${vehicleId}/`, feedbackData);
  return response.data;
};

// Support Request APIs
export const submitSupportRequest = async (supportData: SupportData) => {
  const response = await axiosInstance.post("support-requests/", supportData);
  return response.data;
};

// Maintenance APIs
export const fetchMaintenance = async () => {
  const response = await axiosInstance.get("maintenance/");
  return response.data;
};

export const createMaintenance = async (data: MaintenanceData) => {
  const response = await axiosInstance.post("maintenance/", data);
  return response.data;
};

export const markMaintenanceCompleted = async (maintenanceId: number) => {
  const response = await axiosInstance.patch(`maintenance/${maintenanceId}/mark_completed/`);
  return response.data;
};

export default axiosInstance;
