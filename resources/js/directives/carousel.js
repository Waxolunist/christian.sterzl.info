define(['./module', 'slick'], function (directives) {
  'use strict';
  directives.directive('carousel', [function () {
    return {
      restrict: 'E',
      priority: -1,
      templateUrl: 'templates/carousel.html',
      transclude: true,
      replace: true,
      scope: {},
      controller: function($scope, $element){
      },
      link: function($scope, $element) {
        $element.slick({
          autoplay: true,
          dots: true
        });
      }
    };
  }]);
  directives.directive('carouselItem', [function () {
    return {
      require: '^carousel',
      restrict: 'E',
      priority: -1,
      transclude: true,
      replace: true,
      scope: {
        src: '@'
      },
      link: function($scope, $element, $attrs, carouselCtrl) {
      },
      templateUrl: 'templates/carousel-item.html'
    };
  }]);
});
