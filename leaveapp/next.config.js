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
  transpilePackages: [
    '@mui/material',
    '@mui/system',
    '@mui/x-date-pickers',
    '@emotion/react',
    '@emotion/styled',
    '@emotion/cache'
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Remove these aliases as they're no longer needed with proper Emotion configuration
    };
    return config;
  },
  compiler: {
    // Simplified Emotion compiler configuration
    emotion: true
  },
};

module.exports = nextConfig;