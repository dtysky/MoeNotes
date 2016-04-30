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
                            '<%= pkg.src %>/index.html',
                            '<%= pkg.root %>/mainPublic.js',
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
            }
        },

        rename: {
            dist: {
                files: [
                    {
                        src: ['<%= pkg.dist %>/mainPublic.js'],
                        dest: '<%= pkg.dist %>/main.js'
                    }
                ]
            }
        },


        electron: {
            buildAll: {
                options: {
                    name: 'MoeNotes',
                    "app-version": "0.8.0",
                    icon: "logo.png",
                    dir: 'dist',
                    out: 'public',
                    version: '0.37.2',
                    platform: 'all',
                    arch: 'all',
                    overwrite: true
                }
            }
            //osxBuild32: {
            //    options: {
            //        name: 'MoeNotes',
            //        dir: 'dist',
            //        out: 'public/osx64',
            //        version: '0.37.2',
            //        platform: 'darwin',
            //        arch: 'x86'
            //    }
            //},
            //linuxBuild64: {
            //    options: {
            //        name: 'MoeNotes',
            //        dir: 'dist',
            //        out: 'public/osx32',
            //        version: '0.37.2',
            //        platform: 'darwin',
            //        arch: 'x64'
            //    }
            //},
            //linuxBuild32: {
            //    options: {
            //        name: 'MoeNotes',
            //        dir: 'dist',
            //        out: 'public/osx64',
            //        version: '0.37.2',
            //        platform: 'darwin',
            //        arch: 'x86'
            //    }
            //},
            //windowsBuild64: {
            //    options: {
            //        name: 'MoeNotes',
            //        dir: 'dist',
            //        out: 'public/osx32',
            //        version: '0.37.2',
            //        platform: 'darwin',
            //        arch: 'x64'
            //    }
            //},
            //windowsBuild32: {
            //    options: {
            //        name: 'MoeNotes',
            //        dir: 'dist',
            //        out: 'public/osx64',
            //        version: '0.37.2',
            //        platform: 'darwin',
            //        arch: 'x86'
            //    }
            //}
        },

        shell: {
            test: {
                command: 'node_modules/.bin/babel-node node_modules/.bin/babel-istanbul cover node_modules/.bin/jasmine --colors'
            }
        }

    });

    grunt.registerTask('debug', ['webpack-dev-server']);

    grunt.registerTask('test', ['shell:test']);

    grunt.registerTask('pre-build', ['clean:dist', 'webpack:dist', 'copy:dist', 'rename:dist']);

    grunt.registerTask('build', ['electron:buildAll']);

    grunt.registerTask('release', ['pre-build', 'build']);

    grunt.registerTask('default', ['debug']);
};