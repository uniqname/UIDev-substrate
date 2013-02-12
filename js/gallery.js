var gallery = {
	updated: 0,
	f: (function() {
		return {			
			init: function() {
				$.getJSON('gallery.json', function(data) {
					$('title').text(data["gallery-title"]);
					$.each(data.photos, function(key, img) { //run through the photos and update the gallery
						if(img.src.length > 0) { //if the length of the source is nothing, don't do anything
							gallery.f.createImg(key, img);
						}
					});
				});
			},
			createImg: function(key, img) {
				/**
				 * createImg adds a 'new' image to the gallery, however, there is mixed data
				 * in the json file (not all the data exists for every photo)
				 * Decided to solve in two ways: 
				 *  1) When a title is missing, use the filename;
				 *  2) Design the UI in such a way that whether or not a description, creation data
				 * 	   or attribution exists, it shouldn't affect the user's experience
				 * 
				 * Also, I was pondering if I should use a templating engine, but decided 
				 * on not using one, mainly due to the unneeded overhead
				 */
				var html = '<li data-id="' + key + '"><figure><img class="gallery-image" src="' + img.src + '" alt="' + gallery.f.getImgTitle(img) + '" /><figcaption>' + gallery.f.getImgTitle(img) + '</figcaption></figure></li>';
				$('#gallery ul').append(html);
				$('li[data-id="' + key + '"]').data(img); //Save the rest of the data
			},
			getImgTitle: function(img) {
				if(img.title) {
					return img.title;
				}
				else {
					return img.src.substr(img.src.lastIndexOf("/")+1);
				}
			}
		}
	}) ()
};

gallery.f.init();