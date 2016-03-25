/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/24
 * Description: Karma configuration.
 */

const webpack = require("webpack");
const path = require("path");
const webpackConfig = require('./webpack.karma.config.js');
const paths = require('./helpers/config').paths;

const srcFiles = paths.srcPath + "/*.js";
const testFiles = paths.testPath + "/**/test-*.js";

var preprocessors = {};
preprocessors[testFiles] = ["webpack"];
preprocessors[srcFiles] = ["webpack", "coverage"];

module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        files: [
            srcFiles,
            testFiles
        ],
        preprocessors: preprocessors,
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: false
        },
        plugins: [
            require("karma-webpack"),
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-coverage")
        ],
        reporters: ["dots", 'coverage'],
        coverageReporter: {
            reporters: [
                {
                    type: 'text-summary'
                },
                {
                    type: 'html',
                    dir: 'build/reports/coverage'
                }
            ]
        },
        port: 8000,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["Chrome"],
        singleRun: true
    });
};