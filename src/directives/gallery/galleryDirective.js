
galleryApp.directive('gallery', function() {
  return {
    restrict: 'E',
    require: ['ngModel', 'gallery'],
    templateUrl: 'src/directives/gallery/galleryTemplate.html',
    bindToController: true,
    scope: {
      gallery: '=ngModel'
    },
    controllerAs: 'galleryCtrl',
    controller: function() {
    	/*
    		I decided to take the approach of displaying a main image in the gallery
    		with a previous or next photo if available.
    	*/
      this.title = null;
      this.viewableImages = [];
      this.previous = [];
      this.next = [];
      this.start = 0;
      this.end = this.start + 1;

      this.setValues = function(gallery) {
        this.title = gallery['gallery-title'] || 'Untitled Gallery';
        this.gallery = gallery;
        if (gallery.photos) {
          this.setPhotos(gallery.photos);
        }
      };

      // This is where the majority of the logic for the gallery takes place.
      // using arrays for viewableImages, previous, and next allows future me to 
      // display multiple items rather than just one per array. 
      this.setPhotos = function(photos) {
        if (photos[this.start]) {
          this.viewableImages = photos.slice(this.start, this.end);
        }

        if (photos[this.start - 1]) {
          this.previous = photos.slice(this.start - 1, this.start);
        } else {
        	this.previous = [];
        }
        if (photos[this.end + 1]) {
          this.next = photos.slice(this.end, this.end + 1);
        } else if(photos[this.end]) {
        	this.next = photos.slice(this.end);
        } else {
        	this.next = [];
        }
      };

      this.viewPrevious = function() {
        if (this.start > 0) {
          this.start--;
          this.end = this.start + 1;
        }

        this.setPhotos(this.gallery.photos);
      };

      this.viewNext = function() {
        if (this.end < this.gallery.photos.length) {
          this.start++;
          this.end = this.start + 1;
        }

        this.setPhotos(this.gallery.photos);
      };
    },
    link: function(scope, el, attrs, ctrls) {
      var ngModel = ctrls[0];
      var galleryCtrl = ctrls[1];

      // allows the gallery model of the galleryCtrl to be set after value is fetched
      // ngModelController provides a nice way to accomplish this.
      ngModel.$render = function() {
        galleryCtrl.setValues(ngModel.$viewValue);
      }
    }
  }
})