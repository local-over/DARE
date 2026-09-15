import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, nextRuntime }) => {
    if (nextRuntime === 'edge') {
      config.resolve.alias['async_hooks'] = path.resolve('./async_hooks.js');
      config.resolve.alias['node:async_hooks'] = path.resolve('./async_hooks.js');
    }
    return config;
  },
  experimental: {
    externalDir: true,
  },
};
export default nextConfig;
