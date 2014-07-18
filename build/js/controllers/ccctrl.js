define(['./module'], function (controllers) {
  'use strict';
controllers.controller('CCCtrl', ['$scope', '$routeParams', '$rootScope', 'contentResource', 'templatesService', function ($scope, $routeParams, $rootScope, Content, templatesService) {

    var loadContent = function(params, scope) {
      if(angular.isDefined(params.resource)) {
        Content.get({path: params.resource}, function(contentObj, header) {
          scope.res = contentObj;
          templatesService.getTemplateUrl(params.resource, contentObj.type).then(function(templateUrl) {
            scope.templateUrl = templateUrl;
          });
        });
      }
    };
    $rootScope.isActive = true;
    loadContent($routeParams, $scope);
  }]);
});
