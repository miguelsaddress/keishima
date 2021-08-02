/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "collectCoverageFrom": [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
};