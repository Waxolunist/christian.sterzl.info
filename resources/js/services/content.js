define(['./module'], function (services) {
  'use strict';
  services.factory('contentResource', ['$resource', '$sce', 'utils', function ($resource, $sce, utils) {
    return $resource('/content/:path.json', {path: '@path'}, {
      get: {
        method: "GET",
        cache: true,
        transformResponse: function (data, headers) {
          try {
            var dataObj = angular.fromJson(data);
            var contentStr = utils.readBuffer(dataObj.contents);
            if(contentStr)
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
