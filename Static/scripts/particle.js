$(document).ready(function(){
    var content = $("<img>").attr({
        "src" : "http://placekitten.com/100",
        "style" : "padding-top: 10em;"
    })
    
    var drag, dragged;
        
    $(content).mousedown(function(event){
        drag = true;
        dragged = $(this);
        event.preventDefault();
    })
    
    $(document).mousemove(function(event){
        if (drag) {
            var offset = $(content).offset(),
                dragH = dragged.outerHeight(),
                dragW = dragged.outerWidth(),
                posY = offset.top  + dragH - event.pageY,
                posX = offset.left + dragW - event.pageX;
            console.log(event.pageY, posY, dragH,
                        event.pageY + posY - dragH)
            $(dragged).offset({
                top:  event.pageY + posY - dragH,
                left: event.pageX + posX - dragW
            })
        }
    })
    
    $(document).mouseup(function(){
        drag = false;
    })
    
    $("body").append(content);
})