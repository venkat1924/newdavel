const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  resolve: {
    extensions: [".js", ".html", ".npy", ".json"],
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].[id].js",
  },
  module: {
    rules: [
      {
        test: /\.(npy|npc)$/,
        exclude: /node_modules/,
        loader: "numpy-loader",
        options: {
          outputPath: "data/",
        },
      },
      {
        test: /\.(json)$/,
        exclude: /node_modules/,
        loader: "json-loader",
        options: {
          outputPath: "data/",
        },
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: "svg-inline-loader",
        options: {
          removeSVGTagAttrs: true,
          removingTagAttrs: ["font-family"],
        },
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        exclude: /node_modules/,
        loader: "file-loader",         // Make sure it’s "file-loader", not "file"
        options: {
          outputPath: "images/",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),

    // CopyWebpackPlugin v6+ requires an object with `patterns`
    new CopyWebpackPlugin({
      patterns: [
        { from: "static/" }
      ]
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    client: {
      overlay: true,
    },
    devMiddleware: {
      stats: "minimal",
    },
    hot: true,
    host: "0.0.0.0",
    port: 8080,
  },

  devtool: "inline-source-map",
};
