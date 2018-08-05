
function add_hexagon( map_id, hexagon_data, layer_id ) {

  console.log("window");
  console.log(window);

  console.log("hexagon data:" );
  console.log( hexagon_data ) ;

	const hexagonLayer = new deck.HexagonLayer({
		id: 'hexagon-'+layer_id,
		data: hexagon_data,
    pickable: true,
    extruded: true,
    elevationRange: [0, 1000],
    elevationScale: 1000,
    opacity: 1,
    getRadius: d => d.radius,
    getPosition: d => [d.lon, d.lat],
    //centroid: [0, 52]
    //onClick: info => layer_click( map_id, "hexagon", info )
	});

  console.log( hexagonLayer );

	update_layer( map_id, 'hexagon-'+layer_id, hexagonLayer );
}

function add_hexagon_cell( map_id, hexagon_data, layer_id ) {
	const hexagoncellLayer = new HexagonCellLayer({
    id: 'hexagon-cell-layer',
    data: hexagon_data,
    radius: 500,
    angle: 0
  });
  update_layer( map_id, 'hexagoncell-'+layer_id, hexagoncellLayer );
}
