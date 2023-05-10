// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    domains: [
      'source.unsplash.com',
      'tokenomicsdao.xyz',
      'storage.googleapis.com',
    ],
    minimumCacheTTL: 60,
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
  async redirects() {
    return [
      {
        source: '/tdsLandingPage',
        destination: '/tokenomics-design',
        permanent: true,
      },
      {
        source: '/posts/:id',
        destination: '/:id',
        permanent: true,
      },
      {
        source: '/bookAnExpert',
        destination: '/book-an-expert',
        permanent: true,
      },
    ]
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
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
