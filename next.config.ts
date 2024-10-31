import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['yourdomain.com'],
    path: '/_next/image',
    loader: 'default',
  },
};

export default nextConfig;
