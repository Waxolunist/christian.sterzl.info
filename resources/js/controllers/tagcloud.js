define(['./module'], function (controllers) {
  'use strict';
  controllers.controller('tagcloudCtrl', ['$scope', '$location', '$route', function ($scope, $location, $route) {
    $scope.currentTag = $location.hash();
    $scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
      var oldUrlArr = oldUrl.split('#');
      var newUrlArr = newUrl.split('#');
      if (newUrlArr.length === 2 &&
          ((newUrlArr.length !== oldUrlArr.length) ||
          (oldUrlArr.length === newUrlArr.length && 
          oldUrlArr[0] === newUrlArr[0] && 
          oldUrlArr[1] !== newUrlArr[1]))) {
        $route.reload();
      }
    });
  }]);
});

