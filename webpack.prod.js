const path = require('path');
const webpack = require('webpack');
 
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
module.exports = {
    entry: {
        app: './src/main.ts',
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
 
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
 
        new CopyPlugin({
            patterns: [
                { 
                    from: 'index.html',
                    context: 'src/'
                },
                {
                    from: 'src/assets/',
                    to: 'assets/'
                }
            ]
        }),

        new webpack.ProvidePlugin({
            PIXI: 'pixi.js'
        })
    ],

    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    },
    
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    }
};