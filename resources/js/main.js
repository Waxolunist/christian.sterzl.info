/* jshint undef: true, unused: true */
/* global require */

(function () {
  'use strict';

  require.config({

    paths: {
      'domReady': '../components/requirejs-domready/domReady',
      'angular': '../components/angular/angular',
      'angular-route': '../components/angular-route/angular-route'
    },
    shim: {
      'angular': {
        exports: 'angular'
      },
      'angular-route': {
        deps: ['angular']
      }
    },
    deps: ['./bootstrap']
  });
})();
