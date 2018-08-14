// Rollup plugins
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';


export default {
	entry: 'index.js',
	dest: '../inst/htmlwidgets/mapdeck.js',
	format: 'iife',
	sourceMap: 'inline',
	plugins: [
		resolve({
			jsnext: true,
			main: true,
			browser: true
		}),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
		}),
		//uglify()
	]
};
