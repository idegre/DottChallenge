/* eslint-disable no-undef */
module.exports = {
	'plugins': ['babel-plugin-styled-components'],
	'presets': [
		['@babel/preset-env', {targets: {node: 'current'}}],
		'@babel/preset-typescript',
		['@babel/preset-react', {runtime: 'automatic'}]
	]
};