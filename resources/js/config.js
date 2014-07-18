define(['./app'], function (app) {
  'use strict';
  return app.config(['$routeProvider', '$locationProvider', '$provide', function ($routeProvider, $locationProvider, $provide) {
    /*
    //Needs rewrite server side
    $provide.decorate('$sniffer', function($delegate) {
      $delegate.history = false;
      return $delegate;
    });
    */
    $routeProvider
      .when('/', {
         controller: 'RootCtrl',
         template: ''
      })
      .when('/:resource*', {
        controller: 'CCCtrl',
        template: '<div ng-include="templateUrl">Loading...</div>'
        //templateUrl: 'templates/item.html'
    });
    $locationProvider.hashPrefix('!');
    //$locationProvider.html5Mode(true);
  }]);
});
