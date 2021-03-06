module.exports = function (grunt) {
  'use strict';

  // Load in grunt tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-lintspaces');

  grunt.initConfig({
    jshint: {
      all: ['*.js', 'src/scripts/**/**/*.js', 'test/**/*.js'],
      options: require('./.jshintrc.json')
    },
    jscs: {
      all: '<%= jshint.all %>',
      options: {
        config: '.jscsrc'
      }
    },
    lintspaces: {
      src: ['*', 'src/**/*', 'test/**/*', '!**/*.png'],
      options: {
        editorconfig: '.editorconfig'
      }
    }
  });

  grunt.registerTask('lint', ['jshint', 'jscs']);
};
