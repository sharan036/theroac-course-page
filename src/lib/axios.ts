import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL:  process.env.NEXT_PUBLIC_API_URL || "https://api.theroac.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Attach token to every request automatically
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Enhanced error handling with better token expiry management
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if we're trying to access a protected route
      const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
      if (currentPath.includes("/dashboard")) {
        // Clear token safely
        try {
          Cookies.remove("auth_token", { path: "/", domain: ".theroac.com" });
        } catch (e) {
          // Ignore removal errors
        }
        // Redirect to auth with return-to for better UX
        const returnTo = encodeURIComponent(currentPath);
        window.location.href = `/auth/login?returnTo=${returnTo}`;
      }
    }

    // Log network errors for debugging without exposing sensitive data
    if (!error.response) {
      console.error("Network error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
