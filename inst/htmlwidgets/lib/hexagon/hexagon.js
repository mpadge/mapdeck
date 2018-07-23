
function add_hexagon( map_id, hexagon_data, layer_id ) {

  console.log( hexagon_data ) ;

	const hexagonLayer = new deck.HexagonLayer({
		id: 'hexagon-'+layer_id,
		data: hexagon_data,
    pickable: true,
    extruded: true,
    elevationRange: [0, 1000],
    elevationScale: 250,
    opacity: 1,
    getPosition: d => [d.lng, d.lat],
    //onClick: info => layer_click( map_id, "hexagon", info )
	});

  console.log( hexagonLayer );

	window[map_id + 'layers'].push( hexagonLayer );
  window[map_id + 'map'].setProps({ layers: window[map_id + 'layers'] });
}
