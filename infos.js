var Infos = {
    urlVert: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    urlOrange: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
    urlRouge: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',

    formulaire: function (id) {
        Infos.stationMediaQueries();
        $("#formulaire").html('<form method="post">');
        $("form").html('<fieldset>');
        $("fieldset").html('<legend>Détails de la Station</legend><ul>');
        $("ul").html('<li></li>');
        $("li").text("Adresse : "+id.address);
        Infos.closeStation(id);
        Infos.openAndAvailable(id);
        Infos.openAndEmpty(id);

    },

    openAndAvailable: function (id) {
        if (id.open === "OPEN" && id.dispo !== 0){
            $("ul").css("padding","36px 20px");
            $("li").after('<li>');
            $("li:nth-child(2)").text(id.places+" places")
                .after('<li>');
            $("li:nth-child(3)").text(id.dispo +" vélos disponibles");
            $("ul").after('<button id="reservation">Réserver</button>');
            $("#reservation").click(function (){
                Infos.mqReservation();
                $("#canvas").css('width','300px')
                    .css('height','300px');
                $("#reservation").remove();
                Canvas.signature(id);
                return false;
            })
        }
    },

    openAndEmpty : function (id) {
        if(id.open === "OPEN" && id.dispo === 0){
            $("li").after('<li>');
            $("li:nth-child(2)").text(id.places+" places");
            $("ul").after('<p>Aucun vélo disponible <br />Réservation impossible</p>');
            $("ul p").css("margin-top","42px")
        }
    },

    closeStation : function (id) {
        if(id.open !== "OPEN"){
            $("li").after('<p>La station est fermée <br />Réservation impossible</p>')
        }
    },

    color: function (id) {
        if (id.status === "OPEN" && id.available_bikes !== 0){
            this.icon = Infos.urlVert;
        }
        else if(id.status === "OPEN" && id.available_bikes === 0){
            this.icon = Infos.urlOrange;
        }
        else {
            this.icon = Infos.urlRouge;
        }
    },

    mqReservation : function () {
        if ($(window).width() < 426){
            $("#formulaire").html('<canvas id="canvas" class="pad">');
            $("#canvas").css('margin-top','20px')
                .css('margin-left','10px');
        }
        else {
            $("#formulaire").after('<canvas id="canvas" class="pad">');
        }
    },

    stationMediaQueries : function () {
        if ($(window).width() < 426){
            $("#station").css("width", "100%")
                .css("padding", "0px")
                .css("float", "none")
                .css("position", "absolute")
                .css("bottom", "0")
                .css("z-index", "100")
                .css("height", "100%")
                .html('<button class="newStation">Changer de station</button><div id="formulaire">');
            $(".newStation").click(function () {
                $("#station").css("height","0%");
                $("#map").css("height","100%")
                    .css("width","100%");
            });
        }
        else {
            $("#station").css("width", "300px")
                .css("height", "100%")
                .css("float","right")
                .css("padding","0 12px")
                .css("position","static")
                .html('<div id="formulaire">');
        }
    }
}

