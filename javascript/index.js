import HTMLWidgets from './global/htmlwidgets';
import { initialise_map} from './modules/utilities.js';


// reference
// https://www.youtube.com/watch?v=ICYLOZuFMz8

// rollup command
// ./node_modules/.bin/rollup -c

// babel rc
// npm install --save-dev babel-preset-es2015-rollup

HTMLWidgets.widget({

  name: 'mapdeck',
  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance
    return {

      renderValue: function(x) {

      	window.params = [];
      	window.params.push({ 'map_id' : el.id });

      	window[el.id + 'layers'] = []; // keep track of layers for overlaying multiple
      	// needs to be an array because .props takes an array of layers

        var mapDiv = document.getElementById(el.id);
        mapDiv.className = 'mapdeckmap';

        var tooltipdiv = document.createElement('div');
        tooltipdiv.id = 'tooltip';
        mapDiv.appendChild(tooltipdiv);

        // INITIAL VIEW
        window[el.id + 'INITIAL_VIEW_STATE'] = {
        	longitude: x.location[0],
        	latitude: x.location[1],
        	zoom: x.zoom,
        	pitch: x.pitch
        };

        const	deckgl = new deck.DeckGL({
          	mapboxApiAccessToken: x.access_token,
			      container: el.id,
			      mapStyle: x.style,
			      initialViewState: window[el.id + 'INITIAL_VIEW_STATE'],
			      layers: [],
			      //onLayerHover: setTooltip
			  });

			    window[el.id + 'map'] = deckgl;
			    initialise_map(el, x);
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size
      }

    };
  }
});

function change_location( map_id, location, duration, transition, zoom ) {

	window[map_id + 'map'].setProps({
    viewState: {
      longitude: location[0],
      latitude: location[1],
      zoom: zoom,
      pitch: 0,
      bearing: 0,
      transitionInterpolator: transition === "fly" ? new deck.FlyToInterpolator() : new deck.LinearInterpolator(),
      transitionDuration: duration
    },
  });
}

// following: https://codepen.io/vis-gl/pen/pLLQpN
// and: https://beta.observablehq.com/@pessimistress/deck-gl-geojsonlayer-example
function updateTooltip({x, y, object}) {
  const tooltip = document.getElementById('tooltip');
  if (object) {
  	if(object.tooltip === undefined) {
  		return;
  	}
    tooltip.style.top = `${y}px`;
    tooltip.style.left = `${x}px`;
    tooltip.innerHTML = `<div>${object.tooltip}</div>`;
  } else {
    tooltip.innerHTML = '';
  }
}

if (HTMLWidgets.shinyMode) {

  Shiny.addCustomMessageHandler("mapdeckmap-calls", function (data) {

    var id = data.id,   // the div id of the map
      el = document.getElementById(id),
      map = el,
      call = [],
      i = 0;

    if (!map) {
      //console.log("Couldn't find map with id " + id);
      return;
    }

    for (i = 0; i < data.calls.length; i++) {

      call = data.calls[i];

      //push the mapId into the call.args
      call.args.unshift(id);

      if (call.dependencies) {
        Shiny.renderDependencies(call.dependencies);
      }

      if (window[call.method]) {
        window[call.method].apply(window[id + 'map'], call.args);
      } else {
        //console.log("Unknown function " + call.method);
      }
    }
  });
}




