const nextConfig = {
  serverExternalPackages: ['pdfmake'],
  experimental: {
    externalDir: true,
  },
  webpack: (config, { isServer, nextRuntime }) => {
    if (nextRuntime === 'edge') {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        stream: false,
        crypto: false,
        zlib: false,
        async_hooks: false,
        util: false,
        events: false,
        buffer: false,
      };
    }
    return config;
  },
};

export default nextConfig;
