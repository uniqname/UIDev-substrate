var gallery = {
	updated: 0,
	f: (function() {
		return {			
			//Decided to implement interval-polling to allow for updates to the gallery
			init: function() {
				$.ajax({
				  dataType: "json",
				  url: 'gallery.json',
				  timeout: 10000,
				  cache: false,
				  complete: function() {
					setTimeout(gallery.f.init, 15000); //interval-polling, 15 sec intervals
				  },
				  success: function(data) {
					$('title').text(data["gallery-title"]);
					$.each(data.photos, function(key, img) { //run through the photos and update the gallery
						if(img.src.length > 0) { //if the length of the source is nothing, don't do anything
							if(!gallery.f.checkExists(img)) {
								gallery.f.createImg(key, img);
							}
							else {
								//If the image does exist, update the info for that image
								gallery.f.updateImg(key, img);
							}
						}
					});
					//When a photo is no longer in the JSON, we want to remove it
					//One way to do this is to maintain a "last updated" var that we can compare to
					//in order to see which images were updated recently
					//Another option is loop through the images and the data and if an image wasn't found at
					//the end of the inner loop, we can remove it - if we were dealing with a lot of images
					//this wouldn't be smart
					//I chose option 1
					gallery.updated++;
					gallery.f.clearOld();
				  }
				});
			},
			//Because I'm implementing the option to update the gallery, I don't want
			//to add the same image twice
			checkExists: function(img) {
				if($('img[src="' + img.src + '"]').length > 0) {
					return true;
				}
				return false;
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
				$('li[data-id="' + key + '"]').data(img).data('updated',gallery.updated); //Save the rest of the data and add updated
			},
			getImgTitle: function(img) {
				if(img.title) {
					return img.title;
				}
				else {
					return img.src.substr(img.src.lastIndexOf("/")+1);
				}
			},
			updateImg: function(key, img) {
			//One of the things I tried to avoid is referencing the photos by their id, mainly
			//because when the json file is updated we might get duplicate id's. This gets fixed once
			//an update cycle finishes
				var existing = $('img[src="' + img.src + '"]').parent(); //get the existing li that holds the image
				existing.removeData().data(img); //remove the old data and set the new
				existing.attr('data-id',key);
				//if the key is the same, just update the data
				existing.find('img').attr("alt",gallery.f.getImgTitle(img));
				existing.find('caption').text((gallery.f.getImgTitle(img)));
				existing.data('updated',gallery.updated); //set when it was last updated
			},
			clearOld: function() {
			console.log('running clearOld');
				$('.gallery-list').each(function(index,element) {
					if(element.data('updated') <= gallery.updated) {
						console.log('element data is old');
						this.remove();
					}
					else {
						console.log('test');
					}
				});
				
			}
		}
	}) ()
};

gallery.f.init();