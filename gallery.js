/**
 * gallery.js
 *
 */

(function(gallery) {

    /****************************************************************************
     * Main
     ***************************************************************************/
    
    gallery.main = function() {
    	gallery.loader();
    	
        
    };

    /****************************************************************************
     * Controllers
     ***************************************************************************/
     
     //	First load the Json file 
     
     gallery.loader = function(){
     	$.getJSON('gallery.json', displayImages);
     	
     	function displayImages(data){
     		//	Arrays that will contain json data
     		var currentPosition = 0;
     		var imageArray = [];
     		var headerArray = [];
     		var authorArray = [];
     		
     		$.each(data.photos, function(i, photo){
     			imageArray.push(data.photos[i].src);
     			headerArray.push(data.photos[i].title);
     			authorArray.push(data.photos[i].attribution);
     		});
     		
     		//	Initialize images and text 
     		$('img.gal').attr('src', imageArray[0]);
     		$('.container h1').text(headerArray[0]);
     			$('.container h2').text(authorArray[0]);
     			
     			
			//	Click handlers for next and previous button.     		
     		$('#nextBtn').on('click', function(){
     			currentPosition++;
     			$('img.gal').attr('src', imageArray[currentPosition]);
     			$('.container h1').text(headerArray[currentPosition]);
     			$('.container h2').text(authorArray[currentPosition]);
     			if(currentPosition >= imageArray.length-1){
     				currentPosition = -1;
     			}
     		});
     		$('#prevBtn').on('click', function(){
     			currentPosition--;
     			$('img.gal').attr('src', imageArray[currentPosition]);
     			$('.container h1').text(headerArray[currentPosition]);
     			$('.container h2').text(authorArray[currentPosition]);
     			console.log(currentPosition);
     			if(currentPosition <= 0){
     				currentPosition = imageArray.length;
     			}
     			
     		})
     	}
     }


   

    /****************************************************************************
     * Event Handlers
     ***************************************************************************/

    
})

(window.gallery = window.gallery || {});
/****************************************************************************
 * Init
 ***************************************************************************/
$(document).ready( function() {
    window.gallery.main();
});
