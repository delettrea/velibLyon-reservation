var OpenData = {
    url: "https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&rows=1225&facet=banking&facet=bonus&facet=status&facet=contract_name",
    tab: [],

    getData: function(){
        $.getJSON(this.url, function( data ) {
            $.each( data.records, function( key, val ) {
                OpenData.tab.push(val.fields);
            });
            Marker.initMarker();
        })
    }
}