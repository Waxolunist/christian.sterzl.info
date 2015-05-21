define([
  'angular',
  'angular-route',
  'angular-resource',
  'angular-sanitize',
  'angular-material',
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
    'ngMaterial',
    'app.controllers',
    'app.directives',
    'app.services',
    'app.filters'
  ]);
});
