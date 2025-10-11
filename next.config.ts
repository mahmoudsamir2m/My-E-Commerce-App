import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/Route-Academy-*/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withFlowbiteReact(nextConfig);