const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const PORT = process.env.PORT || '5000';
const isDevMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/index.tsx'),
    },
    mode: isDevMode ? 'development' : 'production',
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: 'auto',
        filename: isDevMode ? '[name].[contenthash].bundle.js' : '[name].[chunkhash].bundle.js',
        chunkFilename: isDevMode ? '[name].[contenthash].bundle.js' : '[name].[chunkhash].bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: isDevMode,
                    },
                },
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ttf)$/i,
                type: 'asset/resource',
            },
        ].filter(Boolean),
    },

    optimization: {
        minimize: !isDevMode,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
            new CssMinimizerPlugin({
                test: /\.css$/g,
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
        alias: {
            components: path.resolve(__dirname, 'src', 'components'),
            store: path.resolve(__dirname, 'src', 'store'),
            context: path.resolve(__dirname, 'src', 'context'),
            utils: path.resolve(__dirname, 'src', 'utils'),
        },
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: isDevMode ? 'main.css' : '[chunkhash].css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'images'),
                    to: './images/',
                },
            ],
        }),

        isDevMode
            ? new HtmlWebpackPlugin({
                  template: path.resolve(__dirname, 'src/index.html'),
                  files: {
                      js: ['bundle.js'],
                  },
              })
            : new HtmlWebpackPlugin({
                  template: path.resolve(__dirname, 'src/index.html'),
                  publicPath: './',
                  files: {
                      css: '[contenthash].css',
                      js: '[contenthash].js',
                  },
              }),
    ].filter(Boolean),
    devtool: isDevMode ? 'source-map' : 'hidden-source-map',
    devServer: {
        port: PORT,
        historyApiFallback: { index: '/' },
        open: true,
        watchFiles: ['src/**/*'],
    },
};
