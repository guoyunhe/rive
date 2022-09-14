/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
  ],
  coveragePathIgnorePatterns: [
    '/build/',
    '/dist/',
    '/coverage/',
    '/node_modules/',
  ],
  coverageReporters: ['html', 'json-summary', 'text'],
  moduleNameMapper: {
    'lodash-es': 'lodash',
    'fetch-mock/esm/client': 'fetch-mock/cjs/client',
  },
  testEnvironment: 'jsdom',
  transform: { '^.+\\.[tj]sx?$': 'ts-jest' },
};

export default config;
