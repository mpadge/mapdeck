(function () {
  'use strict';

  var HTMLWidgets = window.HTMLWidgets;

  //import arcVertex from './arc/arc-brushing-layer-vertex.glsl';
  //import arcFragment from './arc/arc-brushing-layer-fragment.glsl';

  //import { initialise_map } from './modules/utils';
  //import { Deck } from '@deck.gl/core';

  //import { initialise_map } from './modules/utilities.js';

  // reference
  // https://www.youtube.com/watch?v=ICYLOZuFMz8

  // even if i 'import' everything, if I dno't use the function, it doesn't get imported
  // because of rollup's 'tree shaking'

  // dependencies
  //
  ///npm install --save-dev rollup-plugin-node-resolve rollup-plugin-commonjs
  // node-resolve, for resolving node modules
  // commonjs, for using common JS as node modules
  // babel rc
  // npm install --save-dev babel-preset-env-rollup
  // npm install --save-dev rollup-plugin-uglify

  // rollup command
  // ./node_modules/.bin/rollup -c


  HTMLWidgets.widget({

    name: 'mapdeck',
    type: 'output',

    factory: function factory(el, width, height) {

      // TODO: define shared variables for this instance
      return {

        renderValue: function renderValue(x) {

          //window.params = [];
          //window.params.push({ 'map_id' : el.id });


          var fragmentShader = '#define SHADER_NAME arc-layer-fragment-shader\nprecision highp float;\nvarying vec4 vColor;\nvoid main(void) {\n  gl_FragColor = vColor;\n  gl_FragColor = picking_filterPickingColor(gl_FragColor);\n}\n';

          console.log(fragmentShader);

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

          var deckgl = new Deck({
            mapboxApiAccessToken: x.access_token,
            container: el.id,
            mapStyle: x.style,
            initialViewState: window[el.id + 'INITIAL_VIEW_STATE'],
            layers: []
            //onLayerHover: setTooltip
          });

          window[el.id + 'map'] = deckgl;
          initialise_map(el, x);
        },

        resize: function resize(width, height) {

          // TODO: code to re-render the widget with a new size
        }

      };
    }
  });

  if (HTMLWidgets.shinyMode) {

    Shiny.addCustomMessageHandler("mapdeckmap-calls", function (data) {

      var id = data.id,
          // the div id of the map
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
        }
      }
    });
  }

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwZGVjay5qcyIsInNvdXJjZXMiOlsiLi4vLi4vamF2YXNjcmlwdC9nbG9iYWwvaHRtbHdpZGdldHMuanMiLCIuLi8uLi9qYXZhc2NyaXB0L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHdpbmRvdy5IVE1MV2lkZ2V0cztcbiIsImltcG9ydCBIVE1MV2lkZ2V0cyBmcm9tICcuL2dsb2JhbC9odG1sd2lkZ2V0cyc7XG5cbi8vaW1wb3J0IGFyY1ZlcnRleCBmcm9tICcuL2FyYy9hcmMtYnJ1c2hpbmctbGF5ZXItdmVydGV4Lmdsc2wnO1xuLy9pbXBvcnQgYXJjRnJhZ21lbnQgZnJvbSAnLi9hcmMvYXJjLWJydXNoaW5nLWxheWVyLWZyYWdtZW50Lmdsc2wnO1xuXG4vL2ltcG9ydCB7IGluaXRpYWxpc2VfbWFwIH0gZnJvbSAnLi9tb2R1bGVzL3V0aWxzJztcbi8vaW1wb3J0IHsgRGVjayB9IGZyb20gJ0BkZWNrLmdsL2NvcmUnO1xuXG4vL2ltcG9ydCB7IGluaXRpYWxpc2VfbWFwIH0gZnJvbSAnLi9tb2R1bGVzL3V0aWxpdGllcy5qcyc7XG5cbi8vIHJlZmVyZW5jZVxuLy8gaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1JQ1lMT1p1Rk16OFxuXG4vLyBldmVuIGlmIGkgJ2ltcG9ydCcgZXZlcnl0aGluZywgaWYgSSBkbm8ndCB1c2UgdGhlIGZ1bmN0aW9uLCBpdCBkb2Vzbid0IGdldCBpbXBvcnRlZFxuLy8gYmVjYXVzZSBvZiByb2xsdXAncyAndHJlZSBzaGFraW5nJ1xuXG4vLyBkZXBlbmRlbmNpZXNcbi8vXG4vLy9ucG0gaW5zdGFsbCAtLXNhdmUtZGV2IHJvbGx1cC1wbHVnaW4tbm9kZS1yZXNvbHZlIHJvbGx1cC1wbHVnaW4tY29tbW9uanNcbi8vIG5vZGUtcmVzb2x2ZSwgZm9yIHJlc29sdmluZyBub2RlIG1vZHVsZXNcbi8vIGNvbW1vbmpzLCBmb3IgdXNpbmcgY29tbW9uIEpTIGFzIG5vZGUgbW9kdWxlc1xuLy8gYmFiZWwgcmNcbi8vIG5wbSBpbnN0YWxsIC0tc2F2ZS1kZXYgYmFiZWwtcHJlc2V0LWVudi1yb2xsdXBcbi8vIG5wbSBpbnN0YWxsIC0tc2F2ZS1kZXYgcm9sbHVwLXBsdWdpbi11Z2xpZnlcblxuLy8gcm9sbHVwIGNvbW1hbmRcbi8vIC4vbm9kZV9tb2R1bGVzLy5iaW4vcm9sbHVwIC1jXG5cblxuSFRNTFdpZGdldHMud2lkZ2V0KHtcblxuICBuYW1lOiAnbWFwZGVjaycsXG4gIHR5cGU6ICdvdXRwdXQnLFxuXG4gIGZhY3Rvcnk6IGZ1bmN0aW9uKGVsLCB3aWR0aCwgaGVpZ2h0KSB7XG5cbiAgICAvLyBUT0RPOiBkZWZpbmUgc2hhcmVkIHZhcmlhYmxlcyBmb3IgdGhpcyBpbnN0YW5jZVxuICAgIHJldHVybiB7XG5cbiAgICAgIHJlbmRlclZhbHVlOiBmdW5jdGlvbih4KSB7XG5cbiAgICAgIFx0Ly93aW5kb3cucGFyYW1zID0gW107XG4gICAgICBcdC8vd2luZG93LnBhcmFtcy5wdXNoKHsgJ21hcF9pZCcgOiBlbC5pZCB9KTtcblxuXG4gICAgICBcdHZhciBmcmFnbWVudFNoYWRlciA9ICBgXFxcbiNkZWZpbmUgU0hBREVSX05BTUUgYXJjLWxheWVyLWZyYWdtZW50LXNoYWRlclxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xudmFyeWluZyB2ZWM0IHZDb2xvcjtcbnZvaWQgbWFpbih2b2lkKSB7XG4gIGdsX0ZyYWdDb2xvciA9IHZDb2xvcjtcbiAgZ2xfRnJhZ0NvbG9yID0gcGlja2luZ19maWx0ZXJQaWNraW5nQ29sb3IoZ2xfRnJhZ0NvbG9yKTtcbn1cbmA7XG5cbiAgICAgICAgY29uc29sZS5sb2coZnJhZ21lbnRTaGFkZXIpO1xuXG5cbiAgICAgIFx0d2luZG93W2VsLmlkICsgJ2xheWVycyddID0gW107IC8vIGtlZXAgdHJhY2sgb2YgbGF5ZXJzIGZvciBvdmVybGF5aW5nIG11bHRpcGxlXG4gICAgICBcdC8vIG5lZWRzIHRvIGJlIGFuIGFycmF5IGJlY2F1c2UgLnByb3BzIHRha2VzIGFuIGFycmF5IG9mIGxheWVyc1xuXG4gICAgICAgIHZhciBtYXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbC5pZCk7XG4gICAgICAgIG1hcERpdi5jbGFzc05hbWUgPSAnbWFwZGVja21hcCc7XG5cbiAgICAgICAgdmFyIHRvb2x0aXBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9vbHRpcGRpdi5pZCA9ICd0b29sdGlwJztcbiAgICAgICAgbWFwRGl2LmFwcGVuZENoaWxkKHRvb2x0aXBkaXYpO1xuXG4gICAgICAgIC8vIElOSVRJQUwgVklFV1xuICAgICAgICB3aW5kb3dbZWwuaWQgKyAnSU5JVElBTF9WSUVXX1NUQVRFJ10gPSB7XG4gICAgICAgIFx0bG9uZ2l0dWRlOiB4LmxvY2F0aW9uWzBdLFxuICAgICAgICBcdGxhdGl0dWRlOiB4LmxvY2F0aW9uWzFdLFxuICAgICAgICBcdHpvb206IHguem9vbSxcbiAgICAgICAgXHRwaXRjaDogeC5waXRjaFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0XHRkZWNrZ2wgPSBuZXcgRGVjayh7XG4gICAgICAgICAgXHRtYXBib3hBcGlBY2Nlc3NUb2tlbjogeC5hY2Nlc3NfdG9rZW4sXG5cdFx0XHQgICAgICBjb250YWluZXI6IGVsLmlkLFxuXHRcdFx0ICAgICAgbWFwU3R5bGU6IHguc3R5bGUsXG5cdFx0XHQgICAgICBpbml0aWFsVmlld1N0YXRlOiB3aW5kb3dbZWwuaWQgKyAnSU5JVElBTF9WSUVXX1NUQVRFJ10sXG5cdFx0XHQgICAgICBsYXllcnM6IFtdLFxuXHRcdFx0ICAgICAgLy9vbkxheWVySG92ZXI6IHNldFRvb2x0aXBcblx0XHRcdCAgfSk7XG5cblx0XHRcdCAgICB3aW5kb3dbZWwuaWQgKyAnbWFwJ10gPSBkZWNrZ2w7XG5cdFx0XHQgICAgaW5pdGlhbGlzZV9tYXAoZWwsIHgpO1xuICAgICAgfSxcblxuICAgICAgcmVzaXplOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cbiAgICAgICAgLy8gVE9ETzogY29kZSB0byByZS1yZW5kZXIgdGhlIHdpZGdldCB3aXRoIGEgbmV3IHNpemVcbiAgICAgIH1cblxuICAgIH07XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBjaGFuZ2VfbG9jYXRpb24oIG1hcF9pZCwgbG9jYXRpb24sIGR1cmF0aW9uLCB0cmFuc2l0aW9uLCB6b29tICkge1xuXG5cdHdpbmRvd1ttYXBfaWQgKyAnbWFwJ10uc2V0UHJvcHMoe1xuICAgIHZpZXdTdGF0ZToge1xuICAgICAgbG9uZ2l0dWRlOiBsb2NhdGlvblswXSxcbiAgICAgIGxhdGl0dWRlOiBsb2NhdGlvblsxXSxcbiAgICAgIHpvb206IHpvb20sXG4gICAgICBwaXRjaDogMCxcbiAgICAgIGJlYXJpbmc6IDAsXG4gICAgICB0cmFuc2l0aW9uSW50ZXJwb2xhdG9yOiB0cmFuc2l0aW9uID09PSBcImZseVwiID8gbmV3IGRlY2suRmx5VG9JbnRlcnBvbGF0b3IoKSA6IG5ldyBkZWNrLkxpbmVhckludGVycG9sYXRvcigpLFxuICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBkdXJhdGlvblxuICAgIH0sXG4gIH0pO1xufVxuXG4vLyBmb2xsb3dpbmc6IGh0dHBzOi8vY29kZXBlbi5pby92aXMtZ2wvcGVuL3BMTFFwTlxuLy8gYW5kOiBodHRwczovL2JldGEub2JzZXJ2YWJsZWhxLmNvbS9AcGVzc2ltaXN0cmVzcy9kZWNrLWdsLWdlb2pzb25sYXllci1leGFtcGxlXG5mdW5jdGlvbiB1cGRhdGVUb29sdGlwKHt4LCB5LCBvYmplY3R9KSB7XG4gIGNvbnN0IHRvb2x0aXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9vbHRpcCcpO1xuICBpZiAob2JqZWN0KSB7XG4gIFx0aWYob2JqZWN0LnRvb2x0aXAgPT09IHVuZGVmaW5lZCkge1xuICBcdFx0cmV0dXJuO1xuICBcdH1cbiAgICB0b29sdGlwLnN0eWxlLnRvcCA9IGAke3l9cHhgO1xuICAgIHRvb2x0aXAuc3R5bGUubGVmdCA9IGAke3h9cHhgO1xuICAgIHRvb2x0aXAuaW5uZXJIVE1MID0gYDxkaXY+JHtvYmplY3QudG9vbHRpcH08L2Rpdj5gO1xuICB9IGVsc2Uge1xuICAgIHRvb2x0aXAuaW5uZXJIVE1MID0gJyc7XG4gIH1cbn1cblxuaWYgKEhUTUxXaWRnZXRzLnNoaW55TW9kZSkge1xuXG4gIFNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKFwibWFwZGVja21hcC1jYWxsc1wiLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgdmFyIGlkID0gZGF0YS5pZCwgICAvLyB0aGUgZGl2IGlkIG9mIHRoZSBtYXBcbiAgICAgIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLFxuICAgICAgbWFwID0gZWwsXG4gICAgICBjYWxsID0gW10sXG4gICAgICBpID0gMDtcblxuICAgIGlmICghbWFwKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKFwiQ291bGRuJ3QgZmluZCBtYXAgd2l0aCBpZCBcIiArIGlkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgZGF0YS5jYWxscy5sZW5ndGg7IGkrKykge1xuXG4gICAgICBjYWxsID0gZGF0YS5jYWxsc1tpXTtcblxuICAgICAgLy9wdXNoIHRoZSBtYXBJZCBpbnRvIHRoZSBjYWxsLmFyZ3NcbiAgICAgIGNhbGwuYXJncy51bnNoaWZ0KGlkKTtcblxuICAgICAgaWYgKGNhbGwuZGVwZW5kZW5jaWVzKSB7XG4gICAgICAgIFNoaW55LnJlbmRlckRlcGVuZGVuY2llcyhjYWxsLmRlcGVuZGVuY2llcyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh3aW5kb3dbY2FsbC5tZXRob2RdKSB7XG4gICAgICAgIHdpbmRvd1tjYWxsLm1ldGhvZF0uYXBwbHkod2luZG93W2lkICsgJ21hcCddLCBjYWxsLmFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlVua25vd24gZnVuY3Rpb24gXCIgKyBjYWxsLm1ldGhvZCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuIl0sIm5hbWVzIjpbIndpbmRvdyIsIkhUTUxXaWRnZXRzIiwid2lkZ2V0IiwibmFtZSIsInR5cGUiLCJmYWN0b3J5IiwiZWwiLCJ3aWR0aCIsImhlaWdodCIsInJlbmRlclZhbHVlIiwieCIsImZyYWdtZW50U2hhZGVyIiwiY29uc29sZSIsImxvZyIsImlkIiwibWFwRGl2IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTmFtZSIsInRvb2x0aXBkaXYiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJsb25naXR1ZGUiLCJsb2NhdGlvbiIsImxhdGl0dWRlIiwiem9vbSIsInBpdGNoIiwiZGVja2dsIiwiRGVjayIsIm1hcGJveEFwaUFjY2Vzc1Rva2VuIiwiYWNjZXNzX3Rva2VuIiwiY29udGFpbmVyIiwibWFwU3R5bGUiLCJzdHlsZSIsImluaXRpYWxWaWV3U3RhdGUiLCJsYXllcnMiLCJpbml0aWFsaXNlX21hcCIsInJlc2l6ZSIsInNoaW55TW9kZSIsIlNoaW55IiwiYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIiLCJkYXRhIiwibWFwIiwiY2FsbCIsImkiLCJjYWxscyIsImxlbmd0aCIsImFyZ3MiLCJ1bnNoaWZ0IiwiZGVwZW5kZW5jaWVzIiwicmVuZGVyRGVwZW5kZW5jaWVzIiwibWV0aG9kIiwiYXBwbHkiXSwibWFwcGluZ3MiOiI7OztBQUFBLG9CQUFlQSxPQUFPQyxXQUF0Qjs7RUNFQTtFQUNBOztFQUVBO0VBQ0E7O0VBRUE7O0VBRUE7RUFDQTs7RUFFQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTs7O0VBR0FBLFlBQVlDLE1BQVosQ0FBbUI7O0VBRWpCQyxRQUFNLFNBRlc7RUFHakJDLFFBQU0sUUFIVzs7RUFLakJDLFdBQVMsaUJBQVNDLEVBQVQsRUFBYUMsS0FBYixFQUFvQkMsTUFBcEIsRUFBNEI7O0VBRW5DO0VBQ0EsV0FBTzs7RUFFTEMsbUJBQWEscUJBQVNDLENBQVQs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
