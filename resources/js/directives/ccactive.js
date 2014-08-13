define(['./module'], function (directives) {
  'use strict';
  directives.directive('ccActive', ['$routeParams', function ($routeParams) {
    /*
     * Adds the class in the ccActive directive given to 
     * the element matching the resource given in its href or the first href.
     */
    return {
      restrict: 'A',
      priority: -1,
      link: function postLink($scope, $element, $attrs) {
        var setClass = function(element, href, resourcename, classname) {
          var splitHref = /^(?:#!|[\/])([^\/]+)(?:[\/].*)?$/i,
              splitResourcename = /^([^\/]+)(?:[\/].*)?$/i;
          if(splitHref.exec(href)[1] === splitResourcename.exec(resourcename)[1]) {
            element.addClass(classname); 
          } else {
            element.removeClass(classname);
          }
        };
        $scope.$on('$routeChangeSuccess', function(event, current) {
          var resourcename = '';
          if(angular.isDefined(current)) {
            resourcename = current.params.resource;
          }
          setClass($element, $attrs.href, resourcename, 'active');
        });
        setClass($element, $attrs.href, $routeParams.resource, 'active');
      }
    };
  }]);
});
