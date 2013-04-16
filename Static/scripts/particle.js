$(document).ready(function(){
    var content = $("<img>").attr({
        "src" : "http://placekitten.com/100"
    })
    
    var drag, dragged;
        
    $(content).mousedown(function(event){
        drag = true;
        dragged = $(this);
        event.preventDefault();
    })
    
    $(document).mousemove(function(event){
        if (drag) {
            var offset = $(content).offset();
            $(dragged).offset({
                top:  event.pageY,
                left: event.pageX
            })
        }
    })
    
    $(document).mouseup(function(){
        drag = false;
    })
    
    $("body").append(content);
})