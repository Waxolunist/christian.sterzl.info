define(['./module'], function (controllers) {
  'use strict';
controllers.controller('CCCtrl', ['$scope', '$routeParams', '$rootScope', 'contentResource', 'templatesService', function ($scope, $routeParams, $rootScope, Content, templatesService) {

    var postProcessContent = function(contentObj) {
      if(contentObj.type === 'list') {
        //set relative paths
        contentObj.result.forEach(function (val, idx, arr) {
          var absPath = val.path;
          val.relPath = /.*\/([^\/]+).html/.match(absPath)[1];
        });
      }
    };

    var loadContent = function(params, scope) {
      if(angular.isDefined(params.resource)) {
        Content.get({path: params.resource}, function(contentObj, header) {
          postProcessContent(contentObj);
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
