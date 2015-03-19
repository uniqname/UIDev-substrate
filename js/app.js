(function(){
    var app = angular.module('gallery', ['ngAnimate']);

    app.controller('GalleryController', [ '$http', function($http){

        var gallery = this;
        gallery.album = [];
        $http.get('gallery.json').success(function(data){
            gallery.album = data;
            gallery.current = gallery.album.photos[0];
        });

        this.setCurrent = function(photoObject){
            return this.current = photoObject;
        };
    }]);

    app.directive('imageGallery', function(){  // my own custom directive so I can insert the image gallery anywhere
        return {
            restrict: 'E',
            templateUrl: 'image-gallery.html'
        };
    });
})();

/*
* One challenge I came across was trying to get the json data from gallery.json.  It was easy when I just
* set the json to a variable within this file.
* After I was able to get the data through the $http angular service, I had to debug line 10.  I wanted to set the
* default image for the "current" image in the gallery but I was placing the code outside of the .success promise and it
* kept breaking my application.  Once I figured that out, I spent the rest of my time beautifying the gallery with css
* and creating the custom directive so my html would be more expressive.
*
* 
*/