/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "theroac.com" },
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "/heartfelt-6a946.firebasestorage.app/**", },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://cdn.razorpay.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: blob: https: http:;
              font-src 'self' data: https://fonts.gstatic.com;
              connect-src 'self' https: http: ws: wss:;
              frame-src 'self' https://api.razorpay.com https://checkout.razorpay.com;
              worker-src 'self' blob:;
              child-src 'self';
              object-src 'none';
            `.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;