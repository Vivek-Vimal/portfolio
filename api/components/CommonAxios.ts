
import axios from "axios";

const BASE_URL = "";

export const commonAxios = axios.create({
  baseURL: BASE_URL,
});

// Add interceptor to attach Bearer Token
commonAxios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
