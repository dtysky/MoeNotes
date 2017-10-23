"use strict";
exports.__esModule = true;
var env = process.env.NODE_ENV;
var devMode = env === 'development';
var rootPath = __dirname;
var devConfig = {
    env: 'development',
    devMode: true,
    paths: {
        root: rootPath,
        src: rootPath + "/src",
        entry: 'http://localhost:4444'
    }
};
var releaseConfig = {
    env: 'release',
    devMode: false,
    paths: {
        root: rootPath,
        src: rootPath + "/src",
        entry: 'http://localhost:4444'
    }
};
var config = devMode ? devConfig : releaseConfig;
exports["default"] = config;
