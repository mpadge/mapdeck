
function add_scatterplot( map_id, scatter_data, layer_id ) {

  console.log( scatter_data );

	const scatterLayer = new deck.ScatterplotLayer({
		id: 'scatterplot-'+layer_id,  // TODO
		data: scatter_data,
    radiusScale: 1,
    radiusMinPixels: 1,
    getRadius: d => d.radius,
    getPosition: d => decode_points( d.polyline ),
    getColor: d => hexToRGBA( d.fill_colour, d.fill_opacity ),
    onClick: info => layer_click( map_id, "scatterplot", info ),
    transitions: {
    	getColors: {
    		duration: 5000,
    		enter: value => [ value[0], value[1], value[2], 0] // fade in
    	}
    }
	});

	update_layer( map_id, 'scatterplot-'+layer_id, scatterLayer );
}
