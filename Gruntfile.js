'use strict';
module.exports = function (grunt) {

    var npmDependencies = require('./package.json').devDependencies;
    var hasSass = npmDependencies['grunt-contrib-sass'] !== undefined;

    grunt.initConfig({
        // Watches for changes and runs tasks
        watch: {
            sass: {
                files: ['scss/**/*.scss'],
                tasks: (hasSass) ? ['sass:dev', 'autoprefixer'] : null,
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['js/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            php: {
                files: ['**/*.php'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['**/*.html'],
                options: {
                    livereload: true
                }
            }
        },
        // JsHint your javascript
        jshint: {
            all: ['js/*.js', '!js/modernizr.js', '!js/*.min.js', '!lib/**/*.js'],
            options: {
                browser: true,
                curly: false,
                eqeqeq: false,
                eqnull: true,
                expr: true,
                immed: true,
                newcap: true,
                noarg: true,
                smarttabs: true,
                sub: true,
                undef: false
            }
        },
        // Dev and production build for sass
        sass: {
            production: {
                files: [
                    {
                        src: ['**/*.scss', '!**/_*.scss'],
                        cwd: 'scss',
                        dest: 'css',
                        ext: '.css',
                        expand: true
                    }
                ],
                options: {
                    style: 'compressed'
                }
            },
            dev: {
                files: [
                    {
                        src: ['**/*.scss', '!**/_*.scss'],
                        cwd: 'scss',
                        dest: 'css',
                        ext: '.css',
                        expand: true
                    }
                ],
                options: {
                    style: 'expanded'
                }
            }
        },
        // Bower task sets up require config
        bower: {
            all: {
                rjsConfig: 'js/global.js'
            }
        },
        // Image min
        imagemin: {
            production: {
                files: [
                    {
                        expand: true,
                        cwd: 'images',
                        src: '**/*.{png,jpg,jpeg}',
                        dest: 'images'
                    }
                ]
            }
        },
        // SVG min
        svgmin: {
            production: {
                files: [
                    {
                        expand: true,
                        cwd: 'images',
                        src: '**/*.svg',
                        dest: 'images'
                    }
                ]
            }
        }

    });

    // Default task
    grunt.registerTask('default', ['watch']);

    // Build task
    grunt.registerTask('build', function () {
        var arr = ['jshint'];

        if (hasSass) {
            arr.push('sass:production');
        }

        arr.push('imagemin:production', 'svgmin:production');

        return arr;
    });

    // Template Setup Task
    grunt.registerTask('setup', function () {
        var arr = [];

        if (hasSass) {
            arr.push['sass:dev'];
        }

        arr.push('bower-install');
    });

    // Load up tasks
    if (hasSass) {
        grunt.loadNpmTasks('grunt-contrib-sass');
    }

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');

    // Run bower install
    grunt.registerTask('bower-install', function () {
        var done = this.async();
        var bower = require('bower').commands;
        bower.install().on('end', function (data) {
            done();
        }).on('data', function (data) {
            console.log(data);
        }).on('error', function (err) {
            console.error(err);
            done();
        });
    });
};
