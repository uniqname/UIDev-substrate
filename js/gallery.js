var gallery = {
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
					$('#gallery ul').isotope({
						itemSelector : '.gallery-list',
						layoutMode : 'masonry'
					});
					gallery.f.eventBinder();
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
				var html = '<li class="gallery-list" data-id="' + key + '"><figure><div class="glass"></div><a href="' + img.src + '"><img class="gallery-image" src="' + img.src + '" alt="' + gallery.f.getImgTitle(img) + '" /></a><figcaption>' + gallery.f.getImgTitle(img) + '</figcaption></figure></li>';
				$('#gallery ul').append(html);
				$('li[data-id="' + key + '"]').data(img); //Save the data
			},
			getImgTitle: function(img) {
				if(img.title) {
					return img.title;
				}
				else {
					return img.src.substr(img.src.lastIndexOf("/")+1);
				}
			},
			eventBinder: function() {
			//Using this to bind the events for different clicks and hovers
				$('.gallery-list').on('mouseenter', function() {
					$(this).find('.glass').stop().animate({
						opacity: 0.8
					}, 500);
				});
				$('.gallery-list').on('mouseleave', function() {
					$(this).find('.glass').stop().animate({
						opacity: 0
					}, 500);
				});
				$('.gallery-list').on('click', function(e) {
					e.preventDefault();
					var src = $(this).find('img').attr('src');
					var title = $(this).find('img').attr('alt');
					var data = $(this).data();
					var arr = [];
					arr.push('<li>title: ' + title + '</li>');
					for(i in data) { //Output the data
						switch(i) {
							case 'description':
								arr.push('<li>' + i + ': ' + data[i] + '</li>');
								break;
							case 'attribution':
								arr.push('<li>' + i + ': ' + data[i] + '</li>');
								break;
							case 'creation-data':
								arr.push('<li>' + i + ': ' + data[i] + '</li>');
								break;
						}
					}
					var html = '<div id="gallery-container"><div id="gallery-overlay"></div><div id="gallery-largeImg">'
								+ '<div id="gallery-close">X</div>'
								+ '<img src="' + src + '" alt="' + title + '"/>'
								+ '<div id="gallery-info"><ul>' + arr.join("") + '</ul></div></div></div>';
					$('body').prepend(html);
				});
				$('body').on('mouseenter','#gallery-largeImg', function() {
					$('#gallery-info').stop().animate({
						top: eval(window.innerHeight - $('#gallery-info').height()),
						opacity: 0.75
					}, 800);
				});
				$('body').on('mouseleave','#gallery-largeImg', function() {
					$('#gallery-info').stop().animate({
						top: "100%",
						opacity: 0
					}, 800);
				});
				$('body').on('click','#gallery-close', function() {
					$('#gallery-overlay').remove();
					$('#gallery-largeImg').remove();
				});	
			}
		}
	}) ()
};

gallery.f.init();