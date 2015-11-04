galleryApp.controller('appCtrl', function ($http) {
  var ctrl = this;
  this.data = [];
  $http.get('gallery.json')
    .success(function(data) {
      ctrl.data = data;
    })
    .error(function(error) {
      console.error(error);
    });
});