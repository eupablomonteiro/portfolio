/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { optimizePackageImports: ["@iconify/react","lucide-react","framer-motion"] },
  images: { remotePatterns: [{ hostname: "avatars.githubusercontent.com" }] },
};
module.exports = nextConfig;  