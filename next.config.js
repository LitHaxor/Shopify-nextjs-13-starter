/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    domains: ['images.unsplash.com', 'tailwindui.com', 'cdn.shopify.com'],
  }
}

module.exports = nextConfig
