const path = require('path');
const config = require('config');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

const ExtractTextPluginStatic = new ExtractTextPlugin({ filename: './static.css', allChunks: true });
const ExtractTextPluginApp = new ExtractTextPlugin({ filename: './app.css', allChunks: true });

module.exports = {
  devtool: "eval-cheap-module-source-map",

  entry: [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client",
    "./src/app.tsx"
  ],

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  output: {
    path: path.resolve("./dist"),
    filename: "app.js",
    publicPath: `/`,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".less"],
    modules: ["node_modules"]
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.[jt]sx?$/,
        use: "source-map-loader"
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "react-hot-loader/webpack"
          },
          {
            loader: "awesome-typescript-loader",
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: "tslint-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        include: [path.resolve(__dirname, "src")],
        use: ["css-hot-loader"].concat(
          ExtractTextPluginApp.extract({
            fallback: "style-loader",
            use: ["css-loader", "less-loader"]
          })
        )
      },
      {
        test: /\.css$/,
        use: ["css-hot-loader"].concat(
          ExtractTextPluginStatic.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        )
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /semantic-ui.*icons.svg$/,
        loader: "file-loader"
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        exclude: /semantic-ui/
      },
      {
        test: /\.(ico|png|jpg|gif|eot|ttf|woff|woff2)$/,
        loader: "file-loader"
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "node-static",
      filename: "node-static.js",
      minChunks(module) {
        return module.context && module.context.indexOf("node_modules") >= 0;
      }
    }),
    new ExtractTextPlugin("app.css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: "index.ejs",
      inject: "body",
      filename: "index.html",
      // configUrl: `${config.baseRoute}/config.js`,
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve("./dist")
    }),
  ]
};
