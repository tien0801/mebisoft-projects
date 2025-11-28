import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ichef.bbci.co.uk',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
