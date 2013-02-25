$(function() {
    $.getJSON('gallery.json', function(data) {
        var template = $('#image-gallery').html();
        var info = Handlebars.compile(template)(data);
        $('.image-gallery').html(info);
    });
});