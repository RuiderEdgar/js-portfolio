const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/images/[hash][ext][query]',
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
      extensions: ['.js'],
      alias: {
        '@utils': path.resolve(__dirname,'src/utils'),
        '@templates': path.resolve(__dirname,'src/templates'),
        '@styles': path.resolve(__dirname,'src/styles'),
        '@images': path.resolve(__dirname,'src/assets/images'),
      }
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css|.styl$/i,
          use: [MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader'
          ],
        },
        //imagenes
        {
          test: /\.png/,
          type: 'asset/resource',
        },
        //fonts
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[contenthash].[ext]",
              outputPath: "./assets/fonts/",
              publicPath: "../assets/fonts/",
              esModule: false,
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: './public/index.html',
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/[name].[contenthash].css'
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src", "assets/images"),
            to: "assets/images"
          }
        ]
      }),
      new Dotenv(),
      new BundleAnalyzerPlugin(),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
        watch: true,
      },
      watchFiles: path.join(__dirname, "./**"), //observa los cambios en todos nuestros archivos y actualiza el navegador
      compress: true,
      historyApiFallback: true,
      port: 3006,
      open: true, //Hace que se abra en el navegador
    },
  }