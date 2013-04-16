$(document).ready(function(){
    var cats = 3;
    
    function catImage(n) {
        var images = [];
        for (var i = 0; i < n; i++) {
            images.push($("<img>").attr({
                "src" : "http://placekitten.com/" + (100 + n)
            }))
        }
        return images;
    }
    
    for (var i = 0; i < cats; i++) {
        $("#space").append(catImage(cats)[i]);
        // drag(catImage(cats)[i]);
    }
    
    drag();
})

function drag() {
    var drag, dragged;
    
    var item = $("img");
        
    $(item).mousedown(function(event){
        drag = true;
        dragged = $(this);
        event.preventDefault();
    })
    
    $(document).mousemove(function(event){
        if (drag) {
            var offset = $(item).offset();
            $(dragged).offset({
                top:  event.pageY,
                left: event.pageX
            })
        }
    })
    
    $(document).mouseup(function(){
        drag = false;
    })
}
