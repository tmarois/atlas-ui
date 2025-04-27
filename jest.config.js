export default {
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    }
  };
