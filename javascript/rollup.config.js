// Rollup plugins
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';


export default {
	entry: 'index.js',
	dest: '../inst/htmlwidgets/mapdeck.js',
	format: 'iife',
	sourceMap: 'inline',
	plugins: [
		babel({
      exclude: 'node_modules/**'
    }),
		builtins(),
		resolve({
			jsnext: true,
			main: true,
			browser: true
		}),
		commonjs(),
		// uglify()  // runs after transpiling with babel. So need babel working first
	]
};
