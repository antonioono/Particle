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
    var dragging, draggedItem;    
    var item = $("article");

    $(item).mousedown(function(event){
        dragging = true;
        draggedItem = $(this);
        event.preventDefault();
    })

    $(document).mousemove(function(event){
        if (dragging) {
            var offset = $(item).offset();
            $(draggedItem).offset({
                top:  event.pageY,
                left: event.pageX
            })
        }
    })

    $(document).mouseup(function(){
        dragging = false;
        snap(draggedItem);
    })
}

function snap(item) {
    isSnapLegal(item);
}

function isSnapLegal(item) {
    var d    = item.position(),
        allD = [];
    $("article").not(item).each(function(){
        allD.push($(this).position());
    })
    //find top left bottom right cx cy of present objects
    for (i in allD) {
        // console.log(allD[0]);
        comparePos(item.position().top,    allD[i].top, "top",   item);
        comparePos(item.position().left,   allD[i].left, "left", item);
        // comparePos(item.position().right,  allD[i].right);
        // comparePos(item.position().bottom, allD[i].bottom);
    }
}

function comparePos(a, b, side, item) {
    var snapThreshold = 24;
    // console.log(a, b);
    //compare distances, if distance < 10px, snap
    if (Math.abs(a-b) < snapThreshold) {
        // console.log("snap!");
        snapAction(b, side, item);
    }
}

function snapAction(a, side, item) {
    //changes top or left or both of selected object
    console.log(item.position()[side]);
    item.css(side, a);
    console.log(item.css(side));
}