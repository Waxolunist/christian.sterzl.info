define([
  'angular',
  'angular-route',
  'angular-resource',
  'angular-sanitize',
  'angular-meta',
  './controllers/index',
  './directives/index',
  './services/index',
  './filters/index'
], function (ng) {
  'use strict';

  return ng.module('app', [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'meta',
    'app.controllers',
    'app.directives',
    'app.services',
    'app.filters'
  ]);
});
