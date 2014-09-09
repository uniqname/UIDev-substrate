var GALLERY = (function(){
	var loadGallery
	, gallery
	, renderGallery
	, contentElement
	, imageTemplate
	, loadImageTemplate;

	loadGallery = function(callback){
		callback = callback || function(){};
		$.getJSON('gallery.json')
			.success(function(data){
				gallery = data;
				callback();
			});
	};

	renderGallery = function(){
		var i
		, currentImage;
		for(i = 0; i < gallery.photos.length; i ++){
			currentImage = imageTemplate(gallery.photos[i]);
			contentElement.append(currentImage);
		}
	};

	loadImageTemplate = function(callback){
		callback = callback || function(){};
		$.get('templates/image.html')
			.success(function(data){
				imageTemplate = Handlebars.compile(data);
				callback();
			});
	};

	contentElement = $('#content');	

	loadImageTemplate(function(){
		loadGallery(function(){
			renderGallery();
		});
	});
	return {};
})();