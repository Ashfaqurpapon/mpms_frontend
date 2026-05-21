import axios from "axios";
import { ApiRouteConstant } from "./api-route-constant";

export const axiosInterceptors = axios.create({
  baseURL: ApiRouteConstant.BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// attach token automatically if available
axiosInterceptors.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
