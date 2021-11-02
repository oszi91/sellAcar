const path = require("path");

const Html = require('html-webpack-plugin');

module.exports = {
  entry: [
    "./src/index.js",
  ],
  output: {
    filename: "src/out.js",
    path: path.resolve(__dirname, "build"),
    sourceMapFilename: "[name].js.map", 
  },
  devtool: "source-map",
  devServer: {
    port: 3001,
    // "historyApiFallback": true,
  },
  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },

      {
        test: /\.(sass|css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")()
              ],
            },
          },
          'sass-loader',
        ]
      },

      {
        test: /\.(jpg|jpeg|gif|png)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'images',
            outputPath: 'images',
          }
        }
      },

      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'fonts',
            outputPath: 'fonts',
          }
        }
      },
    ]
  },

  plugins: [
    new Html({
      filename: 'index.html',
      template: './index.html',
    })
  ]
};