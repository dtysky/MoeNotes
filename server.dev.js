/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description:
 */

const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.dev.config');
config.plugins.push(
  new webpack.DefinePlugin({
    'globalEnv': {
      NODE_ENV: JSON.stringify('development'),
//      NODE_ENV: JSON.stringify('production'),
    }
  })
);

const express = require('express');
const app = new express();
const port = 4444;

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}));
app.use(webpackHotMiddleware(compiler));

app.use('/',
  express.static(`${__dirname}/src`)
);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
