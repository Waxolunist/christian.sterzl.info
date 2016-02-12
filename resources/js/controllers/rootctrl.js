define(['./module'], function (controllers) {
  'use strict';
  controllers.controller('RootCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $rootScope.isActive = false;

    //Google tracking
    $scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
      if(angular.isFunction(ga)) {
        ga('send', 'pageview', newUrl);
      }
    });
  }]);
});

