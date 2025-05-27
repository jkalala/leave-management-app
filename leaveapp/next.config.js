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
  compiler: {
    emotion: true
  },
};

module.exports = nextConfig;