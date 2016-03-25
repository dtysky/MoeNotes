/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./config').paths;
const srcPath = paths.srcPath;
const testPath = paths.testPath;

module.exports = {

    debug: true,

    devtool: 'inline-source-map',

    resolve: {
        //root: [srcPath, testPath],
        extensions: ["", ".webpack.js", ".web.js", ".js"],
        alias: {}
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'babel?presets[]=react,presets[]=es2015'
                ]
                //include : srcPath
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(png|jpg|gif|woff|woff2)$/,
                loader: 'url?limit=10'
            },
            {
                test   : /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                loader : 'url?prefix=font/&limit=10000'
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ],
        noParse:[
            'jquery'
        ]
    },

    plugins: [
        new ExtractTextPlugin("main.css"),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $:'jquery'
        })
    ]
};
