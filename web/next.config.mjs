const nextConfig = {
  experimental: {
    externalDir: true,
    serverComponentsExternalPackages: ['pdfmake'],
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
      };
    }
    return config;
  },
};

export default nextConfig;
