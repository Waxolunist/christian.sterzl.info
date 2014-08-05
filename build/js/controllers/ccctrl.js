define(['./module'], function (controllers) {
  'use strict';
controllers.controller('CCCtrl', ['$scope', '$routeParams', '$rootScope', '$location', '$compile', 'contentResource', 'templatesService', function ($scope, $routeParams, $rootScope, $location, $compile, Content, templatesService) {

    var postProcessContent = function(contentObj) {
      if(contentObj.type === 'list') {
        //set relative paths
        contentObj.result.forEach(function (val, idx, arr) {
          val.relPath = /.*\/([^\/]+).html/.exec(val.path)[1];
          val.absPath = $location.path() + '/' + val.relPath;
        });
      }
    };

    var loadContent = function(params, scope) {
      if(angular.isDefined(params.resource)) {
        Content.get({path: params.resource}, function(contentObj, header) {
          postProcessContent(contentObj);
          scope.res = contentObj;
          templatesService.getTemplateUrl(params.resource, contentObj.collection, contentObj.type).then(function(templateUrl) {
            scope.templateUrl = templateUrl;
          });
        });
      }
    };
    $rootScope.isActive = true;
    loadContent($routeParams, $scope);
  }]);
});
