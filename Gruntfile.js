/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description:
 */


const grunt = require('grunt');
const webpackDevConfig = require('./webpack.config.js');
const webpackDistConfig = require('./webpack.dist.config.js');
const paths = require('./config').paths;

module.exports = function (grunt) {
    // Let *load-grunt-tasks* require everything
    require('load-grunt-tasks')(grunt);

    // Read configuration from package.json
    var pkgConfig = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: {
            src: paths.srcPath,
            dist: paths.distPath
        },

        'webpack-dev-server': {
            options: {
                hot: true,
                port: paths.debugPort,
                webpack: webpackDevConfig,
                publicPath: '/assets/',
                contentBase: paths.srcPath,
                historyApiFallback: true
            },

            start: {
                keepAlive: true
            }
        },

        webpack:{
            dist: webpackDistConfig
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= pkg.src %>/theme/images",
                        src: '**/*',
                        dest: '<%= pkg.dist %>/theme/images/'
                    },
                    {
                        expand: true,
                        cwd: "<%= pkg.src %>/theme/fonts",
                        src: '**/*',
                        dest: '<%= pkg.dist %>/theme/fonts/'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.src %>/theme/config/*'],
                        dest: '<%= pkg.dist %>/theme/config/',
                        filter: 'isFile'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: [
                            '<%= pkg.src %>/index.html'
                        ],
                        dest: '<%= pkg.dist %>/',
                        filter: 'isFile'
                    }
                ]
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= pkg.dist %>'
                    ]
                }]
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

    grunt.registerTask('debug', ['webpack-dev-server']);

    grunt.registerTask('test', ['shell:test']);

    grunt.registerTask('pre-build', ['clean:dist', 'webpack:dist', 'copy:dist']);

    grunt.registerTask('build', ['build-atom-shell']);

    grunt.registerTask('release', ['pre-build', 'build']);

    grunt.registerTask('default', ['build']);
};