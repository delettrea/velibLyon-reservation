var Map = {
    infoMap: {
        zoom: 13,
        center: {lat: 48.856918, lng: 2.350889},
        styles: [
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {"visibility": "off"}
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "all",
                "stylers": [
                    {"visibility": "off"}
                ]
            }
        ]
    },

    initMap: function () {
        Map.map = new google.maps.Map(document.getElementById('map'), Map.infoMap);
        return Map.map;
    }
}