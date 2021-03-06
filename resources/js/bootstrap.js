/**
 * bootstraps angular onto the window.document node
 */
define([
  'require',
  'angular',
  'domReady',
  'app',
  'config',
  'viewport-units-buggyfill',
  'object-fit'
], function (require, ng) {
  'use strict';

  //Polyfills
  require('viewport-units-buggyfill').init();
  var objectFit = require('object-fit');
  objectFit._debug = true;
  objectFit.polyfill({
    selector: '.storyjs-embed .content-container .media .media-image img',
    fittype: 'contain',
    disableCrossDomain: 'true'
  });

  require(['domReady!'], function (document) {
    ng.bootstrap(document, ['app']);
  });
});
