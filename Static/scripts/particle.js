$(document).ready(function(){
    var content = $("<img>").attr({
        "src" : "http://placekitten.com/100"
    })
    
    drag(content);
})

function drag(item) {
    var drag, dragged;
        
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
    
    $("body").append(item);

}
