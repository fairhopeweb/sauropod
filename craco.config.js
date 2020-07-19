module.exports = {
  webpack: {
      configure: {
          target: 'electron-renderer'
      }
  },
  typescript: {
    isolatedModules: false,
  }
};