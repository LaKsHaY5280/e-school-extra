/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize image domains if needed
  images: {
    domains: [],
    // Using unoptimized for now to prevent any issues with image optimization
    unoptimized: process.env.NODE_ENV === 'production',
  },
  
  // Add trailing slashes for consistent URLs
  trailingSlash: true,
  
  // Configure build output
  output: 'standalone',
  
  // Enable production source maps for better debugging
  productionBrowserSourceMaps: true,
  
  // Experimental features
  experimental: {
    // Enable if you need server actions
    serverActions: true,
  },
  
  // Handle errors more gracefully
  onDemandEntries: {
    // Keep pages in memory longer during development
    maxInactiveAge: 25 * 1000,
    // Number of pages to keep in memory
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig; 