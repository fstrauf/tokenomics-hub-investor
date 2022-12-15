// @ts-check
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'source.unsplash.com', 'tokenomicsdao.xyz'],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig