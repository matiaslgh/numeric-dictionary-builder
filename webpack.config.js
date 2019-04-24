const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  target: 'node',
  output: {
    filename: 'genDictionary.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
