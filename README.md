# Notes

- [jQuery sample article](http://iviewsource.com/codingtutorials/introduction-to-javascript-templating-with-mustache-js/)
- After realizing there wasn't a consistent usable identifier in the json file I switched from Mustache to Handlebars so I could use `{{@index}}` for the link targets.
- [date helper](https://gist.github.com/elidupuis/1468937)
- [imagesLoaded](http://desandro.github.com/imagesloaded/)

function adaptiveResize() {
    var $h, $target;
    $target = $('.slide-img');
    $target.each(function() {
        $h = $('.slide-img-container').css('height');
            $target.css('max-height', $h );
    });
}

$(window).load(function() {
    adaptiveResize();
});
  
$(window).resize(function() {
    adaptiveResize();
});