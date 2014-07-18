define(['./module'], function (filters) {
  'use strict';
  filters.filter('split', [function () {
    return function (input, delimiter) {
      if (angular.isDefined(input)) {
        delimiter = delimiter || ' ';
        return input.split(delimiter);
      }
      return undefined;
    };
  }]);
});
