const path = require("path");
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const options = { fileName: "asset-manifest.json" };
const WebpackAssetsManifest = require('webpack-assets-manifest');


module.exports = (env) => {

    // const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        mode: "production",
        entry: ['@babel/polyfill', './src/index.js'],
        output: {
            path: path.resolve(__dirname, 'dist/static/js'),
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js',
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                    exclude: /node_modules/
                }
            ]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    },
                    chunks: 'all'
                }
            },
            runtimeChunk: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            }),
            new CompressionPlugin({include: /\/includes/}),
            // new WebpackManifestPlugin(options),
            new CopyPlugin({
                patterns: [
                    {from: "public", to: path.resolve(__dirname, 'dist/static'),}
                ],
            }),
            new WebpackAssetsManifest({}),
            new webpack.DefinePlugin(envKeys)
        ]
    }
};