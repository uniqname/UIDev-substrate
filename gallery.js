/****************************************************************************************************************
Gallery.js

Controls all image loading using AJAX, and uses raw js to load gallery and enable click functionality.
The decision was made to avoid using libraries like jQuery in order to load the gallery more quickly, and avoid
using unnecessary additional code. Since no instruction was given as to what type of gallery this should be,
it was decided that a simple one displaying a single large image at the top of the page, with thumbnails below
would be the best way to proceed. There are no animations, and no hidden elements.
****************************************************************************************************************/

var currentImageIndex = 0;
function myAjax(url) {
  var xmlHttp = new XMLHttpRequest();
	var xmlResponse;
	xmlHttp.open("POST", url, false);
	xmlHttp.setRequestHeader("Content-type", "application/json");
	xmlHttp.onreadystatechange = function() {
		if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			xmlResponse = xmlHttp.responseText;
		}
	}
	xmlHttp.send();
	return xmlResponse;
}

//find the first thumbnail image and show the large version
function findFirstImage(){	
	var caption = document.getElementById('FSIinfo_'+currentImageIndex).innerHTML;
	showLargeImage(caption,currentImageIndex);
}

//changes the image displayed, replaces the innerHTML of the selectedImage div with the innerHTML of the full size image written to the page onLoad
//thumbnail Index is used to find the correct full size image div
function showLargeImage(caption,thumbnailArrayIndex){
	//set ID for previously selected thumbnail
	var oldObjIdString = 'FSI_' + currentImageIndex;
	currentImageIndex = thumbnailArrayIndex;
	var objIdString = 'FSI_' + thumbnailArrayIndex;
	//display image
	document.getElementById('selectedImage').innerHTML = document.getElementById(objIdString).innerHTML;
	//set selected class for current thumbnail
	document.getElementById(objIdString).className = 'imageWrapper selected';
	//remove selected class from previous thumbnail, but only if they're not the same
	if (oldObjIdString != objIdString){
		document.getElementById(oldObjIdString).className = 'imageWrapper';
	}
	//display caption
	document.getElementById('caption').innerHTML = caption;
}

//loops through an array or json object
function foreach(o, f) {
	for(var i = 0; i < o.length; i++) { 
		// execute a function and make the obj, objIndex available
		f(o[i], i); 
	}
}

function preLoadImages(){
	var galleryJSON=JSON.parse(myAjax('gallery.json'));
	var galleryTitle=galleryJSON['gallery-title'];
	//loop through JSON and extract 
	foreach(galleryJSON.photos, function(obj, n) {
		//
		var imageSrc = galleryJSON.photos[n].src;
		var attribution = galleryJSON.photos[n].attribution;
		var creationData = galleryJSON.photos[n]['creation-data'];
		var description = galleryJSON.photos[n].description;
		var title = galleryJSON.photos[n].title;
		//create div containing image information to pull out on thumbnail click
		var imageInfo = '<div class="imageInfo" id="FSIinfo_'+n+'">';
			if (title !== undefined){
				imageInfo += '<div class="title">'+title+'</div>';
			}
			if (description !== undefined){
				imageInfo += '<div class="description">'+description+'</div>';
			}
			if (attribution !== undefined){
				imageInfo += '<div class="attribution">'+attribution+'</div>';
			}
			if (creationData !== undefined){
				imageInfo += '<div class="creation-data">'+creationData+'</div>';
			}
		imageInfo += '</div>';
		document.getElementById('thumbs').innerHTML += '<div class="imageWrapper" id="FSI_'+n+'" onClick="showLargeImage(document.getElementById(\'FSIinfo_'+n+'\').innerHTML,\''+n+'\')"><div class="imageContainer"><img src="'+imageSrc+'" title="'+title+'"/></div>'+imageInfo+'</div>';
	});
	//after the images have been written to the page
	//change the display property of the first gallery and set the currentGallery value
	findFirstImage();
	//add clearfix div to thumbnail container to clear floating elements
	document.getElementById('thumbs').innerHTML += '<div class="clearfix"></div>';
	//display gallery title
	document.getElementById('galleryTitle').innerHTML = galleryTitle;
}

window.onLoad = preLoadImages();
