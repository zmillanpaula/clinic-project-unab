module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  testMatch: ['<rootDir>/src/**/*.test.[jt]s?(x)'],
  setupFiles: ['<rootDir>/src/mocks/jestPolyfills.cjs'],
  setupFilesAfterEnv: ['<rootDir>/src/mocks/testSetup.ts'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          esModuleInterop: true,
          module: 'ESNext',
          jsx: 'react-jsx',
          verbatimModuleSyntax: true,
        },
      },
    ],
  },
}
