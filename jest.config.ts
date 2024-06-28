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
  },
};
