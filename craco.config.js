module.exports = {
  webpack: {
      configure: {
          target: 'electron-renderer',
          node: {
            __dirname: true,
          },
      },
  },
  typescript: {
    isolatedModules: false,
  }
};