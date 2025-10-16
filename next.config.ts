import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
      domains: ["images.unsplash.com", "res.cloudinary.com"]
    },
  serverActions: {
    bodySizeLimit: '20mb',
  },
  }


export default nextConfig;
