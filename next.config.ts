import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint:{
    ignoreDuringBuilds:true,
  },
  typescript:{
    ignoreBuildErrors:true,
  }
};

// const nextConfig = {
//   // ... other configurations
  
//   // Add the allowedDevOrigins configuration
//   compiler: {
//     allowedDevOrigins: ['192.168.52.80:3000'], // Replace 3000 with your development port if it's different
//   },
// };

export default nextConfig;
