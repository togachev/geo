const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        ol: './statics/ol/ol',
        olmap: './statics/ol/olmap',
        olmap_a: './statics/ol/olmap_a',
        olmap1: './statics/ol/olmap1',
    },
    output: {
        filename: '[name].js',
        // filename: '[name].[chunkhash].js',
        path: path.resolve('./statics/webpack_bundles/')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            parallel: true,
        })],
        splitChunks: {
            chunks: 'all',
          },
      },
    devServer: {
        port: 4200
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        // new HTMLWebpackPlugin({
        //     filename: 'map.html',
        //     template: 'templates/pages/map.html',
        //     chunks: ['ol']
        // }),
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: '[name].css'
            // filename: '[name].[chunkhash].css'
        }),
        // new UglifyJsPlugin()
    ]
}
