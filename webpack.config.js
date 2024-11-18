const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    return {
        entry: './src/index.jsx',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'build'),
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.s?css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'images/',
                                publicPath: '/images/'
                            },
                        }
                    ],
                }
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
        ],
        devServer: {
            historyApiFallback: true,
            open: true,
            hot: true,
            port: 8080,
            proxy: {
                '/api': {
                    target: 'https://dobrovershnyk.online/api',
                    secure: false,
                    changeOrigin: true,
                    pathRewrite: { '^/api': '' },
                },
            },
        },
        
    };
}