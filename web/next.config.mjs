const nextConfig = {
  experimental: {
    externalDir: true,
  },
  webpack: (config, { isServer }) => {
    // Alias Node.js modules to their 'node:' counterparts to leverage nodejs_compat in Cloudflare Pages
    config.resolve.alias = {
      ...config.resolve.alias,
      'async_hooks': 'node:async_hooks',
      'util': 'node:util',
      'events': 'node:events',
      'buffer': 'node:buffer',
      'stream': 'node:stream',
      'crypto': 'node:crypto',
      'zlib': 'node:zlib',
      'path': 'node:path',
      'fs': 'node:fs',
    };
    
    // Some libraries might still try to use fallbacks, let's keep fs false just in case it can't be polyfilled
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

export default nextConfig;
