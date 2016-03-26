/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/24
 * Description: Karma configuration.
 */

const webpack = require("webpack");
const path = require("path");
const webpackConfig = require('./webpack.karma.config.js');

const srcFiles = "./src/*.js";
const testFiles = "./tests/test-*.js";

var preprocessors = {};
preprocessors[testFiles] = ["webpack", "sourcemap"];
preprocessors[srcFiles] = ["webpack", "sourcemap", "coverage"];

module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        files: [
            //srcFiles,
            testFiles
        ],
        preprocessors: preprocessors,
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true,
            stats: {
                colors: true
            }
        },
        plugins: [
            require("karma-webpack"),
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-coverage"),
            require("karma-sourcemap-loader")
        ],
        reporters: ["dots", 'coverage'],
        coverageReporter: {
            reporters: [
                {
                    type: 'text-summary'
                },
                {
                    type: 'html',
                    dir: 'reports/coverage'
                }
            ]
        },
        port: 8000,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["Chrome"],
        singleRun: false
    });
};