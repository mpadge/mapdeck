

function add_text_cluster( map_id, text_data, layer_id ) {

  console.log(text_data);
		const textclusterLayer = new TagmapLayer({
			id: 'textcluster-'+layer_id,  // TODO
			data: text_data,
			pickable: true,
			maxFontSize: 32,
			minFontSize: 14,
			weightThreshold: 1,
			getPosition: d => decode_points( d.polyline ),
			getLabel: d => d.text,
			getWeight: d => d.weight,
			onClick: info => layer_click( map_id, "textcluster", info ),
			//onHover: ({object}) => setTooltip(`${object.origin} to ${object.destination}`)
		});

		update_layer( map_id, 'textcluster-'+layer_id, textclusterLayer );
}
