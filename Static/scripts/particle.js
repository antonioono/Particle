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