module.exports = {
	extends: ['stylelint-config-standard'],
	rules: {
		'no-empty-source': null,
		'declaration-empty-line-before': null,
		'no-missing-end-of-source-newline': null,
		indentation: [
			'tab',
			{
				except: ['value'],
			},
		],
		'block-no-empty': null,
		'color-no-invalid-hex': true,
		'declaration-colon-space-after': 'always',
		'no-eol-whitespace': null,
		'rule-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],
		'unit-whitelist': ['em', 'rem', '%', 's', 'vw', 'vh', 'px'],
	},
};
