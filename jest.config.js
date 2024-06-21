/** @type {import('jest').Config} */

module.exports = {
  verbose: true,
  testEnvironment: 'jsdom', // simulates a browser environment
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // mocks CSS imports
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // mocks image imports
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // optional: setup file for additional configuration
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', // transforms JS and JSX files using Babel
  },
};
