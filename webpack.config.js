const path = require('path');
const WebpackAssetsManifest = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const isViewSourceMap = false

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    // キャッシュの有効化
    cache: !isProduction,
    // エントリーポイントの設定
    entry: {
      "stylesheets.pack": path.resolve(__dirname, "src/packs/stylesheets.pack.js"),
      "javascripts.pack": path.resolve(__dirname, "src/packs/javascripts.pack.js")
    },
    // 出力の設定
    output: {
      // 出力するファイル名
      filename: isProduction ? '[name]-[contentHash].js' : '[name].js',
      // 出力先のパス（絶対パスを指定する必要がある）
      path: path.join(__dirname, 'dist/packs'),
    },
    devtool: false,
    devServer: {
      host: 'localhost',
      port: 3035,
      publicPath: 'http://localhost:3035/packs',
      contentBase: path.resolve(__dirname, 'dist/packs'),
      inline: true,
      overlay: true,
      liveReload: true,
      disableHostCheck: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      after(app, server, compiler){
        console.log('after')
      }
    },


    // 拡張子毎の読み込み設定関連
    module: {
      rules: [
        {
          // 拡張子 .js の場合
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            // Babel を利用する
            loader: "babel-loader",
          }]
        },
        {
          test: /\.css|\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: isViewSourceMap,
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader"
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isViewSourceMap
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            ecma: 6,
            compress: true,
            output: {
              comments: false,
            }
          }
        }),
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      new WebpackAssetsManifest({
        publicPath: isProduction ? `/${path.basename(process.env.npm_package_repository_url, '.git')}/packs/` : 'http://localhost:3035/packs/',
        writeToFileEmit: true,
        fileName: 'manifest.json',
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? "[name]-[hash].css" : "[name].css"
      })
    ]
  }
};
