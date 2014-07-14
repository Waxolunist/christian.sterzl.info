/* jshint undef: true, unused: true */
/* global require */

(function () {
  'use strict';

  require.config({

    paths: {
      'domReady': '../components/requirejs-domready/domReady',
      'angular': '../components/angular/angular',
      'angular-route': '../components/angular-route/angular-route',
      'angular-resource': '../components/angular-resource/angular-resource',
      'ByteBuffer': '../components/bytebuffer/dist/ByteBufferAB'
    },
    shim: {
      'angular': {
        exports: 'angular'
      },
      'angular-route': {
        deps: ['angular']
      },
      'angular-resource': {
        deps: ['angular']
      }
    },
    deps: ['./bootstrap']
  });
})();
