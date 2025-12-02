const nextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/albums',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
