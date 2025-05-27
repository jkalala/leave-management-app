/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  output: 'standalone',
  distDir: '.next',
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@mui/material', '@mui/system', '@mui/x-date-pickers'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/styled': '@emotion/styled/base',
    };
    return config;
  },
};

module.exports = nextConfig;


