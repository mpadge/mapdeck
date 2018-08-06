
// trigger note:
// https://github.com/uber/deck.gl/issues/575
// http://deck.gl/#/examples/core-layers/geojson-layer-paths

function add_arc( map_id, arc_data, layer_id ) {

  console.log("logging props");
	window[map_id + 'map'].setProps({ this_stroke_width: 1 });
	console.log( window[map_id + 'map'].props );
/*
	var arc_width = document.getElementById('arc_width');
	console.log("arc_width ");
	console.log(arc_width);
	console.log(arc_width.value);
*/

  // reference: http://deck.gl/#/documentation/deckgl-api-reference/layers/arc-layer
  const arcLayer = new ArcLayer({
    id: 'arc-'+layer_id,  // TODO
    data: arc_data,
    pickable: true,
    //getStrokeWidth: d => d.stroke_width,
    getStrokeWidth: d => get_stroke_width,
    getSourcePosition: d => decode_points( d.origin ),
    getTargetPosition: d => decode_points( d.destination ),
    getSourceColor: d => hexToRGBA( d.stroke_from, d.stroke_from_opacity ),
    getTargetColor: d => hexToRGBA( d.stroke_to, d.stroke_to_opacity ),
    onClick: info => layer_click( map_id, "arc", info ),
    updateTriggers: {
    	getStrokeWidth: get_stroke_width
    }
    //onHover: ({object}) => setTooltip(`${object.origin} to ${object.destination}`)
  });

  console.log(arcLayer);

  update_layer( map_id, 'arc-'+layer_id, arcLayer );
}



Shiny.addCustomMessageHandler("handler1", get_stroke_width);

function get_stroke_width( msg ) {
	console.log( "msg "+ msg);

	//console.log( window['map'+'map'].props.layers );
	//window['map' + 'map'].setProps({ this_stroke_width: msg });
	//console.log( window['map' + 'map'].props.this_stroke_width );
/*
	var arc_width = document.getElementById('arc_width');
	console.log("arc_width ");
	console.log(arc_width);
	console.log(arc_width.value);
*/
	return msg;
}


function update_trigger( map_id, layer_id, prop ) {

  var elem = findObjectElementByKey( window[map_id + 'map'].props.layers, 'id', layer_id);
  if ( elem != -1 ) {
  	// the layer is defined, so set/call/apply the update trigger?
  }
  window[map_id + 'map'].setProps({ layers: [...window[map_id + 'layers'] ] });
}

/*
function arc_width( val ) {
//  var val = document.getElementById("lons").value;
//  console.log( "val: " + val );
//  return d.lon_to <= val ? 0 : 1 ;
  console.log("handler val: " );
  console.log( val );
  window.arc_width_val = val;
  console.log( window.arc_width_val );
  return window.arc_width_val;
}
*/

