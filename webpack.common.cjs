const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { main: path.resolve(__dirname, 'src/js/main.js') },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html'
  })],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader"
      }
    ]
  },
  optimization: {
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[path][name][ext]',
    clean: true
  },
  stats: { children: true }
};