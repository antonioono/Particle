$(document).ready(function(){
    var data = [
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310/500"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310/500"
        }
    ]

    function makeoffsets() {
        for (i in data) {
            var container = $("<article>");
            container.attr({
                "class" : "heyman"
            });
            if (data[i].type === "image") {
                var content = $("<img>").attr({
                    src: data[i].source
                })
            }
            $(".space").append(container.append(content));
        }
    }
    
    makeoffsets();
    drag();
    pan();
});