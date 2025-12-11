/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // Turbopack is now stable in Next.js 15
  experimental: {
    turbo: {
      resolveAlias: {
        '@': './src',
      },
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  output: 'standalone', // Optimize for deployment
}

module.exports = nextConfig
