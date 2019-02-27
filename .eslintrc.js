module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
	extends: 'standard',
  env: {
    browser: true,
  },
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// add your custom rules here
	'rules': {
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'indent': 0,
    'no-tabs': 0,
		'space-before-function-paren': 0,
    'eol-last': 0,
    'padded-blocks':0,
    'no-multiple-empty-lines': [0, {'max': 50}],
    'no-unused-vars':'off'
	}
};