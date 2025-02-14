import axios from "axios";
import { parseCookies } from "nookies";

export const useApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
});

useApi.interceptors.request.use((config) => {
  const { "auth.token": token } = parseCookies();

  if (token && !config.headers["Authorization"]) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});
