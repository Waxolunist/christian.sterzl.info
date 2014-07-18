define(['./module'], function (filters) {
  'use strict';
  filters.filter('toArray', [function () {

    return function (obj) {
        if (!(obj instanceof Object)) {
            return obj;
        }

        var arr = Object.keys(obj).map(function (key) {
          return {
            key: key,
            value: obj[key]
          };
        });
        return arr;
    };
  }]);
});
