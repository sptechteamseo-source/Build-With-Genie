import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for Azure App Service deployment
  output: "standalone",

  // Allow Cloudinary images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // Strict mode for better error detection during development
  reactStrictMode: true,
};

export default nextConfig;
