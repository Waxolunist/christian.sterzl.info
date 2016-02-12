define(['./module'], function (controllers) {
  'use strict';
  controllers.controller('RootCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    $rootScope.isActive = false;

    //Google tracking
    $scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
      if(angular.isFunction(window.ga)) {
        ga('send', 'pageview', $location.url());
      }
    });
  }]);
});

