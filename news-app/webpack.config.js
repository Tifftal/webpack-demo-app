const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { GenerateSW } = require("workbox-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    port: 3002,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
    historyApiFallback: true,
    client: {
      logging: "warn",
    },
  },
  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ }],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "news",
      filename: "news.js",
      exposes: {
        "./News": "./src/News",
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
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          // Кэшируем API-запросы к NewsAPI
          urlPattern: /^https:\/\/newsapi\.org\/v2\/.*$/,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "news-api-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60, // 1 час
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    }),
  ],
};
