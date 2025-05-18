import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: 'api/:path*', // All request to /api/ will be proxied
        destination: 'https://auth-service-production-d511.up.railway.app/:path*', // Backend URL
      }
    ]
  }
};

export default nextConfig;
