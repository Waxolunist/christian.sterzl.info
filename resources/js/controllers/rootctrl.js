define(['./module'], function (controllers) {
  'use strict';
  controllers.controller('RootCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $rootScope.isActive = false;
  }]);
});

