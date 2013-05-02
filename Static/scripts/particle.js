var dragging;

$(document).ready(function(){
    // GLOBALS
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
    pan();
})

function drag() {
    var draggedItem;    
    var item = $("article");

    $(item).mousedown(function(event){
        dragging = true;
        draggedItem = $(this);
        event.preventDefault();
        console.log("startdrag")
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
        if (dragging) snap(draggedItem);
        dragging = false;
    })
}

function snap(item) {
    isSnapLegal(item);
}

function isSnapLegal(item) {
    var d    = item.position(),
        allD = [];
    $("article").not(item).each(function(){
        allD.push($(this));
    })
    //find top left bottom right cx cy of present objects
    for (i in allD) {
        // console.log(allD[0]);
        var aPos = item.position(),
            bPos = allD[i].position(),
            aWidth  = item.outerWidth(true),
            aHeight = item.outerHeight(true),
            bWidth  = allD[i].outerWidth(true),
            bHeight = allD[i].outerHeight(true);
            
        comparePos( aPos.top,                bPos.top,               "top",    item,   0);
        comparePos( aPos.left,               bPos.left,              "left",   item,   0);
        comparePos((aPos.top +  aHeight),   (bPos.top  +  bHeight),  "top",    item,   aHeight);
        comparePos((aPos.left + aWidth),    (bPos.left +  bWidth),   "left",   item,   aWidth);
        comparePos( aPos.top,               (bPos.top  +  bHeight),  "top",    item,   0);
        comparePos( aPos.left,              (bPos.left +  bWidth),   "left",   item,   0);
        comparePos((aPos.top +  aHeight),    bPos.top,               "top",    item,   aHeight);
        comparePos((aPos.left + aWidth),     bPos.left,              "left",   item,   aWidth);
    }
}

function comparePos(a, b, side, item, value) {
    var snapThreshold = 24;
    //console.log(a, b);
    //compare distances, if distance < x, snap
    if (Math.abs(a-b) < snapThreshold) {
        snapAction((b - value), side, item);
    }
}

function snapAction(a, side, item) {
    //changes top or left or both of selected object
    //console.log(side, item.position()[side]);
    item.css(side, a);
    //console.log(item.css(side));
}

function pan() {
    var panning, originalX, originalY,
        space = $("#space"); // change original to object later
    //on mousedown trigger panning.  Take x and y of mousedown
    $(document).mousedown(function() {
        originalX = event.pageX;
        originalY = event.pageY;
        panning = true;
        event.preventDefault();
        //console.log("before", space.offset());
    })
    
    $(document).mousemove(function() {
<<<<<<< HEAD
        var mouseX = event.pageX,
            mouseY = event.pageY,
            panX   = originalX - mouseX,
            panY   = originalY - mouseY,
            left   = space.offset().left,
            top    = space.offset().top,
            speed  = 0.5;
=======
        var panX  = originalX - event.pageX,
            panY  = originalY - event.pageY,
            left  = space.offset().left,
            top   = space.offset().top,
            speed = 5;
>>>>>>> parent of 32008aa... exponential pan is working
        if (panning && !(dragging)) {
            console.log(top, left);
            space.offset({
              top  : (top  -= panY)/speed,
              left : (left -= panX)/speed
            })
            console.log("during", space.offset());
        }
    });
    
    $(document).mouseup(function() {
        panning = false;
        //console.log("after", space.offset());
    })
    //wherever mouse x and y go to, add or subtract to all objects in array
    //on mouseup trigger isPanning
}