process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const paths = require('../config/paths');
const webpack = require('webpack');
const config = require('../config/webpack.config.dev.js');

webpack(config).watch({}, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    copyPublicFolder();
  }
  console.error(stats.toString({
    chunks: false,
    colors: true
  }));
});

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuildTest, {
    dereference: true,
    // filter appHtml, appPopupHtml for preventing overwrite webpack-builded files
    filter: file =>
        file !== paths.appHtml &&
        file !== paths.appPopupHtml &&
        file !== paths.appHtmlTest &&
        (file.includes('png') ? file.includes('test') : true)
  });
}
