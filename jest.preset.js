const nxPreset = require('@nrwl/jest/preset');

module.exports = { 
    ...nxPreset,
    testEnvironment: 'jsdom',
    moduleNameMapper: {
    '@soer/sr-auth': '<rootDir>/../../libs/sr-auth/src/index.ts',
    '@soer/mixed-bus': '<rootDir>/../../libs/mixed-bus/src/index.ts',
    '@soer/sr-dto': '<rootDir>/../../libs/sr-dto/src/index.ts',
    '@soer/sr-url-builder': '<rootDir>/../../libs/sr-url-builder/src/index.ts',
  }
};
