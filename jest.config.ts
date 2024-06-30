export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  modulePaths: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  globals: {
    fetch: global.fetch,
  },
  moduleNameMapper: {
    "\\.(scss)$": "identity-obj-proxy",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@elements(.*)$": "<rootDir>/src/elements$1",
    "^@assets(.*)$": "<rootDir>/src/assets$1",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
  },
};
