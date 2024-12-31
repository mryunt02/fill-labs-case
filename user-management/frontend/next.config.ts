/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Suppress hydration warnings
  experimental: {
    suppressHydrationWarning: true,
  },
};

export default nextConfig;
