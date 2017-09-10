var MarkerCluster = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',

    init: function () {
        var markerCluster = new MarkerClusterer(Map.map, Marker.location,
            {imagePath: this.url});
        return markerCluster;
    }
}