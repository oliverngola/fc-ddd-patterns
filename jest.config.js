module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  },
  clearMocks: true,
  coverageProvider: 'v8',
  roots: [
    '<rootDir>/src'
  ]
}
