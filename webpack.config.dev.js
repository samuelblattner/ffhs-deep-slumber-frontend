'use strict';

const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        'deep-slumber-main': './vuejs/deep-slumber-main/main.js',
        'styles': './vuejs/deep-slumber-main/styles/main.scss',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve('assets/dev/')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.svg$/,
                loader: 'vue-svg-loader'
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: './node_modules/bulma/css/bulma.min.css',
            to: './css/libs/bulma'
        },{
            from: './node_modules/@fortawesome/fontawesome-free/',
            to: './css/libs/fontawesome'
        },{
            from: './index.html',
            to: './'
        },
        ]),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        })
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    },
    watchOptions: {
        poll: 5000
    }
};