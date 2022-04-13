const path = require('path');
const webpack = require('webpack');
 
module.exports = {
    entry: {
        app: './src/main.ts',
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
 
    mode: 'development',
    devtool: 'inline-source-map',
 
    devServer: {
        static: './src',
        port: 8080
    },

    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    },

    plugins: [
     new webpack.ProvidePlugin({
       PIXI: 'pixi.js'
     })
   ],
 
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    }
};