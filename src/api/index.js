import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
});

export const MedicationAPI = {
  getAll: () => api.get("/medications"),
  create: (data) => api.post("/medications", data),
  update: (id, data) => api.put(`/medications/${id}`, data),
  delete: (id) => api.delete(`/medications/${id}`),
};

export const DoseAPI = {
  getByDate: (date) => api.get(`/doses?date=${date}`),
  getRange: (start, end) => api.get(`/doses?startDate=${start}&endDate=${end}`),
  toggleTake: (id) => api.patch(`/doses/${id}/take`),
};

export const VitalAPI = {
  getAll: (start, end) => api.get(`/vitals?startDate=${start}&endDate=${end}`),
  create: (data) => api.post("/vitals", data),
  delete: (id) => api.delete(`/vitals/${id}`),
};

export default api;
