const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const { GenerateSW } = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    port: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    hot: true,
    historyApiFallback: true,
    client: {
      logging: "warn",
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        weather: "weather@http://localhost:3001/weather.js",
        news: "news@http://localhost:3002/news.js",
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: "^19.1.0" },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^19.1.0",
        },
        "react-router-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^7.6.1",
        },
      },
    }),

    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public/offline.html", to: "offline.html" }],
    }),
    new InjectManifest({
      swSrc: "./src/sw.ts",
      swDest: "service-worker.js",
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    // new HtmlWebpackPlugin({
    //   template: "./public/offline.html",
    //   filename: "offline.html",
    //   inject: false,
    // }),
  ],
};
