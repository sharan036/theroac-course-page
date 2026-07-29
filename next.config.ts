import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      {
        protocol: "https",
        hostname: "theroac.com",
      },
    ],
  },

  basePath: isProd ? "/mindly-clone" : "",
  assetPrefix: isProd ? "/mindly-clone/" : "",
};

export default nextConfig;