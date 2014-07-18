define([
  'angular',
  'angular-route',
  'angular-resource',
  './controllers/index',
  './directives/index',
  './services/index',
  './filters/index'
], function (ng, ngRoute, ngResource) {
  'use strict';

  return ng.module('app', [
    'ngRoute',
    'ngResource',
    'app.controllers',
    'app.directives',
    'app.services',
    'app.filters'
  ]);
});
