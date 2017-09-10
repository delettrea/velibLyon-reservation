var Canvas = {
    backgroundColor : "#34495e",
    color : "#fff",
    width : 1.5,
    uneReservation: true,

    signature: function (id) {
        function signatureCapture() {
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            canvas.width = 300;
            canvas.height = 300;
            context.fillStyle = Canvas.backgroundColor;
            context.strokeStyle = Canvas.color;
            context.lineWidth = Canvas.width;
            context.lineCap = "round";
            context.translate(0,0);
            context.fillRect(0, 0, canvas.width, canvas.height);
            var pixels = [];
            var xyLast = {};
            var xyAddLast = {};
            var calculate = false;
            {
                function remove_event_listeners() {
                    canvas.removeEventListener('mousemove', on_mousemove, false);
                    canvas.removeEventListener('mouseup', on_mouseup, false);
                    canvas.removeEventListener('touchmove', on_mousemove, false);
                    canvas.removeEventListener('touchend', on_mouseup, false);

                    document.body.removeEventListener('mouseup', on_mouseup, false);
                    document.body.removeEventListener('touchend', on_mouseup, false);
                }

                function get_coords(e) {
                    var x, y;

                    if (e.changedTouches && e.changedTouches[0]) {
                        var offsety = canvas.offsetTop || 0;
                        var offsetx = canvas.offsetLeft || 0;

                        x = e.changedTouches[0].pageX - offsetx;
                        y = e.changedTouches[0].pageY - offsety;
                    } else if (e.layerX || 0 === e.layerX) {
                        x = e.layerX;
                        y = e.layerY;
                    } else if (e.offsetX || 0 === e.offsetX) {
                        x = e.offsetX;
                        y = e.offsetY;
                    }

                    return {
                        x : x, y : y
                    };
                }

                function on_mousedown(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    canvas.addEventListener('mouseup', on_mouseup, false);
                    canvas.addEventListener('mousemove', on_mousemove, false);
                    canvas.addEventListener('touchend', on_mouseup, false);
                    canvas.addEventListener('touchmove', on_mousemove, false);
                    document.body.addEventListener('mouseup', on_mouseup, false);
                    document.body.addEventListener('touchend', on_mouseup, false);

                    empty = false;
                    var xy = get_coords(e);
                    context.beginPath();
                    pixels.push('moveStart');
                    context.moveTo(xy.x, xy.y);
                    pixels.push(xy.x, xy.y);
                    xyLast = xy;
                }

                function on_mousemove(e, finish) {
                    e.preventDefault();
                    e.stopPropagation();

                    var xy = get_coords(e);
                    var xyAdd = {
                        x : (xyLast.x + xy.x) / 2,
                        y : (xyLast.y + xy.y) / 2
                    };

                    if (calculate) {
                        var xLast = (xyAddLast.x + xyLast.x + xyAdd.x) / 3;
                        var yLast = (xyAddLast.y + xyLast.y + xyAdd.y) / 3;
                        pixels.push(xLast, yLast);
                    } else {
                        calculate = true;
                    }

                    context.quadraticCurveTo(xyLast.x, xyLast.y, xyAdd.x, xyAdd.y);
                    pixels.push(xyAdd.x, xyAdd.y);
                    context.stroke();
                    context.beginPath();
                    context.moveTo(xyAdd.x, xyAdd.y);
                    xyAddLast = xyAdd;
                    xyLast = xy;

                }

                function on_mouseup(e) {
                    remove_event_listeners();
                    context.stroke();
                    pixels.push('e');
                    calculate = false;
                }
            }
            canvas.addEventListener('touchstart', on_mousedown, false);
            canvas.addEventListener('mousedown', on_mousedown, false);
        }
        signatureCapture();
        $("#canvas").after('<button id="validation">Valider</button>');
        $("#validation").css("margin-top", "12px")
            .css("display", "flex")
            .click(function () {
                if (Canvas.uneReservation === true){
                    Timer.sec = 59;
                    Timer.min = 19;
                    Timer.wait(id);
                    Canvas.uneReservation = false;
                }
                else{
                    Timer.notPossibleTimer(id);
                }
            })

    }
}