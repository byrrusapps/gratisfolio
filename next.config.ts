import type { NextConfig } from "next";

const nextConfig: NextConfig = {
output: 'standalone',
turbopack: {
    root: __dirname // This ensures the current project folder is the root
  }
};

export default nextConfig;
