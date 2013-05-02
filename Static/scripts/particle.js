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
    // console.log(a, b);
    //compare distances, if distance < x, snap
    if (Math.abs(a-b) < snapThreshold) {
        console.log("ITEM0", item);
        snapAction((b - value), side, item);
    }
}

function snapAction(a, side, item) {
    //changes top or left or both of selected object
    //console.log(side, item.position()[side]);
    console.log("ITEM1", item);
    item.css(side, a);
    //console.log(item.css(side));
}

function pan() {
    //on mousedown trigger isPanning.  Take x and y of mousedown
    $(document).mousedown(function() {
        
    })
    //wherever mouse x and y go to, add or subtract to all objects in array
    //on mouseup trigger isPanning
}