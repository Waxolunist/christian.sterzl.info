define(['./module'], function (directives) {
  'use strict';
  directives.directive('tagcloud', ['$location', 'utils', function ($location, utils) {
    return {
      restrict: 'E',
      priority: -1,
      templateUrl: 'templates/tagcloud.html',
      scope: {
        tagSource: '&'
      },
      controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
        var tagObject = utils.wordcount($scope.tagSource(), $attrs.tagField, $attrs.tagDelimiter),
            tagArray = Object.keys(tagObject).map(function (key) {
              return {
                tag: key,
                count: tagObject[key]
              };
            });
        $scope.taglist = tagArray;
        $scope.path = $location.path();
        $scope.currentTag = $location.hash();
      }]
    };
  }]);
});
