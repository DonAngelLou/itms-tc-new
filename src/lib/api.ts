import axios from "axios";

// Create a centralized Axios instance with baseURL
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

let csrfToken: string | null = null;

// Request interceptor for CSRF token and Authorization
api.interceptors.request.use(async (config) => {
  if (!csrfToken) {
    const response = await axios.get("http://127.0.0.1:8000/api/csrf/");
    csrfToken = response.data.csrfToken;
  }
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }

  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
});

// Vehicles API
export const getVehicles = async (): Promise<any[]> => {
  const response = await api.get("/vehicles/");
  return response.data;
};

export const getVehicleById = async (vehicleId: number) => {
  const response = await api.get(`/vehicles/${vehicleId}/`);
  return response.data;
};

export const createVehicle = async (vehicleData: any) => {
  const response = await api.post("/vehicles/", vehicleData);
  return response.data;
};

export const updateVehicle = async (vehicleId: number, vehicleData: any) => {
  const response = await api.patch(`/vehicles/${vehicleId}/`, vehicleData);
  return response.data;
};

export const deleteVehicle = async (vehicleId: number) => {
  const response = await api.delete(`/vehicles/${vehicleId}/`);
  return response.data;
};

export const getVehicleFeedback = async (vehicleId: number) => {
  const response = await api.get(`/vehicles/${vehicleId}/feedback/`);
  return response.data;
};

export const getVehicleViolations = async (vehicleId: number) => {
  const response = await api.get(`/vehicles/${vehicleId}/violations/`);
  return response.data;
};

// Drivers API
export const getDrivers = async (): Promise<any[]> => {
  const response = await api.get("/drivers/");
  return response.data;
};

export const getDriverById = async (driverId: number) => {
  const response = await api.get(`/drivers/${driverId}/`);
  return response.data;
};

export const getDriverTripHistory = async (driverId: number) => {
  const response = await api.get(`/drivers/${driverId}/trip-history/`);
  return response.data;
};

export const fetchDriverData = async (driverId: string) => {
  const response = await axios.get(`/api/drivers/${driverId}/`);
  return response.data;
};

export const requestEditDriver = async (driverId: string, editedDriver: any) => {
  const response = await axios.post(`/api/drivers/${driverId}/request-edit/`, editedDriver);
  return response.data;
};

export const requestDeleteDriver = async (driverId: string) => {
  const response = await axios.post(`/api/drivers/${driverId}/request-delete/`);
  return response.data;
};

// Driver Time Records (DTR) API
export const getDriverDTR = async (driverId: number): Promise<any[]> => {
  const response = await api.get(`/create-dtr-entry/`, {
    params: { driverId },
  });
  return response.data;
};

// Vehicle Travel History (VehicleDTR) API
export const getVehicleDTR = async (vehicleId: number): Promise<any[]> => {
  const response = await api.get(`/create-vehicle-dtr/`, {
    params: { vehicleId },
  });
  return response.data;
};

export default api;
