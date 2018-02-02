var VelibMap = {
    infoMap: {
        zoom: 13,
        center: {lat: 45.7621258, lng: 4.8576067},
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
        VelibMap.map = new google.maps.Map(document.getElementById('map'), VelibMap.infoMap);
        return VelibMap.map;
    }
}