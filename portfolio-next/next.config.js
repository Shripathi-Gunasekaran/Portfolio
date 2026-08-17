/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local images and external sources if needed
    remotePatterns: [],
    // Unoptimized for pure static hosting if needed
    // unoptimized: true,
  },
};

module.exports = nextConfig;
