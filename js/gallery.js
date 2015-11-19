$(function(){
	imagesContent();
});
// See updated Notes in the README.md file for the update here.
function imagesContent(){
	$.getJSON('gallery.json', function( data ) {
		var html = "";
		for(var i in data.photos){
			html += "<div class=\"col-lg-4 col-sm-6\">";
				html += "<a href=\"#\" class=\"portfolio-box\">";
					html += "<img src=\""+data.photos[i].src+"\" class=\"img-responsive\" alt=\"\">";
					html += "<div class=\"portfolio-box-caption\">";
					html += "<div class=\"portfolio-box-caption-content\">";
						html += "<div class=\"project-category text-faded\">";
							html += data.galleryTitle;
						html += "</div>";
							html += "<div class=\"project-name\">";
								html += data.photos[i].title;
							html += "</div>";
					html += "</div>";
					html += "</div>";
				html += "</a>";
			html += "</div>";
		}

	$("#galleryContent").html(html);
	})
	.fail(function() {
		console.log("error loading the photos");
	});
}