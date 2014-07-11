define([
  'angular',
  'angular-route',
  './controllers/index'
], function (ng, ngRoute) {
  'use strict';

  return ng.module('app', [
    'ngRoute',
    'app.controllers'
  ]);
});
