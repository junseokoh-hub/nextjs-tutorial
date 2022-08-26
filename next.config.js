/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/products",
        destination: `https://fakestoreapi.com/products`,
      },
      {
        source: "/api/item/:id",
        destination: `https://fakestoreapi.com/products/:id`,
      },
    ];
  },
};

module.exports = nextConfig;
