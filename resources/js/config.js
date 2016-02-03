define(['./app'], function (app) {
  'use strict';
  return app.config(['$routeProvider', '$locationProvider', '$provide', function ($routeProvider, $locationProvider, $provide) {
    $routeProvider
      .when('/', {
         controller: 'RootCtrl',
         template: ''
      })
      .when('/:resource*', {
        controller: 'CCCtrl',
        template: '<div ng-include="templateUrl">Loading...</div>',
        reloadOnSearch: false
      });
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }]);
});
