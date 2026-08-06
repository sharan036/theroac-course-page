import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "theroac.com" },
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "/heartfelt-6a946.firebasestorage.app/**", },
    ],
  },
};

export default nextConfig;
