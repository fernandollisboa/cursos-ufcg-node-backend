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
    './src/services': { branches: 50, functions: 50, lines: 50, statements: 50 },
  },
};
