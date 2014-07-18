define(['./module'], function (controllers) {
  'use strict';
  controllers.controller('tagcloudCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.currentTag = $location.hash();
    $scope.path = $location.path();
  }]);
});

