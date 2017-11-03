const path = require("path");
const webpack = require("webpack");
const glob = require("glob");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");

// Config
const config = {
  context: path.resolve(__dirname),
  target: "node",
  entry: {
    main: "./js/main.js"
  },
  output: {
    path: path.resolve(__dirname),
    filename: "./public/dist/[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["es2015", { modules: false }]]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            {
              loader: "postcss-loader?sourceMap=false",
              options: {
                plugins: function() {
                  return [require("precss"), require("autoprefixer")];
                }
              }
            },
            "sass-loader"
          ]
        })
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 10000 } // Convert images < 10k to base64 strings
          }
        ]
      }
    ]
  },
  plugins: [
    // Extract styles into filename with hash
    new ExtractTextPlugin("./public/dist/styles.css"),
    // Simple progress bar
    new ProgressBarPlugin(),
    // Something something scope hoisting webpack 3
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      global: {}, // bizarre lodash(?) webpack workaround
      "global.GENTLY": false // superagent client fix
    })
  ]
};

process.noDeprecation = true;
module.exports = config;