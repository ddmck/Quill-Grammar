'use strict';
module.exports =

angular
  .module('quill-grammar.index', [
    require('./../../directives/grammarElements/ruleQuestion/').name,
    require('./../../services/auth.js').name
  ])
  .config(require('./index.config.js'))
  .controller('index', require('./index.controller.js'));
