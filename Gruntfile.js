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
            root: paths.rootPath,
            src: paths.srcPath,
            dist: paths.distPath,
            release: paths.releasePath
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
                            '<%= pkg.src %>/theme/styles/katex.css'
                        ],
                        dest: '<%= pkg.dist %>/theme/styles/katex.css',
                        filter: 'isFile'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: [
                            '<%= pkg.src %>/index.html',
                            '<%= pkg.root %>/package.json',
                            '<%= pkg.root %>/mainRelease.js',
                            '<%= pkg.root %>/init.js',
                            '<%= pkg.root %>/config.js',
                            '<%= pkg.root %>/logo.png',
                            '<%= pkg.root %>/LICENSE'
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
            },
            release: {
                files: [{
                    dot: true,
                    src: [
                        '<%= pkg.release %>'
                    ]
                }]
            }
        },

        rename: {
            dist: {
                files: [
                    {
                        src: ['<%= pkg.dist %>/mainRelease.js'],
                        dest: '<%= pkg.dist %>/main.js'
                    }
                ]
            }
        },

        'electron-packager': {
            buildAll: {
                options: {
                    name: 'MoeNotes',
                    "app-version": "0.8.0",
                    "app-copyright": "Tianyu Dai (dtysky) <dtysky@outlook.com>",
                    icon: "<%= pkg.root %>/logo",
                    dir: 'dist',
                    out: 'release',
                    version: '0.37.2',
                    platform: 'all',
                    prune: true,
                    arch: 'all'
                }
            },
            buildOSX: {
                options: {
                    name: 'MoeNotes',
                    "app-version": "0.8.0",
                    "app-copyright": "Tianyu Dai (dtysky) <dtysky@outlook.com>",
                    icon: "<%= pkg.root %>/logo",
                    dir: 'dist',
                    out: 'release',
                    version: '0.37.2',
                    platform: 'darwin',
                    prune: true,
                    arch: 'all'
                }
            },
            buildLinux: {
                options: {
                    name: 'MoeNotes',
                    "app-version": "0.8.0",
                    "app-copyright": "Tianyu Dai (dtysky) <dtysky@outlook.com>",
                    icon: "<%= pkg.root %>/logo",
                    dir: 'dist',
                    out: 'release',
                    version: '0.37.2',
                    platform: 'linux',
                    prune: true,
                    arch: 'all'
                }
            },
            buildWindows: {
                options: {
                    name: 'MoeNotes',
                    "app-version": "0.8.0",
                    "app-copyright": "Tianyu Dai (dtysky) <dtysky@outlook.com>",
                    icon: "<%= pkg.root %>/logo",
                    dir: 'dist',
                    out: 'release',
                    version: '0.37.2',
                    platform: 'win32',
                    prune: true,
                    arch: 'all'
                }
            }
        },

        shell: {
            test: {
                command: 'node_modules/.bin/babel-node node_modules/.bin/babel-istanbul cover node_modules/.bin/jasmine --colors'
            }
        }

    });

    grunt.registerTask('debug', ['webpack-dev-server']);

    grunt.registerTask('test', ['shell:test']);

    grunt.registerTask('build-pre', ['clean:dist', 'webpack:dist', 'copy:dist', 'rename:dist']);

    grunt.registerTask('build-osx', ['clean:release', 'electron-packager:buildOSX']);
    grunt.registerTask('build-linux', ['clean:release', 'electron-packager:buildLinux']);
    grunt.registerTask('build-windows', ['clean:release', 'electron-packager:buildWindows']);
    grunt.registerTask('build-all', ['clean:release', 'electron-packager:buildAll']);

    grunt.registerTask('release-osx', ['pre-build', 'build-osx']);
    grunt.registerTask('release-linux', ['pre-build', 'build-linux']);
    grunt.registerTask('release-windows', ['pre-build', 'build-windows']);
    grunt.registerTask('release-all', ['pre-build', 'build-all']);

    grunt.registerTask('default', ['debug']);
};