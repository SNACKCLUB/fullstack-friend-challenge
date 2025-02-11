import axios from "axios";
import { parseCookies } from "nookies";

const { "auth.token": token } = parseCookies();

export const useApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
});

useApi.interceptors.request.use((config) => {
  return config;
});

if (token) {
  useApi.defaults.headers["Authorization"] = `Bearer ${token}`;
}
