const getWebpackConfig = require('./get-webpack-config');

module.exports = {
  globals: {
    __DEV__: false,
    __PROD__: false,
    __DEVSERVER__: false,
    'process.env.NODE_ENV': false
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: getWebpackConfig()
      }
    }
  },
  rules: {
    'jsx-a11y/no-static-element-interactions': [0]
  }
};
