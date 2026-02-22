import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const track = async (feature_name: string) => {
  try {
    await api.post("/track", { feature_name });
  } catch (err) {
    console.error("Failed to track event", err);
  }
};

export default api;
