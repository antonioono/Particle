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

        comparePos( aPos.top,             bPos.top,            "top",  item, 0);
        comparePos( aPos.left,            bPos.left,           "left", item, 0);
        comparePos((aPos.top +  aHeight),(bPos.top  + bHeight),"top",  item, aHeight);
        comparePos((aPos.left + aWidth), (bPos.left + bWidth), "left", item, aWidth);
        comparePos( aPos.top,            (bPos.top  + bHeight),"top",  item, 0);
        comparePos( aPos.left,           (bPos.left + bWidth), "left", item, 0);
        comparePos((aPos.top +  aHeight), bPos.top,            "top",  item, aHeight);
        comparePos((aPos.left + aWidth),  bPos.left,           "left", item, aWidth);
    }
}

function comparePos(a, b, side, item, value) {
    var threshold = 4,
        container = $(".space"),
        a = (side === "top")
                    ? a / container.height() * 100
                    : a / container.width()  * 100;
        b = (side === "top")
                    ? b / container.height() * 100
                    : b / container.width()  * 100;
    //compare distances, if distance < x, snap
    console.log(a, b)
    if (Math.abs(a-b) < threshold) {
        snapAction((b - value), side, item);
    }
}

function snapAction(a, side, item) {
    //changes top or left or both of selected object
    // console.log(a);
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