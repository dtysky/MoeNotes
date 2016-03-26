/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description:
 */


const grunt = require('grunt');
const webpackDevConfig = require('./webpack.config.js');
const paths = require('./config').paths;

module.exports = function (grunt) {
    // Let *load-grunt-tasks* require everything
    require('load-grunt-tasks')(grunt);

    // Read configuration from package.json
    var pkgConfig = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkgConfig,

        'webpack-dev-server': {
            options: {
                hot: true,
                port: 8000,
                webpack: webpackDevConfig,
                publicPath: '/assets/',
                contentBase: paths.srcPath,
                historyApiFallback: true
            },

            start: {
                keepAlive: true
            }
        },

        karma: {
            unit: {
                configFile: './karma.config.js'
            }
        },

        'build-atom-shell': {
            tag: 'v0.19.5',
            nodeVersion: '0.18.0',
            buildDir: (process.env.TMPDIR || process.env.TEMP || '/tmp') + '/atom-shell',
            projectName: 'mycoolapp',
            productName: 'MyCoolApp'
        }

    });

    grunt.registerTask('debug', ['webpack-dev-server']);

    grunt.registerTask('unittest', ['karma']);

    grunt.registerTask('build', ['build-atom-shell']);

    grunt.registerTask('default', ['build']);
};