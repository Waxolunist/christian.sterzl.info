define(['./module'], function (services) {
  'use strict';
  services.factory('templatesService', ['$resource', '$templateCache', '$q', 'utils', function ($resource, $templateCache, $q, utils) {

    var templatePaths = [],
        templateResource = $resource('/templates/templates.json', {}, {
          get: {
            method: "GET",
            cache: true
          }
        }),
        templateData,
        templateBase = 'templates/',
        templateName = function(array) {
          return templateBase + array.join('.');
        };

    var loadTemplates = function () {
      return templateResource.get({}, function(data, header) {
        data.result.forEach(function(item) {
          $templateCache.put(templateBase + item.path, utils.readBuffer(item.contents));
          templatePaths.push(templateBase + item.path);
        }); 
      });
    };

    return {

      getTemplateUrl: function (resourcename, collection, type) {
        var deferred = $q.defer();
        if(angular.isUndefined(templateData)) {
          templateData = loadTemplates();
        }
        templateData.$promise.then(function() {
          var templateArray = [resourcename, collection, type, 'html'].filter(function (val) {
            return angular.isString(val) || angular.isNumber(val);
          });
          while(templateArray.length > 0) {
            if(templatePaths.indexOf(templateName(templateArray)) > -1) {
              deferred.resolve(templateName(templateArray));
              return;
            }
            templateArray.shift();
          }
          deferred.resolve(templateBase + 'item.html');
        });
        return deferred.promise;
      }
    };
  }]);
});
