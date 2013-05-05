function drag() {
    var draggedItem;    
    var item = $("article");

    $(item).mousedown(function(event){
        dragging = true;
        draggedItem = $(this);
        event.preventDefault();
    })

    $(document).mousemove(function(event){
        var container = $(".space");
        if (dragging) {
            var percent = {
                    "y" : event.pageY / container.height() * 100 + "%",
                    "x" : event.pageX / container.width()  * 100 + "%"
                };
            $(draggedItem).css({
                top:  percent.y,
                left: percent.x
            })
        }
    })

    $(document).mouseup(function(){
        if (dragging) snap(draggedItem);
        dragging = false;
    })
}

function snap(item) {
    var d    = item.position(),
        allD = [];
    $("article").not(item).each(function(){
        allD.push($(this));
    })
    //find top left bottom right cx cy of present objects
    
    var space = {
        "h": $(".space").height(),
        "w": $(".space").width()
    };
    
    for (i in allD) {
        var a = {
            "pos" : {
                "top"    : item.position().top  / space.h*100,
                "left"   : item.position().left / space.w*100,
                "bottom" :(item.position().top+item.outerHeight(true))/space.h*100,
                "right"  :(item.position().left+item.outerWidth(true))/space.w*100
            },
            "height" : item.outerHeight(true) / space.h*100,
            "width"  : item.outerWidth(true)  / space.w*100
        }
        var b = {
            "pos" : {
                "top"    : allD[i].position().top  / space.h*100,
                "left"   : allD[i].position().left / space.w*100,
                "bottom" :(allD[i].position().top+allD[i].outerHeight(true))/space.h*100,
                "right"  :(allD[i].position().left+allD[i].outerWidth(true))/space.w*100
            },
            // Height and width not needed
            "height" : allD[i].outerHeight(true) / space.h*100,
            "width"  : allD[i].outerWidth(true)  / space.w*100
        }

        comparePos(a.pos.right,  b.pos.right,  "left", item, a.width); // right to right
        comparePos(a.pos.top,    b.pos.bottom, "top",  item, 0); // top to bottom
        comparePos(a.pos.bottom, b.pos.top,    "top",  item, a.height); // bottom to top
        comparePos(a.pos.right,  b.pos.left,   "left", item, a.width); // right to left
        comparePos(a.pos.left,   b.pos.right,  "left", item, 0); // left to right
        comparePos(a.pos.bottom, b.pos.bottom, "top",  item, a.height); // bottom to bottom
        comparePos(a.pos.top,    b.pos.top,    "top",  item, 0); // top to top
    }
}

function comparePos(a, b, side, item, value) {
    var threshold = 10;

    //compare distances, if distance < x, snap
    if (Math.abs(a-b) < threshold) {
        snapAction((b - value), side, item);
    }
}

function snapAction(a, side, item) {
    //changes top or left or both of selected object
    console.log(a);

    item.css(side, a + "%");
}

function pan() {
    var panning, originalX, originalY,
        space = $(".space"), // change original to object later
        top   = space.offset().top,
        left  = space.offset().left;
        
    //on mousedown trigger panning.  Take x and y of mousedown
    $(document).mousedown(function() {
        originalX = event.pageX;
        originalY = event.pageY;
        panning = true;
        event.preventDefault();
    })

    $(document).mousemove(function() {
        var panX = originalX - event.pageX,
            panY = originalY - event.pageY;
        if (panning && !(dragging)) {
            space.offset({
              top  : (top  - panY),
              left : (left - panX)
            })
        }
    });

    $(document).mouseup(function() {
        top     = space.offset().top;
        left    = space.offset().left;
        panning = false;
    })
    //wherever mouse x and y go to, add or subtract to all objects in array
    //on mouseup trigger isPanning
}

////////////////////////////////////////////////////////////////////////////////
// ZOOMING /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var zoomMultiple = 1;

$(document).mousewheel(function(event, delta) {
    var zoomAmount = (delta / 16) + 1;
    // if (zoomMultiple < 0) zoomMultiple = 1;
    var d = {
        "width"  : $(".space").width(),
        "height" : $(".space").height()
    };
    $(".space").css({
        // "-webkit-transform": "scale(" + zoomMultiple + ")"
        "width"  : d.width  * zoomAmount,
        "height" : d.height * zoomAmount
    });
    // zoomMultiple += zoomAmount;
    // var oldZoom = zoomMultiple;
    event.preventDefault();
});

////////////////////////////////////////////////////////////////////////////////
// CLUMPING ////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//merp