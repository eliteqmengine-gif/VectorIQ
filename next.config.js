/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
