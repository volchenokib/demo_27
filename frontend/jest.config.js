module.exports = {
    moduleFileExtensions: [
      'js',
      'jsx',
      'json',
      'vue',
      'ts',
      'tsx'
    ],

    transform: {
      '^.+\\.vue$': 'vue-jest',
      '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.tsx?$': 'ts-jest'
    },

    transformIgnorePatterns: ['/node_modules/'],

    moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},

    snapshotSerializers: ['jest-serializer-vue'],
    testMatch: ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
    testURL: 'http://localhost/',
    collectCoverage: true,
    collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],

    // watchPlugins: [
    // 	'C:\\Users\\igor.volchenok\\Desktop\\myGithub\\demo\\app\\node_modules\\jest-watch-typeahead\\filename.js',
    // 	'C:\\Users\\igor.volchenok\\Desktop\\myGithub\\demo\\app\\node_modules\\jest-watch-typeahead\\testname.js'
    // ]
    coverageReporters: ['html', 'text-summary'],

    globals: {
      'ts-jest': {
        babelConfig: true
      }
    }
};
