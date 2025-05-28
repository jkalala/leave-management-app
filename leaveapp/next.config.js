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
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/react/jsx-runtime': require.resolve('@emotion/react/jsx-runtime'),
    };
    return config;
  },
  compiler: {
    emotion: {
      sourceMap: true,
      autoLabel: 'dev-only',
      labelFormat: '[local]',
    }
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  typescript: {
    ignoreBuildErrors: false,
  }
};

module.exports = nextConfig;