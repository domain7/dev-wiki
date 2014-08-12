'use strict';

module.exports = function(grunt) {

  // Configuration goes here
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    //compass
    compass: {
      dist: {
        options: {
          config: "config.rb",
        }
      }
    },//END compass

    haml: {
      dist: {
        expand: true,
        cwd: 'haml/',
        src: ['*.haml'],
        dest: './',
        ext: '.html'
      },
    },

    // Some typical JSHint options and globals
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },

/*
    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: 'markdown/*.md',
            dest: 'html/',
            ext: '.html'
          }
        ]
      }
    },
*/

    //uglify
    uglify: {
      dist: {
      options: {
          beautify: true
        },
        files: {
          'js/main.min.js': 'js/main.js'
        }
      }
    },//END uglify

    //watch
    watch: {
      scripts: {
        files: [
          'stylesheets/scss/*.scss',
//          'markdown/*.md',
          'haml/*.haml',
        ],
        tasks: [
          'compass',
//          'markdown',
          'haml',
        ]
      }
    }//END watch

  });

  // Load plugins here
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-haml');
  grunt.loadNpmTasks('grunt-contrib-jshint');
//  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Define your tasks here
  grunt.registerTask('default', [
    'clean',
    'haml',
//    'markdown',
    'uglify',
    'compass',
    'watch',
    'clean',
  ]);

};