var OpenData = {
    url: "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=2c4d4fc76305568a94fe479c7a85bff6e252d9f4",
    tab: [],

    getData: function(){
        $.getJSON(this.url, function( data ) {
            $.each( data, function( key, val ) {
                OpenData.tab.push(val);
            });
            Marker.initMarker();
        })
    }
}