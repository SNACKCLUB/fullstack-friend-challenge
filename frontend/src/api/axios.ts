import axios from "axios";
import { useAuthStore } from "../store/auth/authStore";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && !config.url?.includes("/auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const authStore = useAuthStore.getState();

    if (originalRequest.url.includes("/auth")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          "http://localhost:8080/api/auth/refresh-token",
          {
            refreshToken: authStore.refreshToken,
          }
        );

        authStore.setToken(data.accessToken, data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        authStore.logout();
        return Promise.reject(refreshError);
      }
    }

    const errorMessage = error.response?.data?.message || "Erro na requisicao";
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
