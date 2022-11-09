// @ts-check
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'source.unsplash.com'],
  },
}

module.exports = nextConfig