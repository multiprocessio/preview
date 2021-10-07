module.exports = {
  coverageThreshold: {
    global: {
      statements: 89,
      branches: 92,
      functions: 100,
      lines: 89,
    },
  },
  transform: {
    '^.+\\.tsx?$': [
      'esbuild-jest',
      {
        sourcemap: true,
      },
    ],
  },
  collectCoverageFrom: ['**/*.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
