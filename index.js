const path = require('path');
const express = require('express');
const getAppData = require('./get-app-data');

const args = process.argv.slice(2);
const useWebpack = args.indexOf('-w') !== -1;

const app = express();
const PORT = 8080;

let appData;
const promises = [];
app.get('/app', (req, res) => {
  res.json(appData);
});

const start = () => {
  app.listen(PORT, () => {
    console.log(`App started on port ${PORT}!`);
  });
};
if (useWebpack) {
  // Disabling global require so it won't require that dependency in prod
  /* eslint-disable global-require */
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const getWebpackConfig = require('./get-webpack-config.js');
  /* eslint-enable global-require */

  const webpackConfig = getWebpackConfig({ isWebpackDevServer: true });
  const webpackCompiler = webpack(webpackConfig);
  const webpackDevMiddlewareInstance = webpackMiddleware(webpackCompiler,
    {
      publicPath: '',
      noInfo: false,
      quiet: false
    }
  );

  app.use(webpackDevMiddlewareInstance);
  app.use(webpackHotMiddleware(webpackCompiler));
  promises.push(new Promise(resolve => {
    webpackDevMiddlewareInstance.waitUntilValid(resolve);
  }));
} else {
  promises.push(
    getAppData().then(_appData => {
      appData = _appData;
    })
  );
  app.use(express.static(path.join(__dirname, 'dist')));
}
Promise.all(promises).then(start);
