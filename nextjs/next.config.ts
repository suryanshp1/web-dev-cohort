import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        // port: '', // optional
        // pathname: '/**', // optional, allows all paths from this host
      },
    ],
  },
};

export default nextConfig;
