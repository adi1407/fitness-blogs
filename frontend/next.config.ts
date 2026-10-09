import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
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
  async headers() {
    return [
      {
        // Everything except the embeddable widgets may only be framed by fitlives itself.
        source: "/((?!embed/).*)",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
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
