import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearTokens,
} from "../utils/storage";

// baseURL: "https://silvereye.clickncod.com/api";

const api = axios.create({
  baseURL: "https://silvereye.clickncod.com/api",
  withCredentials: true,
});

// Attach access token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle refresh token
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        // Try to get refresh token from localStorage (fallback)
        // Primary refresh token is in httpOnly cookie
        const refresh = getRefreshToken();

        const res = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          refresh ? { refreshToken: refresh } : {},
          {
            withCredentials: true,
          }
        );

        if (res.data.data?.accessToken) {
          // Only update access token, refresh token is in httpOnly cookie
          setAccessToken(res.data.data.accessToken);
          original.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
          return api(original);
        } else {
          throw new Error("No access token in response");
        }
      } catch (e) {
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
