import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/hrms',
        destination: 'https://hrmsm.com',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
