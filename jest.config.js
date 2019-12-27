module.exports = {
	testPathIgnorePatterns: [
		'<rootDir>/dist/',
		'<rootDir>/docs/',
		'<rootDir>/example/',
		'<rootDir>/node_modules/',
	],
	verbose: true,
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/styleMock.js',
		'\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
	},
};
