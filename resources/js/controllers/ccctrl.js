define(['./module'], function (controllers) {
  'use strict';
controllers.controller('CCCtrl', ['$scope', '$routeParams', '$rootScope', 'contentResource', function ($scope, $routeParams, $rootScope, Content) {

    var loadContent = function(params, scope) {
      if(angular.isDefined(params.resource)) {
        Content.get({path: params.resource}, function(contentObj, header) {
          scope.res = contentObj;
        });
      }
    };

    $rootScope.isActive = true;
    loadContent($routeParams, $scope);
  }]);
});
