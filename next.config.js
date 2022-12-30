// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    domains: ['source.unsplash.com', 'tokenomicsdao.xyz', 'storage.googleapis.com'],
  },
  experimental: {
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: [],
        },
      ],
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
    // transpilePackages: ['@acme/ui', 'lodash-es'],
}

// module.exports = nextConfig
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(nextConfig)