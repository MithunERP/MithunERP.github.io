import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // GitHub Pages has no image-optimization server; ship images unoptimized.
    unoptimized: true,
  },
};

export default nextConfig;
