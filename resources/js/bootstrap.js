/**
 * bootstraps angular onto the window.document node
 */
define([
  'require',
  'angular',
  'domReady',
  'app',
  'config',
  'viewport-units-buggyfill'
], function (require, ng) {
  'use strict';

  require('viewport-units-buggyfill').init();

  require(['domReady!'], function (document) {
    ng.bootstrap(document, ['app']);
  });
});
