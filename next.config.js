/** @type {import('next').NextConfig} */
// const securityHeaders = [
//   {
//     key: 'Referrer-Policy',
//     value: 'origin-when-cross-origin',
//   },
// ]
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async headers() {
  //   return [
  //     {
  //       // Apply these headers to all routes in your application.
  //       source: '/:path*',
  //       headers: securityHeaders,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
