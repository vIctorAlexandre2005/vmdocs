import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api", // seu backend Spring Boot
});

// Interceptor para JWT
api.interceptors.request.use((config) => {
  const token = localStorage?.getItem("user");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
