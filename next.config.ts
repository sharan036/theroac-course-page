import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "theroac.com" },
    ],
  },

  basePath: "/mindly-clone",
  assetPrefix: "/mindly-clone/",
};

export default nextConfig;