/** @type {import('next').NextConfig} */
const supabaseHost = (() => {
  try {
    const url = process.env.SUPABASE_URL;
    return url ? [new URL(url).hostname] : [];
  } catch {
    return [];
  }
})();

const nextConfig = {
  experimental: { optimizePackageImports: ["lucide-react","framer-motion"] },
  images: { remotePatterns: [{ hostname: "avatars.githubusercontent.com" }, ...supabaseHost.map((hostname) => ({ protocol: "https", hostname }))] },
};
module.exports = nextConfig;  