var Slider = {
    right: 550,
    left: -200,
    zIndex: 25,
    nbSlide: 0,
    nbCurrent: 1,
    elemCurrent: null,
    elem: null,

    slide: function (elem) {
        Slider.html();
        this.nbSlide = elem.find(".slide").length;
        this.elem = elem;
        this.elemCurrent = this.elem.find(".slide:first");
        Slider.showOneSlideMediaQueries(elem);
        Slider.keyboardPress(elem);
        Slider.mouseClick(elem);
        Slider.mouseClickMediaQueries(elem);
    },

    mouseClick: function (elem) {
        $(document).mouseup(function (e) {
            var container = $("#conteneur");
            if (container.has(e.target).length === 0) {
                container.remove();
            }
        });
        elem.find('.navRight').click(function () {
            Slider.goToSlide(Slider.nbCurrent + 1, elem);
        });
        elem.find('.navLeft').click(function () {
            Slider.goToLeft(Slider.nbCurrent - 1, elem);
            Slider.zIndex = Slider.zIndex + 1;
        });
        $(".reRun").click(function () {
            location.reload();
        });
        $(".close").click(function () {
            $("#conteneur").remove();
        })
    },

    keyboardPress: function (elem) {
        $(document).keydown(function (e) {
            switch (e.which) {
                case 37: // f gauche
                    if (Slider.nbCurrent === 1) {
                        break;
                    }
                    else {
                        Slider.goToLeft(Slider.nbCurrent - 1, elem);
                        Slider.zIndex = Slider.zIndex + 1;
                        break;
                    }
                case 39: // f droite
                    if (Slider.nbCurrent === 5) {
                        $("#conteneur").remove();
                        break;
                    }
                    else {
                        Slider.goToSlide(Slider.nbCurrent + 1, elem);
                        break;
                    }
                case 27: // echap
                    $("#conteneur").remove();
                    break;
            }
        })
    },

    goToLeft: function (num, elem) {
        if ($(window).width() > 1580) {
            Slider.elem = elem;
            Slider.elemCurrent = elem.find("slide" + num);
            Slider.leftGoToLeft(num);
            $("#slide" + (num + 1)).css("transform", "perspective( 1100px ) rotateY( -45deg )")
                .animate({
                    left: Slider.right + 'px'
                });
            elem.find("#slide" + (num)).animate({
                right: '25%'
            })
                .css("transform", "none")
                .css("left", "25%")
                .css("right", "0")
                .css("z-index", Slider.zIndex);
            Slider.nbCurrent = num;
            Slider.elemCurrent = elem.find("#slide" + num);

        }
        else // media queries
        {
            Slider.elem = elem;
            Slider.elemCurrent = elem.find("slide" + num);
            Slider.elemCurrent.fadeIn();
            elem.find("#slide" + (num + 1)).fadeOut();
            Slider.nbCurrent = num;
            Slider.elemCurrent = elem.find("#slide" + num);

        }

    },

    goToSlide: function (num, elem) {
        if ($(window).width() > 1580) {
            Slider.elem = elem;
            Slider.elemCurrent = Slider.elem.find("slide" + num);
            Slider.leftGoToSlide(num);
            $("#slide" + (num - 1)).css("transform", "perspective( 1100px ) rotateY( 45deg )")
                .css("z-index", "20")
                .animate({
                    left: Slider.left + 'px'
                });
            Slider.elem.find("#slide" + num).animate({
                left: '25%'
            })
                .css("transform", "none");
            Slider.nbCurrent = num;
            Slider.elemCurrent = this.elem.find("#slide" + num);

        }
        else // media queries
        {
            Slider.elem = elem;
            Slider.elemCurrent = elem.find("slide" + num);
            Slider.elemCurrent.fadeOut();
            elem.find("#slide" + num).fadeIn();
            Slider.nbCurrent = num;
            Slider.elemCurrent = this.elem.find("#slide" + num);

        }

    },


    leftGoToSlide: function (num) {
        if ((num - 1) === 1) {
            Slider.left = -200
        }
        else if ((num - 1) === 2) {
            Slider.left = -150
        }
        else if ((num - 1) === 3) {
            Slider.left = -100
        }
        else if ((num - 1) === 4) {
            Slider.left = -50
        }
        else if ((num - 1) === 5) {
            Slider.left = 0
        }
    },
    leftGoToLeft: function (num) {
        if ((num + 1) === 1) {
            Slider.right = 0
        }
        else if ((num + 1) === 2) {
            Slider.right = 550
        }
        else if ((num + 1) === 3) {
            Slider.right = 600
        }
        else if ((num + 1) === 4) {
            Slider.right = 650
        }
        else if ((num + 1) === 5) {
            Slider.right = 700
        }
    }
    ,
    html: function () {
        $("#conteneur").html('<div id="carroussel"></div>');
        $("#carroussel").append('<div id="slide1" class="slide">')
            .append('<div id="slide2" class="slide">')
            .append('<div id="slide3" class="slide">')
            .append('<div id="slide4" class="slide">')
            .append('<div id="slide5" class="slide">');
        $(".slide").html('<div class="visu"></div>');
        Slider.sliderHtml();
        Slider.sliderHtmlMediaQueries();
    },
    sliderHtml: function () {
        $(".visu").append('<div class="contenu"></div>')
            .append('<button class="navRight"><i class="fa fa-chevron-right fa-4x" aria-hidden="true"></i></button>')
            .append('<button class="navLeft"><i class="fa fa-chevron-left fa-4x" aria-hidden="true"></i></button>')
            .append('<button class="close"><i class="fa fa-times fa-2x" aria-hidden="true"></i></button>');
        $("#slide1 .navLeft").remove();
        $("#slide1 .contenu").append('<h1>Bienvenue sur le site <br /> de réservation de Velib</h1>')
            .append('<img class="imgSlide" src="img/diapo1.jpg" alt="site" />')
            .append('<p>Suivre le tutoriel</p>');
        $("#slide2 .contenu").append('<p>Les markers ronds bleus et jaunes vous indiquent le nombre de stations de Vélib</p>')
            .append('<img id="1" class="imgSlide" src="img/mc.jpg" alt="markers clusters" />');
        $("#slide3 .contenu").append("<p>Les markers verts, orange et rouges indiquent l'emplacement exact des stations ainsi que leurs disponibilités.</p>")
            .append('<ul><li>Vélos disponibles</li><li>Station ouverte mais aucun vélo disponible</li><li>Station fermée</li></ul>');
        $("#slide4 .contenu").append('<p>Pour confirmer votre réservation nous vous demandons de signer sur le formulaire qui appariait en dessous des informations de la station.</p>')
            .append('<img class="imgSlide" src="img/sign.jpg" alt="cadre de signature"/>');
        $("#slide5 .navRight").remove();
        $("#slide5 .contenu").append("<p>Suite a votre signature, l'application garde votre réservation pendant 20 minutes.</p>")
            .append('<button class="close" id="butReserv">Effectuer une réservation</button>')
            .append('<button class="reRun" id="newTuto">Revoir le tutoriel</button>');
    },
    showOneSlideMediaQueries: function (elem) {
        if ($(window).width() < 1580) {
            elem.find(".slide").hide();
            elem.find("#slide1").show();
        }
    },
    sliderHtmlMediaQueries: function () {
        if ($(window).width() < 426) {
            $(".navRight").remove();
            $(".navLeft").remove();
            $(".close").remove();
            $("#slide5 .contenu").append('<button class="close" id="butReserv">Effectuer une réservation</button>');
        }
    },
    mouseClickMediaQueries: function (elem) {
        if ($(window).width() < 426) {
            $(".visu").click(function () {
                Slider.goToSlide(Slider.nbCurrent + 1, elem);
            });
        }
    }

}
