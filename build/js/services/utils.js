define(['./module'], function (services) {
  'use strict';
  services.factory('utils', [function () {
    return {
      //content is expected to be an array of objects. 
      //tagField a key within an object of that Array
      wordcount : function(content, tagField, delimiter) {
        tagField = tagField || 'tags';
        delimiter = delimiter || ' ';
        //returns an array of arrays
        var tags = content.map(function(val) {
          return val[tagField].split(delimiter);
        });
        //flatten array
        tags = [].concat.apply([], tags);
        var retVal = tags.reduce(function(prev, cur, idx, arr) {
          prev[cur] = ++prev[cur] || 1;
          return prev;
        }, {});
        return retVal;
      }
    };
  }]);
});
