import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add JWT token from localStorage to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response: Handle expired token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const pathname = window.location.pathname;

    const isAuthError = status === 401 || status === 403;

    // Always remove token if auth error
    if (isAuthError) {
      localStorage.removeItem("token");

      // Only redirect to login if the route is protected
      const publicPrefixes = ["/", "/dormdrop", "/cardinalcart"];
      const isPublic = publicPrefixes.some((prefix) => pathname.startsWith(prefix));

      if (!isPublic) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;