/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['storage.cloud.google.com'],
  },
}

module.exports = nextConfig
