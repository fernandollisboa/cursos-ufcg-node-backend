//eslint-disable-next-line no-undef
module.exports = {
  transform: {
    '^.+\\.(js)$': ['@sucrase/jest-plugin'],
  },
  clearMocks: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/databases/', '/enum/', '/setup.js', '/errors/'],
  coverageDirectory: 'coverage',
  coverageReporters: ['clover', 'text', 'lcov'],
  coverageThreshold: {
    './src/services': { branches: 90, functions: 100, lines: 90, statements: 90 },
  },
};
