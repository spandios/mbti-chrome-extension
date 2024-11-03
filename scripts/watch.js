process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.INLINE_RUNTIME_CHUNK = false;

const configFactory = require('../config/webpack.config');
const webpack = require('webpack');

const config = configFactory('development');
config.watch = true;

webpack(config, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(
    stats.toString({
      chunks: false,
      colors: true,
    })
  );
});
