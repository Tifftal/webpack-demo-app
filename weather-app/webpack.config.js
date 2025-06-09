const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
// const { GenerateSW } = require("workbox-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    port: 3001,
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
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "weather",
      filename: "weather.js",
      exposes: {
        "./Weather": "./src/Weather",
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
    // new GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   runtimeCaching: [
    //     {
    //       urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
    //       handler: "CacheFirst",
    //       options: {
    //         cacheName: "weather-images",
    //         expiration: {
    //           maxEntries: 60,
    //           maxAgeSeconds: 30 * 24 * 60 * 60,
    //         },
    //       },
    //     },
    //   ],
    // }),
  ],
};
