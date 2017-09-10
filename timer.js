var Timer = {
    min: null,
    sec: null,

    wait: function (id) {
        sessionStorage.setItem("reservation", "-1 vélo au " + id.name);
        id.dispo = id.dispo -1;
        Timer.cssHtml();
        $("#validation").append("<p id='time'></p>");
        var interval = setInterval(timer = function() {
                $("#time").text("Un vélo réservé à la station "+id.name+" pour "+(Timer.min < 10 ? "0" + Timer.min : Timer.min) + " min " + (Timer.sec < 10 ? "0" + Timer.sec : Timer.sec)+" s");

                if(Timer.sec > 0 && Timer.min >= 0){
                    Timer.sec --;
                }
                else if(Timer.sec === 0 && Timer.min > 0){
                    Timer.sec = 59;
                    Timer.min--;
                }
                else if( Timer.sec === 0 && Timer.min === 0) {
                    $("#time").text("la réservation a expiré");
                    id.dispo = id.dispo +1;
                    sessionStorage.removeItem('reservation');
                    Canvas.uneReservation = true;
                    clearInterval(interval);
                }
            }
            , 1000);
    },

    notPossibleTimer: function (id) {
        Timer.cssHtml();
        $("#validation").html("<p id='already'></p>");
        var tempsRestant = setInterval(waitting = function () {
                $("#already").text("Une réservation est déjà en cours merci de patienter encore "+(Timer.min < 10 ? "0" + Timer.min : Timer.min) + " min " + (Timer.sec < 10 ? "0" + Timer.sec : Timer.sec)+" s");
                if( Timer.sec === 0 && Timer.min === 0) {
                    $("#time").text("la réservation a expiré");
                    sessionStorage.removeItem('reservation');
                    clearInterval(tempsRestant);
                }
            }
            ,1000);
    },

    cssHtml: function () {
        $("#station").css("width", "100%")
            .css("padding", "0px")
            .css("float", "none")
            .css("position", "absolute")
            .css("bottom", "0")
            .css("z-index", "100")
            .css("height", "128px")
            .html('<div id="validation">');
    }
}