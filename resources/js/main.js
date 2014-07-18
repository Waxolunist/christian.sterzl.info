/* jshint undef: true, unused: true */
/* global require */

(function () {
  'use strict';

  require.config({

    paths: {
      'domReady': '../components/requirejs-domready/domReady',
      'jQuery': '../components/jquery/dist/jquery.min',
      'angular': '../components/angular/angular.min',
      'angular-route': '../components/angular-route/angular-route.min',
      'angular-resource': '../components/angular-resource/angular-resource.min',
      'marked': '../components/marked/lib/marked'
    },
    shim: {
      'jQuery': {
        exports: 'jQuery'
      },
      'angular': {
        exports: 'angular',
        deps: ['jQuery']
      },
      'angular-route': {
        deps: ['angular']
      },
      'angular-resource': {
        deps: ['angular']
      },
      'marked': {
        exports: 'marked'
      }
    },
    deps: ['./bootstrap']
  });
})();
