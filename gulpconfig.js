'use strict';
var utilities = require('empirical-angular-gulp-tasks/utilities');

module.exports = {
  src: './src',
  assets: 'assets',
  assets_images: 'images',
  scripts: 'scripts',
  scripts_app: 'app',
  scripts_app_entry: 'app.module.js',
  scripts_app_vendors: 'vendors.js',
  scripts_config: utilities.config.getFile() || (utilities.env.getEnv() + '.config.json'),
  scripts_index: 'index.jade',
  scripts_app_output: 'app.js',
  scripts_app_output_partial: 'app*',
  scripts_vendors_output: 'vendors.js',
  scripts_vendors_output_partial: 'vendors*',
  styles: 'styles',
  styles_main: 'main.scss',
  styles_output: 'app',
  build: './build',
  dist: './dist',
  tmp: './.tmp',
  tmp_config_module: 'quill-grammar.config',
  tmp_config_output: 'config',
  tmp_templates_module: 'quill-grammar.templates',
  tmp_templates_output: 'templates.js',
};
