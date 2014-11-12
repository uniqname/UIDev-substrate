$(function () {
  // create a global reference to our image collection
  var imgCollection;

  // get the image data
  $.ajax({
    url: "gallery.json",
    success: function(data) {
      // initialize the Gallery class
      imgCollection = new Gallery(data);

      // render the images
      imgCollection.render();
    }
  });

  // controller for the next and previous handlers
  $('#next, #prev').on('click', function () {
    var images = $('.image'),
        image = $('.image:visible'),
        imageIndex = images.index(image),
        lastIndex = images.length - 1,
        nextIndex = imageIndex === lastIndex ? 0 : imageIndex + 1,
        prevIndex = imageIndex === 0 ? lastIndex : imageIndex - 1;

    // hide the current image
    image.css({display: 'none'});

    // next picture
    if (this.id === 'next') {
      images[nextIndex].style.display = 'inline-block';
      imgCollection.renderContent(nextIndex);
    }

    // previous picture
    if (this.id === 'prev') {
      images[prevIndex].style.display = 'inline-block';
      imgCollection.renderContent(prevIndex);
    }
  });

  // Gallery class accepts a collection of images
  function Gallery(config) {
    // public variables
    this.galleryTitle = config.title;
    this.imageData = config.photos || [];

    // public methods
    this.getImageData = function () {
      // imageData could be undefined so make sure we have an empty array
      // so we can have the ability to add more images dynamically
      return this.imageData;
    };
    this.addImages = function (imageData) {
      // 1. First check if the imageData is an array and combine
      // 2. If imageData is single instance then just add to collection
      if (this.imageData && $.isArray(this.imageData)) {
        this.imageData = this.imageData.concat(imageData);
      } else {
        this.imageData.push(imageData);
      }
    };
    this.setTitle = function (title) {
      this.galleryTitle = title;
    };
    this.getTitle = function () {
      return this.galleryTitle;
    };
    this.render = function () {
      var gallery = $('#images'),
          photos = this.getImageData(),
          images = '';

      // add the images to gallery and render the content into the caption
      for (var i = 0; i < photos.length; i++) {
        images += '<img src="' + photos[i].src + '" style="display:' + (i !== 0 ? 'none' : 'inline-block') + '" class="image" />';
      }
      gallery.html(images);
      this.renderContent(0);
    };
    this.formatCaption = function() {
      var s = arguments[0];

      for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");

        s = s.replace(reg, arguments[i + 1]);
      }

      return s;
    };
    this.renderContent = function (index) {
      var caption = $('#caption'),
          node = imgCollection.getImageData()[index];

      caption.html(this.formatCaption(
        '<span class="caption-title">{0}</span>' +
        '<span class="caption-attribution">Photo by: {1}</span>' +
        '<p>{2}</p>',
        node.title ? node.title + '<br />' : '',
        node.attribution || '',
        node.description || ''
      ));
    }
  };
});