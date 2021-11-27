module.exports = {
  preset: 'ts-jest',
  roots: ['test'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended/all']
}
