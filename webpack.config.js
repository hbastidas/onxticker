const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'onxticker.js',
    path: path.resolve(__dirname, 'dist')
  }
};
