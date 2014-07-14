define(['./module'], function (services) {
  'use strict';
  services.factory('contentResource', ['$resource', '$sce', function ($resource, $sce) {
    return $resource('/content/:path.json', {path: '@path'}, {
      get: {
        method: "GET",
        cache: true,
        transformResponse: function (data, headers) {
          try {
            var dataObj = angular.fromJson(data);
            var contentStr = String.fromCharCode.apply(null, dataObj.contents.data);
            dataObj.contents = $sce.trustAsHtml(contentStr);
            return dataObj;
          } catch (err) {
            //SyntaxErrorException
            console.log(err);
            return data;
          }
        }
      }});
  }]);
});
