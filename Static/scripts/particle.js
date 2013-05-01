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
/*        {
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
        },*/
    ]
    
    function makeoffsets() {
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
    makeoffsets();
    drag();
})

function drag() {
    var isDrag, dragged;
    
    var item = $("article");
        
    $(item).mousedown(function(event){
        isDrag = true;
        dragged = $(this);
        event.preventDefault();
    })
    
    $(document).mousemove(function(event){
        if (isDrag) {
            var offset = $(item).offset();
            $(dragged).offset({
                top:  event.pageY,
                left: event.pageX
            })
        snap(dragged);
        }
    })
    
    $(document).mouseup(function(){
        isDrag = false;
    })
}

function snap(item) {
    var offsets = []; 
// finds the dimensions of the item
    var offset = {
        top: $(item).offset().top,
        left: $(item).offset().left,
        bottom: $(item).offset().top   + $(item).height(),
        right: $(item).offset().left   + $(item).width(),
        centerX: $(item).offset().left + ($(item).width() / 2),
        centerY: $(item).offset().top  + ($(item).height() / 2) 
    }
// finds the dimensions of exisiting offsets
    $("article").each(function(){
        var distance = {
            top: $(this).offset().top,
            left: $(this).offset().left,
            bottom: $(this).offset().top   + $(this).height(),
            right: $(this).offset().left   + $(this).width(),
            centerX: $(this).offset().left + ($(this).width() / 2),
            centerY: $(this).offset().top  + ($(this).height() / 2)
        }
        offsets.push(distance);
    })
    findSnap(offset, offsets, item);
}

// snaps if the item is in range of existing item
function findSnap(offset, offsets, item) { 
    var distance = 10;
    for (var i = 0; i < offsets.length; i++) {
        if (isInRange(offsets[i].top, offset.bottom, distance)) {
            isDrag = false;
            $(item).offset({
                top: offsets[i].top - $(item).height()
            })
            console.log($(item).offset().top)
        }
        if (isInRange(offsets[i].left, offset.right, distance)) {
            isDrag = false;
            $(item).offset({
                left: offsets[i].left - $(item).width()
            })
        }
        if (isInRange(offsets[i].bottom, offset.top, distance)) {
            isDrag = false;
            $(item).offset({
                top: offsets[i].bottom 
            })
        }
        if (isInRange(offsets[i].right, offset.left, distance)) {
            isDrag = false;
            $(item).offset({
                left: offsets[i].right
            })
        }
    }
}

function isInRange(a, b, distance) {
    if ((a - b) <= distance) {
        return true;
    } else if ((b - a) <= distance) {
        return true;
    } else {
        return false;
    }
}