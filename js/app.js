var ngModule = angular.module('website', ['ngAnimate', 'ngTouch']);

  ngModule.controller('MainCtrl', function ($scope, $http, $timeout) {
      // some difficulty implementing the json fiile into the scope
      // $scope.slides = [];
      // picInfo.success(function(data) {
      //   debugger
      //   $scope.foo = "Hello "+data.contentItem[0].username;
      // });
      $http.get('gallery.json').success(function(data) {
        $scope.currentSlide = data.photos[0];
        $scope.slides = data.photos;
      });
      // $.getJSON("gallery.json", function( data ) {
        // gives cross origin because I am running from htlm, I will
        // come back to this if I can't fix it in a different way
        // I like the http.get better so I am using that but to get over
        // the cross origin I npm installed http-services and ran the app
        // through there.
      // });

        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlide = function(index){
          $scope.currentSlide = $scope.slides[index];
        }

        $scope.setCurrentSlideIndex = function (index) {
          $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
          $scope.currentIndex = index;
          $scope.setCurrentSlide(index);
        };

        $scope.isCurrentSlideIndex = function (index) {
          return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
          $scope.direction = 'left';
          $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
          $scope.setCurrentSlide($scope.currentIndex);
        };

        $scope.nextSlide = function () {
          $scope.direction = 'right';
          $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
          $scope.setCurrentSlide($scope.currentIndex);
        };

        // Adding timeout function so that the slider will auto scroll
        var timer;

        var sliderFunc=function(){
    			timer=$timeout(function(){
    				$scope.prevSlide();
    				timer=$timeout(sliderFunc,5000);
    			},5000);
    		};

    		sliderFunc();

    		$scope.$on('$destroy',function(){
    			$timeout.cancel(timer);
    		});
    });
    ngModule.animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    });
