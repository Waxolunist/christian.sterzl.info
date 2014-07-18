define(['./module', 'marked'], function (filters, marked) {
  'use strict';
  filters.filter('markdown', ['$sce', function ($sce) {
    return function (input) {
      if (angular.isDefined(input)) {
        return $sce.trustAsHtml(marked(input));
      }
      return undefined;
    };
  }]);
});
