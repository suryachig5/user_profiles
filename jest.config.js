module.exports = () => {
  return {
    testMatch: ['**/__tests__/*.test.js'],
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/__tests__/__mocks__/three.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };
};
