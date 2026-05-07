/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion'],
  },
  webpack(config) {
    // Allow GLSL imports if needed in the future
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader'],
    });
    return config;
  },
};

module.exports = nextConfig;
