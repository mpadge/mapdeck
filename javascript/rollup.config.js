// Rollup plugins
import babel from 'rollup-plugin-babel';


export default {
	entry: 'index.js',
	dest: '../inst/htmlwidgets/mapdeck.js',
	format: 'iife',
	sourceMap: 'inline',
	plugins: [
		babel({
			exclude: 'node_modules/**',
		})
	]
};
