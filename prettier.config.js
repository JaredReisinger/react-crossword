module.exports = {
	printWidth: 80,
	useTabs: true,
	tabWidth: 2,
	singleQuote: true,
	jsxSingleQuote: true,
	semi: true,
	trailingComma: 'es5',
	bracketSpacing: true,
	jsxBracketSameLine: false,
	arrowParens: 'always',
	overrides: [
		{
			files: '*.md',
			options: {
				parser: 'markdown',
			},
		},
	],
};
