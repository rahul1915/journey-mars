const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PORT = process.env.PORT || '5000';
const isDevMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/index.tsx'),
    },
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

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
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
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            files: {
                js: ['bundle.js'],
            },
        }),
    ].filter(Boolean),
    devtool: 'source-map',
    devServer: {
        port: PORT,
        historyApiFallback: { index: '/' },
        open: true,
        watchFiles: ['src/**/*'],
    },
};
