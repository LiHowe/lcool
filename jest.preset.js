const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  testTimeout: 60 * 1000,
  testEnvironment: 'node'
};
