define(['./module'], function (controllers) {
  'use strict';
controllers.controller('CCCtrl', ['$scope', '$routeParams', 'contentResource', function ($scope, $routeParams, Content) {

    var loadContent = function(params, scope) {
      if(angular.isDefined(params.resource)) {
        Content.get({path: params.resource}, function(contentObj, header) {
          scope.res = contentObj;
        });
      }
    };

    var isActive = function() {
      return true;
    };

    loadContent($routeParams, $scope);
  }]);
});
