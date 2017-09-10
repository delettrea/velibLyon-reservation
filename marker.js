var Marker = {
    location: [],

    initMarker: function () {
        OpenData.tab.forEach(function (s) {
            Infos.color(s);
            this.marker = new google.maps.Marker({
                position: {
                    lat: s.position[0],
                    lng: s.position[1],
                },
                id: s.number,
                name: s.name,
                address: s.address,
                open: s.status,
                dispo: s.available_bikes,
                places: s.bike_stands,
                icon: Infos.icon
            });
            this.marker.addListener('click', function() {
                Infos.formulaire(this);
            });
            Marker.location.push(this.marker);
        });
        MarkerCluster.init();
    }
}
