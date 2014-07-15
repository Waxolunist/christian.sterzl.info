define(['./app'], function (app) {
  'use strict';
  return app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
         controller: 'RootCtrl',
         template: ''
      })
      .when('/:resource*', {
        controller: 'CCCtrl',
        //template: '<div ng-include="templateUrl">Loading...</div>'
        templateUrl: 'templates/item.html'
    });
    $locationProvider.hashPrefix('!');
    //$locationProvider.html5Mode(true);
  }]);
});
