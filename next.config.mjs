/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['a.fsdn.com', 'i.insider.com', 'scx2.b-cdn.net'],  // Added scx2.b-cdn.net to allow loading images from this domain
  },
};

export default nextConfig;
