/* jshint undef: true, unused: true */
/* global require */

(function () {
  'use strict';

  require.config({

    paths: {
      'domReady': '../components/requirejs-domready/domReady',
      'jquery': '../components/jquery/dist/jquery',
      'angular': '../components/angular/angular',
      'angular-route': '../components/angular-route/angular-route',
      'angular-resource': '../components/angular-resource/angular-resource',
      'angular-sanitize': '../components/angular-sanitize/angular-sanitize',
      'marked': '../components/marked/lib/marked',
      'slick': '../components/slick-carousel/slick/slick'
    },
    shim: {
      'jquery': {
        exports: 'jquery'
      },
      'angular': {
        exports: 'angular',
        deps: ['jquery']
      },
      'angular-route': {
        deps: ['angular']
      },
      'angular-resource': {
        deps: ['angular']
      },
      'angular-sanitize': {
        deps: ['angular']
      },
      'marked': {
        exports: 'marked'
      }
    },
    deps: ['./bootstrap']
  });
})();
