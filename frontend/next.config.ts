import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.fitlives.in" }],
        destination: "https://fitlives.in/:path*",
        permanent: true,
      },
      {
        source: "/tools/:calc([a-z0-9-]+-calculator)",
        destination: "/:calc",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
