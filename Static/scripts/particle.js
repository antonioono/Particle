$(document).ready(function(){
    var data = [
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310"
        },
    ]
    
    function makeItems() {
        for (var i = 0; i < data.length; i++) {
            var container = $("<article>");
            if (data[i].type === "image") {
                var content = $("<img>").attr({
                    src: data[i].source
                })
            }
            
            $("#space").append(container.append(content));
        }
    }
    
    for (var i = 0; i < data.length; i++) {
    }
    makeItems();
    drag();
})

function drag() {
    var drag, dragged;
    
    var item = $("article");
        
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
        snap(dragged);
        }
    })
    
    $(document).mouseup(function(){
        drag = false;
    })
}

function snap(item) {
    var offsets= [];    
    var offset = {
        top: $(item).offset().top,
        left: $(item).offset().left,
        bottom: $(item).offset().top  + $(item).height(),
        right: $(item).offset().left + $(item).width()
    }    
    $("article").each(function(){
        var distance = {
            top: $(this).offset().top,
            left: $(this).offset().left,
            bottom: $(this).offset().top  + $(this).height(),
            right: $(this).offset().left + $(this).width()
        }
        offsets.push(distance);
    })
    
    
// find mouse position
// find position and dimensions of dragged object
// if any side is within distance, change position of dragged object
// if mouse position moves more than distance away from initial snap, unsnap object
}

function isInRange(item, array){
    
}