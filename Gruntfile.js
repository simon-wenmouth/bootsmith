
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [
            '_release',
            '_site'
        ],
        copy: {
          develop: {
            cwd: 'bower_components/bootstrap/fonts/',
            src: '**',
            dest: '_site/fonts/',
            expand: true
          },
          release: {
            cwd: 'bower_components/bootstrap/fonts/',
            src: '**',
            dest: '_release/fonts/',
            expand: true
          }
        },
        less: {
            develop: {
                options: {
                    paths: ["less/", "bower_components/bootstrap/less/"],
                    sourceMap: true
                },
                files: {
                    "_site/css/theme.css": "less/theme.less"
                }
            },
            release: {
                options: {
                    paths: ["less/", "bower_components/bootstrap/less/"],
                    plugins: [
                        (new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})),
                        (new (require('less-plugin-clean-css'))({keepSpecialComments: 0}))
                    ],
                },
                files: {
                    "_site/css/theme.css": "less/theme.less"
                }
            }
        },
        metalsmith: {
            site: {
                "src": "_posts",
                "dest": "_site",
                "options": {
                    "metadata": { },
                    "plugins": {
                        "metalsmith-define": {
                            "author": "Simon Wenmouth",
                            "tagline": "i build things",
                            "canonical": "http://simon-wenmouth.github.io/bootsmith/"
                        },
                        "metalsmith-drafts": {},
                        "metalsmith-markdown": {
                            "smartypants": true,
                            "gfm": true,
                            "tables": true
                        },
                        "metalsmith-permalinks": {
                            "pattern": ":title"
                        },
                        "metalsmith-paths": true,
                        "metalsmith-excerpts": true,
                        "metalsmith-collections": {
                            "articles": {
                                "sortBy": "date",
                                "reverse": true
                            }
                        },
                        "metalsmith-templates": {
                            "engine": "swig",
                            "directory": "_layouts"
                        }
                    }
                }
            }
        },
        relativeRoot: {
            release: {
                options: {
                    root: '_site'
                },
                files: [{
                    expand: true,
                    cwd: '<%= relativeRoot.release.options.root %>',
                    src: ['**/*.css', '**/*.html'],
                    dest: '_release/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-metalsmith');
    grunt.loadNpmTasks('grunt-relative-root');

    grunt.registerTask('default', [
        'clean',
        'metalsmith:site',
        'less:develop',
        'copy:develop',
    ]);

    grunt.registerTask('release', [
        'clean',
        'metalsmith:site',
        'less:release',
        'copy:release',
        'relativeRoot:release',
    ]);

};
