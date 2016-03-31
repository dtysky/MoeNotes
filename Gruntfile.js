/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description:
 */


const grunt = require('grunt');
const webpackDevConfig = require('./webpack.config.js');
const paths = require('./config').paths;
const mock = require('mock-fs');

module.exports = function (grunt) {
    // Let *load-grunt-tasks* require everything
    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
    });

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
        },

        shell: {
            test: {
                command: 'node_modules/.bin/babel-node node_modules/.bin/babel-istanbul cover node_modules/.bin/jasmine --colors'
            }
        }

    });

    grunt.registerTask("mock", "Mock file system", function(){
        mock({
            ".tree": JSON.stringify({
                now: "book1",
                indexes: [
                    "book1"
                ],
                names: {
                    book1: "bookA"
                }
            }),
            book1: {
                book1: {
                    cp1: {
                        "page1.md": "Here is page1 in cp1",
                        "page3.md": "Here is page3 in cp1"
                    },
                    cp2: {
                        "page1.md": "Here is page1 in cp2",
                        "page3.md": "Here is page3 in cp2"
                    }
                }
            }
        });
    });

    grunt.registerTask('debug', ["mock", 'webpack-dev-server']);

    grunt.registerTask('test-web', ['karma']);

    grunt.registerTask('test-node', ['shell:test']);

    grunt.registerTask('build', ['build-atom-shell']);

    grunt.registerTask('default', ['build']);
};