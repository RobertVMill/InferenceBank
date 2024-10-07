/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['a.fsdn.com', 'i.insider.com'],  // Add any other external domains you need to allow
    },
  };
  
  export default nextConfig;
  