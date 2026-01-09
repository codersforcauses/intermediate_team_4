import axios from "axios";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL });
// const token = localStorage.getItem("access_token");
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access"); // Matches the key in your Login function
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response Interceptor: Handle expired tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        try {
          // Attempt to get a new access token
          //   const res = await axios.post(
          //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/token/refresh/`,
          //     {
          //       refresh: refreshToken,
          //     },
          //   );
          const res = await api.post("/token/refresh/", {
            refresh: refreshToken,
          });

          if (res.status === 200) {
            localStorage.setItem("access", res.data.access);
            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // Refresh token expired too -> Log user out
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
          console.error("Refresh Error:", refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
